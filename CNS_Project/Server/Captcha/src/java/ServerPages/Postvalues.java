package ServerPages;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/**
 *
 * @author Utkarsh Garg
 */
@WebServlet(urlPatterns = {"/Postvalues"})
public class Postvalues extends HttpServlet {
 
  
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        DataBaseEntry dbEntry = new DataBaseEntry();
        Connection con = dbEntry.getDbConnection();
        try (PrintWriter out = response.getWriter()) {
           String sqlString = "INSERT INTO REGISTRATION VALUES (? , ? , ? , ? , ?)";
            String name = request.getParameter("name");
            String ufid = request.getParameter("ufid");
            String email = request.getParameter("email");
            String bot = request.getParameter("bot");
            String ipaddr=request.getRemoteAddr();
            if(bot==null)
            {
                bot="off";
            }
            PreparedStatement stmt = con.prepareStatement(sqlString);
            stmt.setString(1, name);
            stmt.setString(2,ufid);
            stmt.setString(3,email);
            stmt.setString(4,bot);
            stmt.setString(5,ipaddr);
            int result = stmt.executeUpdate();
            response.sendRedirect("/Captcha/thanks.html");
        }
        catch(Exception e){}
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
