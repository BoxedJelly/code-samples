/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tree1;

import java.util.ArrayList;

/**
 *
 * @author macowner
 */
public class Call extends Program {

    Function function;
    ArrayList<Program> args = new ArrayList<Program>();

    public Call(Function fn) {
        this.function = fn;
    }

    public Call(Function fn, ArrayList<Program> p) {
        this.function = fn;
        this.args = p;
    }
    @Override
    public String printProgram(int prec) {
        return function.printer.print(this, prec);
    }

    @Override
    public Program simplify() {
        return function.simplifier.simplify(this);
    }

    public void addArg(Program next) {
        args.add(next);
    }

}
