package cbd.cassandra.exer3_4;

import com.datastax.driver.core.Cluster;
import com.datastax.driver.core.Session;

public class CassandraConnector {

    private Cluster cluster;
    private Session session;

    public CassandraConnector() {
        this.cluster = Cluster.builder().addContactPoint("127.0.0.1").build();
        this.session = cluster.connect("JavaApi");
    }
}