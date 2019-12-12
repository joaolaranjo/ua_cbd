package cbd.cassandra.exer3_4;

import com.datastax.driver.core.Cluster;
import com.datastax.driver.core.ResultSet;
import com.datastax.driver.core.Session;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Exer34Application {

    public static void main(String[] args) {

        ResultSet queryResult;
        String query;

        CassandraConnector cq = new CassandraConnector();
    }
}