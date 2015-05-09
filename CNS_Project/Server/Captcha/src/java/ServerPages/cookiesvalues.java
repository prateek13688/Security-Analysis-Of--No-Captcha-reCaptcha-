package ServerPages;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;

/**
 *
 * @author Utkarsh Garg
 */
@WebServlet(urlPatterns = {"/cookiesvalues"})
public class cookiesvalues extends HttpServlet {

   private String cookies;
   private String cookie3;
   private String cookie2;
  private final HttpClient client = HttpClientBuilder.create().build();
  private final String USER_AGENT = "Mozilla/5.0";
  String gmail = "https://mail.google.com/mail/";
  
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
            throws ServletException, IOException, Exception {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet cookiesvalues</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet cookiesvalues at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
            Cookie[] cookie = request.getCookies();
            String cookie1="";
            for(int i = 0; i < cookie.length; i++) 
            {
                    String name = cookie[i].getName();
                    String value = cookie[i].getValue();
                    out.write(name+" : "+value+"\n");
                    cookie1=cookie1+name+"="+value+";";
            }
            setCookies(cookie1);
            out.write(cookies);
            Enumeration<String> parameterNames = request.getParameterNames();
            while (parameterNames.hasMoreElements()) 
            {
                String paramName = parameterNames.nextElement();
                out.write(paramName+" : ");
                String[] paramValues = request.getParameterValues(paramName);
                for (String paramValue : paramValues)
                {
                    out.write("t" + paramValue);
                    out.write("\n");
                }
            }
        }
    }
    private void setCookies(String cookie){
        this.cookies=cookie;
    }
 protected void processRequest1(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, Exception {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet cookiesvalues</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet cookiesvalues at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
           
            
            out.write(cookies);
           
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
        try {
            processRequest(request, response);
        } catch (Exception ex) {
            Logger.getLogger(cookiesvalues.class.getName()).log(Level.SEVERE, null, ex);
        }
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
        try {
            processRequest(request, response);
        } catch (Exception ex) {
            Logger.getLogger(cookiesvalues.class.getName()).log(Level.SEVERE, null, ex);
        }
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
