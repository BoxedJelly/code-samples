

package tree1;
import java.util.ArrayList;
public class TokenStream {
    public ArrayList<Token> tokens;
    public int here;
    public int size;
    public TokenStream() {
        tokens = new ArrayList<Token>();
        here = 0;
        size = 0;
    }
    public void addToken(Token t) {
        tokens.add(size, t);
        size++;
    }
    public Token next() { //** "largest source of bugs is when you need to next and when you need to peek
        if (here < size) {
            Token res = tokens.get(here);
            here++;
            return res;
        }
        return Token.EOF;
    }
        public Token peek() { //** read a file but don't take it out of the file yet - I think.
        if (here < size) {
            return tokens.get(here);}
        else return Token.EOF;
    }
    
}
