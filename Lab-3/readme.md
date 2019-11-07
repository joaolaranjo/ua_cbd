***
#Prática Laboratorial 3 CBD 2019/2020
###João Laranjo 91153
***
##	Lab 3 Column-oriented Databases
### 3.1 Cassandra – Instalação e exploração por linha de comandos


// Desde que haja capacidade de armazenar nós em rede - capacidade de tempos constantes de pesquisa, independentemente do número de registos

[Cassandra](http://cassandra.apache.org/)

[Installing Cassandra on MACOS](https://gist.github.com/hkhamm/a9a2b45dd749e5d3b3ae)

mkdir /var/lib/cassandra
mkdir /var/log/cassandra

sudo chmod 777 /var/lib/cassandra
sudo chmod 777 /var/log/cassandra

pico ~/.bash_profile
export PATH="<cassandra_folder>/bin":$PATH

export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0 ... Contents
cassadra -f

Instalação com Brew

```
brew install cassandra
```

```
brew services start cassandra
```

```
cassandra -f
```

Novo Terminal:
```
cqlsh
```

Connected to Test Cluster at 127.0.0.1:9042.
[cqlsh 5.0.1 | Cassandra 3.11.4 | CQL spec 3.4.4 | Native protocol v4]
Use HELP for help.
cqlsh> 


