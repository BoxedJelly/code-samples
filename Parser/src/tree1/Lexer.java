/*
 * Author: Prof Peterson
 *
 * Lexer.java
 *
 * Created on November 14, 2007, 7:06 PM
 *
 */

package tree1;
import java.io.BufferedReader;
import java.io.IOException;
public class Lexer {
public static TokenStream lex(BufferedReader input) //** "Lixicolinalisys"

 {
        TokenStream toks = new TokenStream(); //** all you need to know is that in your program you open up a buffered reader, you hand it a lex andyou get token stream
        int errs = 0;
        String line;
        String punct = "(),=+-*^/;:.";
        try {
            while ((line = input.readLine()) != null) {
                int col = 0;
                while (col < line.length()) {
                    char ch = line.charAt(col);
                    if (Character.isWhitespace(ch)) {
                        col++;
                    } else if (Character.isLetter(ch)) {
                        String tok = new String();
                        tok = tok + ch;
                        col++;
                        char tmp;
                        while (col < line.length() &&
                               (Character.isLetter(tmp = line.charAt(col))
                                || Character.isDigit(tmp)
                                || tmp == '\'')) {
                                  tok = tok + tmp;
                                  col++;
                        }
                        toks.addToken(new Token(TokenType.nameToken, tok));
                    } else if (Character.isDigit(ch)) {
                        String tok = new String();
                        tok = tok + ch;
                        col++;
                        while (col < line.length() &&
                                Character.isDigit(line.charAt(col))) {
                                  tok = tok + line.charAt(col);
                                  col++;
                        }
                        toks.addToken(new Token(TokenType.numberToken, tok));
                        
                    } else if (punct.contains(Character.toString(ch))) {
                        toks.addToken(new Token(TokenType.puncToken, Character.toString(ch)));
                        col++;
                    } else {
                        System.out.print("Invalid character " + ch + " in " + line);
                        errs++;
                    }
                }
            }
            return toks;
        } catch (IOException ex) {
            System.out.print("IO Error: " + ex.getMessage());
            return null;
        }
    }
    
}
