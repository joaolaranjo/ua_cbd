package exer3;

import com.datastax.driver.core.Cluster;
import com.datastax.driver.core.Session;


public class Main {

    public static void main(String[] args) {
        @Before
        public void connect() {
            CassandraConnector client = new CassandraConnector();
            client.connect("127.0.0.1", 9142);
            this.session = client.getSession();
            schemaRepository = new KeyspaceRepository(session);
        }

    }
}
