package joaolaranjo.cbd;

import com.mongodb.*;
import com.mongodb.client.*;
import com.mongodb.client.MongoClient;
import com.mongodb.client.model.Indexes;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.Filters;
import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Projections.*;
import com.mongodb.client.model.Sorts;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import org.bson.Document;



public class App 
{
    public static void main( String[] args ) {

        Block<Document> printBlock = new Block<Document>() {
            @Override
            public void apply(final Document document) {
                System.out.println(document.toJson());
            }
        };

        //MongoClient mongoClient = new MongoClient("localhost", 27017);
        //DB database = mongoClient.getDB("Lab-2");

        MongoClient mongoClient = MongoClients.create();
        MongoDatabase database = mongoClient.getDatabase("Lab-2");
        MongoCollection<Document> collection = database.getCollection("restaurants");

        // Mostra todas as collections
        for (String name : database.listCollectionNames()) {
            System.out.println(name);
        }

        // Documentos na coleção
        System.out.println(collection.countDocuments());

        // Primeiro elemento
        Document teste = collection.find().first();
        System.out.println(teste.toJson());

        /* Cursor
        MongoCursor<Document> cursor = collection.find().iterator();
        try {
            while (cursor.hasNext()) {
                System.out.println(cursor.next().toJson());
            }
        } finally {
            cursor.close();
        }*/

        // Ou de forma alternativa e mais simples

        List<String> lista = new ArrayList<>();


        MongoCursor<String> files = collection.distinct("localidade", String.class).iterator();
        while(files.hasNext()) {
            System.out.println("NEW LOCALIDADE");
            System.out.println(files.next());
        }



        for (Document cur : collection.find(new BasicDBObject("localidade", "Bronx"))) {
            lista.add(cur.toJson());
            //System.out.println(cur.toJson());
        }

        for (String elem: lista) {
            System.out.println(elem);
        }
        System.out.println(lista.size());


        //Insert
        BasicDBObjectBuilder documentBuilder = BasicDBObjectBuilder.start()
                .add("name", "João Laranjo")
                .add("localidade", "Aveiro")
                .add("gastronomia", "Comida Portuguesa");
        collection.insert(documentBuilder.get());


        // Indexes
        collection.createIndex(Indexes.ascending("localidade"));
        collection.createIndex(Indexes.ascending("gastronomia"));
        collection.createIndex(Indexes.ascending("nome"));
    }

    public int countLocalidades (DBCollection collection){
        List list = collection.distinct("localidade");
        return list.size();
    }

    public Map<String, Integer> countRestByLocalidade(DBCollection collection){

        Map<String, Integer> countRestByLocalidade = new HashMap<>();
        Iterable<DBObject> query = collection.aggregate(Arrays.asList(
            (DBObject) new BasicDBObject("$group", new BasicDBObject()
                    .append("_id", "$localidade")
                    .append("number", new BasicDBObject("$sum", 1))
                ))).results();
        
        for (DBObject o : query)
            countRestByLocalidade.put((String) o.get("_id") , (Integer) o.get("number"));
        
        return countRestByLocalidade;
    }

}
