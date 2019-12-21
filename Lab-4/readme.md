# Introdução Neo4j

```
$ :play movie-graph
```

***


## Create
// CREATE (Nome:Tipo {atributo1: valor, atributo2: valor})
CREATE (Carrie:Person {name:'Carrie-Anne Moss', born:1967})

## Find
// MATCH (nome {atributo1: valor}) RETURN nome
// Funciona como FIND - Pesquisa atributos com determinado valor e retorna
```
MATCH (tom {name: "Tom Hanks"}) RETURN tom
MATCH (moviename {title: "Cloud Atlas"}) RETURN moviename
```

// Retorna o nome de Persons - Limit 10
```
MATCH (people:Person) RETURN people.name LIMIT 10
```

// Retorna o nome dos filmes "released" entre 1990 e 2000
```	
MATCH (nineties:Movie) WHERE nineties.released >= 1990 AND nineties.released < 2000 RETURN nineties.title
```

// Devolve todos os nós e suas relações
```
MATCH (n) RETURN n
```

## Query
// Devolve as pessoas com o nome "Tom Hanks" com a relação "ACTED_IN" e os filmes para essa relação
```
MATCH (tom:Person {name: "Tom Hanks"})-[:ACTED_IN]->(tomHanksMovies) RETURN tom,tomHanksMovies
```

// Devolve os diretores do filme "Cloud Atlas" através da relação "DIRECTED"
```
MATCH (cloudAtlas {title: "Cloud Atlas"})<-[:DIRECTED]-(directors) RETURN directors.name
```

//  Devolve todos os nomes de actors que "ACTED_IN" em filmes que "Tom Hanks" - Atores que participaram em filmes com "Tom Hanks"
```
MATCH (tom:Person {name:"Tom Hanks"})-[:ACTED_IN]->(m)<-[:ACTED_IN]-(coActors) RETURN coActors.name
```

// Devolve nomes, tipos de relações e relações de pessoas com o filme "Cloud Atlas"
```
MATCH (people:Person)-[relatedTo]-(:Movie {title: "Cloud Atlas"}) RETURN people.name, Type(relatedTo), relatedTo
```

## Solve
// Filmes e atores a uma distância de 4 "saltos/hops" de "Kevin Bacon"
```
MATCH (bacon:Person {name:"Kevin Bacon"})-[*1..4]-(hollywood) RETURN DISTINCT hollywood
```

// Caminho mais curto entre "Kevin Bacon" e "Meg Ryan"
```
MATCH p=shortestPath((bacon:Person {name:"Kevin Bacon"})-[*]-(meg:Person {name:"Meg Ryan"})) RETURN p
```

## Recommend 
// CocoAtores de TomHanks que nunca participaram num filme com Tom Hanks - Ordenador por "Strength"
```
MATCH (tom:Person {name:"Tom Hanks"})-[:ACTED_IN]->(m)<-[:ACTED_IN]-(coActors),
      (coActors)-[:ACTED_IN]->(m2)<-[:ACTED_IN]-(cocoActors)
WHERE NOT (tom)-[:ACTED_IN]->()<-[:ACTED_IN]-(cocoActors) AND tom <> cocoActors
RETURN cocoActors.name AS Recommended, count(*) AS Strength ORDER BY Strength DESC
```

// CoAutores de Tom Hanks que também são coautores de Tom Cruise
```
MATCH (tom:Person {name:"Tom Hanks"})-[:ACTED_IN]->(m)<-[:ACTED_IN]-(coActors),
      (coActors)-[:ACTED_IN]->(m2)<-[:ACTED_IN]-(cruise:Person {name:"Tom Cruise"})
RETURN tom, m, coActors, m2, cruise
```

## Cleanup
// Nodes não podem ser removidos se existir uma relação
// Solução é apagar os 2 nós e a relação
```
MATCH (n) DETACH DELETE n
```



***



# Cypher







