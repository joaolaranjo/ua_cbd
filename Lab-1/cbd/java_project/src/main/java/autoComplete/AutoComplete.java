package autoComplete;

import redis.clients.jedis.Jedis;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.Set;

public class AutoComplete {


    private Jedis jedis;

    public static String female_names_1 = "names1";
    public static String female_names_s = "names_sorted";

    public AutoComplete() {
        this.jedis = new Jedis("localhost");
    }

    // Ler nomes de ficheiro
    public List<String> readFile(String path) throws IOException {
        File file = new File(path);
        BufferedReader br = new BufferedReader(new FileReader(file));

        List<String> names = new ArrayList<>();
        String line;

        while((line = br.readLine()) != null)
            names.add(line);

        return names;
    }

    // Guarda na BD
    public void saveBD(String key, String name) {
        jedis.sadd(key, name);
    }

    // Guarda na BD sorted
    public void sortedSaveBD(String key, String name) {
        jedis.zadd(key, 0, name);
    }


    public static void main(String[] args) throws IOException {

        AutoComplete teste = new AutoComplete();

        List<String> nomes = new ArrayList<>();

        try{
            nomes = teste.readFile("../female_names.txt");
            for (String nome : nomes){
                System.out.println(nome);
            }

        }catch (Exception e){
            System.out.println(e);
        }

        for(String nome : nomes) {
            teste.saveBD(female_names_1, nome);
            teste.sortedSaveBD(female_names_s, nome);
        }

        Scanner sc= new Scanner(System.in);

        String input="";

        while (true) {
            System.out.print("Search for ('Enter' for quit): ");
            input = sc.nextLine();
            if (input.equals("")) {
                System.out.println("Leaving...");
                break;
            }

            // Procurar por "meias palavras"?
        }

    }

}
