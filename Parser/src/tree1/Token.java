/*
 * Author: Prof Peterson
 */

package tree1;
import static tree1.TokenType.*;
public class Token {
    public TokenType type;
    public String body;

    public Token(TokenType type, String body) {
        this.type = type;
        this.body = body;
    }
    public String toString() {
        return body;
    }
    public boolean sameToken(Token t) {
        return body.equals(t.body);
    }
    public boolean isNumber() {
        return type == numberToken;
    }
    public boolean isName() {
        return type == nameToken;
    }
    public boolean isPunct(String p) {
        return type == puncToken && p.equals(body);
    }
    public boolean isEOF() {//**end of file
        return this == EOF;
    }
    public static Token EOF = new Token(TokenType.puncToken, "<EOF>");
}
