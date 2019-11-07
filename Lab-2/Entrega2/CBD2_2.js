// NMEC: 91153

/* 1. Liste todos os documentos da coleção.

	db.restaurants.find()
*/

/* 2. Apresente os campos restaurant_id, nome, localidade e gastronomia para todos os documentos da coleção.
	db.restaurants.find({},
    	{"restaurant_id":1,
        	"nome":1,
        	"localidade":1, 
        	"gastronomia":1
	})
*/

/* 3. Apresente os campos restaurant_id, nome, localidade e código postal (zipcode), mas exclua o campo _id de todos os documentos da coleção.
	db.restaurants.find({},
    	{"restaurant_id":1,
        	"nome":1,
        	"localidade":1, 
        	"zipcode":1,
        	"_id": 0
	})
*/

/* 4. Indique o total de restaurantes localizados no Bronx.
	db.restaurants.find(
    	{"localidade":"Bronx"},
    	{"localidade": 1,
        	"nome":1
	})
	db.restaurants.count({"localidade" : "Bronx"})
*/

/* 5. Apresente os primeiros 5 restaurantes localizados no Bronx.
	db.restaurants.find(
    	{"localidade":"Bronx"},
    	{"localidade": 1,
        	"nome":1,
        	"gastronomia":1
    	}
	).limit(5)
	// De outra Forma:

	db.restaurants.find(
		{"localidade": {$eq: "Bronx"}}).limit(5)
*/

/* 6. Liste todos os restaurantes que tenham pelo menos um score superior a 85.
	db.restaurants.find(
    	{"grades.score": {$gt : 85}},
    	{"localidade": 1,
        	"nome":1,
        	"gastronomia":1,
        	"grades":1
    	})
*/

/* 7. Encontre os restaurantes que obtiveram uma ou mais pontuações (score) entre [80 e 100].
	// É necessário ver elemento a elemento
	db.restaurants.find(
    {"grades":{$elemMatch : { "score": {$gt:80, $lt:100} } }},
    //{ $and : [ {"grades.score": {$gt: 80}}, {"grades.score": {$lte: 100}}]}, ERRADO 
    //{"grades.score": {$gt:80, $lt:100}}, ERRADO
    {"localidade": 1,
        "nome":1,
        "gastronomia":1,
        "grades":1
    })
*/

/* 8. Indiqueos restaurantes com latitude inferior a -95,7.
	db.restaurants.find(
		{"address.coord.0": {$lt: -97.5}}
	)
*/

/* 9. Indique os restaurantes que não têm gastronomia "American", tiveram uma (ou mais) pontuação superior a 70 e estão numa latitude inferior a -65.
	db.restaurants.find({
		"gastronomia": {$ne: "American"},
        "grades.score": {$gt: 70},
        "address.coord.0": {$lt: -65}
        })
*/

/* 10. Liste o restaurant_id, o nome, a localidade e gastronomia dos restaurantes cujo nome começam por "Wil".
	db.restaurants.find({
    	"nome": {$regex: 'Wil*'}},{
    	"restaurant_id": 1,
     	"nome": 1, 
     	"localidade": 1,
     	"gastronomia": 1}
	)
*/

/* 11. Liste o nome, a localidade e a gastronomia dos restaurantes que pertencem ao Bronx e cuja gastronomia é do tipo "American" ou "Chinese".
	db.restaurants.find(
    {"localidade": "Bronx", $or: [{"gastronomia": "American"},{"gastronomia": "Chinese"}]},
    {"restaurant_id": 1,
     "nome": 1, 
     "localidade": 1,
     "gastronomia": 1}
	)
*/

/* 12. Liste o restaurant_id, o nome, a localidade e a gastronomia dos restaurantes localizados em "Staten Island", "Queens", "Bronx" ou "Brooklyn".
	db.restaurants.find({$or: [ 
    	{"localidade":"Staten Island"},
    	{"localidade":"Queens"},
    	{"localidade":"Bronx"},
    	{"localidade":"Brooklyn"}]},

    	{"restaurant_id": 1,
     	"nome": 1, 
     	"localidade": 1,
     	"gastronomia": 1}
	)
*/

/* 13. Liste o nome, a localidade, o score e gastronomia dos restaurantes que alcançaram sempre pontuações inferiores ou igual a 3.
	db.restaurants.find({"grades.score": {$not: {$gt: 3}}},
    	{"nome": 1,
     	"localidade": 1,
     	//"grades.score": 1,
     	"grades": 1,
     	"gastronomia":1
     	}
	)
*/

