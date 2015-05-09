package ServerPages;


import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Utkarsh Garg
 */
public class FileWrite {
    private static final String fileName="d:/log.txt";
    public static void print(String data)
    {
        try {
            PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter(fileName, true)));
            out.println(data);
            out.close();
        } 
        catch (IOException e) {
            //exception handling left as an exercise for the reader
        }
    }
    
    
}
