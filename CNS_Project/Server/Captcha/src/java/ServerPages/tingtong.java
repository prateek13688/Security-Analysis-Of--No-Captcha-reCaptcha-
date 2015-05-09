package ServerPages;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Iterator;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 *
 * @author Utkarsh Garg
 */

@WebServlet(urlPatterns = {"/tingtong"})
public class tingtong extends HttpServlet {

    private  int connectionID = 0;
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       
        DataBaseEntry dbEntry = new DataBaseEntry();
        Connection con = dbEntry.getDbConnection();
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            String sqlString = "INSERT INTO COOKIE VALUES (? , ? , ? , ?)";
            String getconid ="SELECT MAX(CONN_ID) FROM COOKIE";
            Gson gson = new Gson();    
            String userName = request.getParameter("cookieValue");
            JsonElement jelem = gson.fromJson(userName, JsonElement.class);
            JsonObject jobj = jelem.getAsJsonObject();
            JsonArray arr = jobj.getAsJsonArray("Cookies");
            Iterator it = arr.iterator();
            Statement connStmt = con.createStatement();
            ResultSet rs = connStmt.executeQuery(getconid);
            String temp=null;
            while(rs.next()){
                 temp= rs.getString("MAX(CONN_ID)");
            }
            if(temp==null)
                connectionID=0;
            else
                connectionID=Integer.parseInt(temp);
            connectionID++;
            while(it.hasNext())
            {
                PreparedStatement stmt = con.prepareStatement(sqlString);
                JsonObject innerObj = (JsonObject) it.next();
                String cookieName = innerObj.get("CookieName").getAsString();
                String cookieValue = innerObj.get("CookieValue").getAsString();
                String cookieDomain = innerObj.get("CookieDomain").getAsString();
                stmt.setInt(1, connectionID);
                stmt.setString(2, cookieName);
                stmt.setString(3, cookieValue);
                stmt.setString(4, cookieDomain);
                int result = stmt.executeUpdate();
                if(result==0){
                    out.write("The Result of Insertion is Failure");
                }
                else{
                    out.write("The Result of Insertion is Success");
                }
            }
        }
        catch(Exception e)
        {
            System.out.println("The Exception Caught in tington" + e.toString());
        }
        finally
        {
            dbEntry.resetConnection();
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
