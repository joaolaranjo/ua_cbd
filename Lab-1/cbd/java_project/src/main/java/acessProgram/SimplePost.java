package acessProgram;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import redis.clients.jedis.Jedis;


public class SimplePost {
    private Jedis jedis;

    public static String USERS1 = "users1"; // Key set for users' name
    public static String USERS2 = "users2";



    public SimplePost() {
        this.jedis = new Jedis("localhost");
    }


    public void saveUser(String username) {
        jedis.sadd(USERS1, username);
    }


    public Set<String> getUser() {
        return jedis.smembers(USERS1);
    }


    public Set<String> getAllKeys() {
        return jedis.keys("*");
    }

    public void saveUserList(String username) {
        jedis.lpush(USERS2, username);
    }

    public List<String> getUserList() {
        long listSize = jedis.llen(USERS2);
        return jedis.lrange(USERS2, 0, listSize-1 );
    }


    public void saveUserMap(Map<String,String> map) {
        jedis.hmset("User" + map.get("name"), map);
    }

    public Map<String,String> readUserMap(String username){
        return jedis.hgetAll("User" + username);
    }



    public static void main(String[] args) {
        SimplePost board = new SimplePost(); // set some users
        String[] users1 = { "Ana1", "Pedro1", "Maria1", "Luis1" };

        for (String user: users1)
            board.saveUser(user);

        String[] users2 = { "Ana2", "Pedro2", "Maria2", "Luis2"};
        for (String user: users2)
            board.saveUserList(user);

        System.out.println("KEYS");
        board.getAllKeys().stream().forEach(System.out::println);
        System.out.println("GetUser");
        board.getUser().stream().forEach(System.out::println);

        System.out.println("GetUser LIST");
        board.getUserList().stream().forEach(System.out::println);

        HashMap<String, String> users3 = new HashMap<>();
        users3.put("name", "Ana");
        users3.put("nmec", "12345");

        HashMap<String, String> users4 = new HashMap<>();
        users4.put("name", "Pedro");
        users4.put("nmec", "67890");

        board.saveUserMap(users3);
        board.saveUserMap(users4);

        System.out.println("HASH");

        System.out.println(board.readUserMap(users3.get("name")));
        System.out.println(board.readUserMap(users4.get("name")));


    }
}