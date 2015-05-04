/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tree1;

/**
 *
 * @author macowner
 */
public abstract class Program {

    //if when i create things If i don't choose that method I get a default behavior
    //nums and vars don't need simplify
    //all action from simplify happens in call
    //calls handles simplification differently. within call we will delegate to
    //a strategy. It will delegate to its nested static function to simplify itself
    /* ....the call.
        The behavior of the printer will depend on the precidence argument
        we'll have 3 different flavors of printers
    */ 
    public abstract String printProgram(int prec);

    public Program simplify() {
        return this;
    }

    public double cval() {  // The value of a constant
        return 0;
    }

    public boolean isConst() {
        return false;
    }

    public boolean isConst(double c) {
        return false;
    }

    public boolean isCall(Function fn) {
        return false;
    }
}
