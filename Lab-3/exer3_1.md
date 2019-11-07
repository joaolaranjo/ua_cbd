#Creating Key Space

Here we are creating a KeySpace named TutorialsPoint.

We are using the first replica placement strategy, i.e.., Simple Strategy.

And we are choosing the replication factor to 1 replica.

cqlsh.> CREATE KEYSPACE tutorialspoint
WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};