/* 14. Liste o nome e as avaliações dos restaurantes que obtiveram uma avaliação com um grade "A", um score 10 na data "2014-08-11T00: 00: 00Z" (ISODATE).
	db.restaurants.find({"grades": {"$elemMatch": {"grade": "A", "score": 10, "date": ISODate("2014-08-11T00:00:00Z")}}},
	{   "nome": 1,
    	"grades": 1
	})	
*/

/* 15. Liste o restaurant_id, o nome e os score dos restaurantes nos quais a segunda avaliação foi grade "A" e ocorreu em ISODATE "2014-08-11T00: 00: 00Z".
	db.restaurants.find(
		{$and: [{"grades.1.grade": {$eq:"A"}},
        		{"grades.1.date": {$eq: ISODate("2014-08-11T00:00:00Z")}}
    	]},

		{"restaurant_id": 1,
     	 "nome": 1,
     	 "grades": 1
	})
*/

/* 16. Liste o restaurant_id, o nome, o endereço (address) e as coordenadas geográficas (coord) dos restaurantes onde o 2o elemento da matriz de coordenadas tem um valor superior a 42 e inferior ou igual a 52.
	db.restaurants.find(
    	{$and: [{"address.coord.1": {$gt:42}},
        	    {"address.coord.1": {$lte:52}}
           		]},
    	{"restaurant_id": 1,
     	 "nome": 1,
     	"address": 1
    	}
	)
*/

/* 17. Liste o nome de todos os restaurantes por ordem crescente.
	db.restaurants.find({},
    	{"nome": 1}).sort({"nome": 1})
*/

/* 18. Liste nome, gastronomia e localidade de todos os restaurantes ordenando por ordem crescente da gastronomia e, em segundo, por ordem decrescente de localidade.
	db.restaurants.find({},{
    	"nome": 1,
    	"gastronomia": 1,
    	"localidade": 1}).sort({"gastronomia": 1, "localidade": -1}
    )
*/

/* 19. Liste nome, localidade, grade e gastronomia de todos os restaurantes localizados em Brooklyn que não incluem gastronomia "American" e obtiveram uma classificação (grade) "A". Deve apresentá-los por ordem decrescente de gastronomia.
	db.restaurants.find({
    	"localidade": "Brooklyn",
    	"gastronomia": {$ne: 'American'}},
    	{"nome": 1,
     	"localidade": 1,
     	"grades": 1,
     	"gastronomia": 1}).sort({"gastronomia": -1}
	)
*/

/* 20. Conte o total de restaurante existentes em cada localidade.
	db.restaurants.aggregate(
		[{$group : { "_id" : "$localidade", "number" : {$sum : 1}}}]
	)
*/

/* 21. Liste todos os restaurantes cuja média dos score é superior a 30.
	db.restaurants.aggregate(
    	[{$addFields:{"avg": { $avg:"$grades.score"}}}, 
    	{$match : {"avg" : {$gt : 30}}}]
	)
*/

/* 22. Indique os restaurantes que têm gastronomia "American", o somatório de score é superior a 70 e estão numa latitude inferior a -65.
	db.restaurants.aggregate([
    	{$addFields : { "total" :  {$sum : "$grades.score"}}},
    	{$match : {"total": {$gt: 70}, "gastronomia": "American", "address.coord.0": {$lt: -65}}}
	])
*/

/* 23. Apresente uma lista com todos os tipos de gastronomia e o respetivo número de restaurantes, ordenada por ordem decrescente deste número.
	db.restaurants.aggregate([
    	{$group : { "_id" : "$gastronomia", "number" : {$sum : 1}}},
    	{$sort: {"number": -1}}
	])
*/

/* 24. Apresente o número de gastronomias diferentes na rua "Flatbush Avenue"
	db.restaurants.aggregate([
    	{$match: {"address.rua": "Flatbush Avenue"}},
    	{$group: {"_id": "$gastronomia"}},
    	{$count: "number"}
	])
*/

/* 25. Conte quantos restaurantes existem por rua e ordene por ordem decrescente
	db.restaurants.aggregate([
		{$group : { "_id" : "$address.rua", "number" : {$sum : 1}}},
		{$sort: {"number": -1}}
	])
*/

/* EXTRAS

Most Common Gastronomies
db.restaurants.aggregate([
	{$group : { "_id" : "$gastronomia", "number" : {$sum : 1}}},
	{$sort: {"number": -1}}, {$limit: 1}
])



*/




















