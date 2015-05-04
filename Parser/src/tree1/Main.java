/*
 * Main.java
 *
 * Created on November 11, 2007, 8:32 PM
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */
package tree1;

import java.io.BufferedReader;
import java.io.StringReader;
import java.util.ArrayList;

/**
 *
 * @author fac_peterson
 */
public class Main {

    /**
     * Creates a new instance of Main
     */
    public Main() {
    }
    /*  **end result: parse expression, am I at end, print result...3 lines */

    /**
     * ** turn string into tree and tree back into string. last string will
     * parenthesis everything
     *
     * @param args the command line arguments
     *
     * exp = mulexp (addop mulexp)* mulexp = negexp (mulop negexp)* negexp = '-'
     * negexp | aexp aexp = '(' exp ')' | num | name addop = '+' | '-' mulop =
     * '*' | '/'
     *
     */
    public static void main(String[] args) {

        String test1 = "1/51;";
        //String test2 = "a+x/3-454+-1;";
        ArrayList<Program> progs = Parser.parse(test1);
        for (Program p : progs) {
            System.out.println("" + p.printProgram(0));
            System.out.println("" + p.simplify().printProgram(0));
        }
        
    }
    
}
