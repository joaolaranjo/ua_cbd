# Introdução Neo4j

```
$ :play movie-graph
``

// CREATE (Nome:Tipo {atributo1: valor, atributo2: valor})
CREATE (Carrie:Person {name:'Carrie-Anne Moss', born:1967})

// MATCH (nome {atributo1: valor}) RETURN nome
// Funciona como FIND - Pesquisa atributos com determinado valor e retorna
MATCH (tom {name: "Tom Hanks"}) RETURN tom
MATCH (moviename {title: "Cloud Atlas"}) RETURN moviename

// Retorna o nome de Persons - Limit 10
MATCH (people:Person) RETURN people.name LIMIT 10

// Retorna o nome dos filmes "released" entre 1990 e 2000
MATCH (nineties:Movie) WHERE nineties.released >= 1990 AND nineties.released < 2000 RETURN nineties.title


 MATCH (n) RETURN n