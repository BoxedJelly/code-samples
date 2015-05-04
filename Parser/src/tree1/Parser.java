/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tree1;

import java.io.BufferedReader;
import java.io.StringReader;
import java.util.ArrayList;

/**
 *
 * @author macowner
 */
public class Parser { //

    private static TokenStream toks;

    public static ArrayList<Program> parse(String s) {
        StringReader sr = new StringReader(s);
        toks = Lexer.lex(new BufferedReader(sr));
        ArrayList<Program> p = parseExps();
        if (toks.peek().isEOF()) {
            return p;
        }
        System.out.println("Error, ended at: " + toks.peek());
        System.exit(0);
        return p;
    }

    // exp = (exp ';')*
    public static ArrayList<Program> parseExps() {
        ArrayList<Program> progs = new ArrayList();
        while (!toks.peek().isEOF()) {
            Program p = parseExp();
            requirePunct(";");
            progs.add(p);
        }
        return progs;
    }

    //exp = mulexp (addop mulexp)*
    public static Program parseExp() {
        Program res = parseMulexp();
        Function op;
        while ((op = parseAddop()) != null) {
            Program a = parseMulexp();
            res = call2(op, res, a);

        };
        return res;
    }

    //mulexp = powexp (mulop negexp)*
    public static Program parseMulexp() {
        Program res = parsePowexp();
        Function op;
        while ((op = parseMulop()) != null) {  // Followed by * or /?
            Program a = parsePowexp();   // Get second argument
            res = call2(op, res, a);       // Place the call in the result
        };
        return res;
    }

    //powexp = 
    public static Program parsePowexp() {
        Program res = parseNegexp();
        while (toks.peek().isPunct("^")) { 
            toks.next();            // Followed by * or /?
            Program a = parseNegexp();   // Get second argument
            res = call2(Functions.pow, res, a);       // Place the call in the result
        };
        return res;
    }

    //negexp = '-' negexp | aexp
    public static Program parseNegexp() {
        //Program res = parseMulexp();
        Token t = toks.peek();
        if (t.isPunct("-")) {
            toks.next();
            Program p = parseNegexp();
            //res = call1(Functions.sub, res);
            return p;
        } else {
            return parseAexp();
        }

    }

    //aexp = '(' exp ')' | num | name ['('exp(',' exp )* ')']
    public static Program parseAexp() {
        Token t = toks.next();
        if (t.isPunct("(")) {
            Program p = parseExp();
            requirePunct(")");
            return p;
        }
        if (t.isNumber()) {
            return new Number(Double.parseDouble(t.body));
        }
        if (t.isName()) {
            if (toks.peek().isPunct("(")) {
                toks.next();
                Function f = new Function(t.body, Simplifiers.findSimp);
                Call c = new Call(f);
                Program a = parseExp();
                c.addArg(a);
                while (toks.peek().isPunct(",")) {
                    toks.next();
                    a = parseExp();
                    c.addArg(a);
                }
                requirePunct(")");
                return c;
            }
            return new Variable(t.body);
        }
        System.out.println("Horrible message: " + t);
        return null;
    }

    //addop = '+' | '-'
    public static Function parseAddop() {
        Token thisTok = toks.peek();
        if (thisTok.isPunct("+")) {
            toks.next();
            return Functions.add;
        }
        if (thisTok.isPunct("-")) {
            toks.next();
            return Functions.sub;
        }
        return null;
    }

    //mulop = '*' | '/'
    public static Function parseMulop() {
        Token thisTok = toks.peek();
        if (thisTok.isPunct("*")) {
            toks.next();
            return Functions.mul;
        }
        if (thisTok.isPunct("/")) {
            toks.next();
            return Functions.div;
        }
        return null;
    }

    public static String parsePows() {
        Token thisTok = toks.peek();
        if (thisTok.isPunct("^")) {
            toks.next();
            return thisTok.body;
        }
        return null;
    }

    // Create a function call with two arguments, like 1+1
    public static Program call2(Function fn, Program a1, Program a2) {
        Call res = new Call(fn); // has no subtrees on initialization
        res.addArg(a1);  // addArg is a method in Call
        res.addArg(a2);
        return res;
    }

    // Create a function call with 1 argument, like -x
    public static Program call1(Function fn, Program a1) {
        Call res = new Call(fn);
        res.addArg(a1);
        return res;
    }
    // Use this when the next token has to be a certain
    // piece of punctuation

    public static void requirePunct(String s) {
        Token t = toks.next();
        if (t.isPunct(s)) {
            return;
        }
        System.out.println("Error: expecting " + s);
    }

   ///////////////////////////////////////////////////////
}
