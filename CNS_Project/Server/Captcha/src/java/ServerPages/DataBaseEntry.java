package ServerPages;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class DataBaseEntry {
    private static DataBaseEntry instance = null;
    private static Connection conn = null;

    /**
     * Constructor Declared
     */
    protected DataBaseEntry()
    {
        // Do nothing
    }
    public DataBaseEntry getInstance()
    {
        if(instance == null)
            return new DataBaseEntry();
        else
            return instance;
    }
    
    public void resetConnection()
    {
        try {
            if(conn != null)
                conn.close();
        } catch (SQLException ex) {
            
        }
        conn = null;
        
    }
    public Connection getDbConnection()
    {
        if (conn != null)
            return conn;
        else
        {
            try{
                Class.forName("com.mysql.jdbc.Driver");
                conn = DriverManager.getConnection("jdbc:mysql://localhost/recaptcha","root", "");
            }
            catch(Exception e)
            {
                System.out.print(e.toString());
            }
            return conn;
        }
    }
}
