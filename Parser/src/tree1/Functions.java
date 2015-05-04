/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tree1;

import static tree1.Parser.*;

/**
 *
 * @author Thomas Kutzner
 */
public class Functions {
    
    public static Printer printPrefix = new Printer() {
        @Override
        public String print(Call c, int prec) {
            String s = c.function.name;
            s += "(";
            Boolean first = true;
            for (Program p : c.args) {
                if (!first) {
                    s = s + ",";
                }
                s += p.printProgram(c.function.myPrec);
                first = false;
            }
            s += ")";
            return s;
        }
    };
    
    public static Printer printInfix = new Printer() {
        @Override
        public String print(Call c, int prec) {
            Program left = c.args.get(0);
            Program right = c.args.get(1);
            String ls = left.printProgram(c.function.leftPrec);
            String rs = right.printProgram(c.function.rightPrec);
            String me = ls + c.function.name + rs;
            if (prec >= c.function.myPrec){
                me = "(" + me + ")";
            }
            return me;
        }
    };
    
    public static Printer printUnary = new Printer() {
        @Override
        public String print(Call c, int prec) {
            Program left = c.args.get(0);
            String ls = left.printProgram(c.function.leftPrec);
            String me = c.function.name + ls;
            if (prec >= c.function.myPrec){
                me = "(" + me + ")";
            }
            return me;
        }
    };

//////////////////////Utilities////////////////////////////////
    public static Function add = new Function("+", Simplifiers.addSimp, 0, 1, 1);
    public static Function sub = new Function("-", Simplifiers.subSimp, 0, 1, 1);
    public static Function mul = new Function("*", Simplifiers.mulSimp, 1, 2, 2);
    public static Function div = new Function("/", Simplifiers.divSimp, 1, 2, 2);
    public static Function pow = new Function("^", Simplifiers.powSimp, 3, 4, 4);
    public static Function neg = new Function("-", Simplifiers.negSimp, 3, 3);
    
    public static Program mkNum(double n) {
        return new Number(n);
    }
    
    public static Program add(Program x, Program y) {
        return call2(Functions.add, x, y);
    }
    
    public static Program sub(Program x, Program y) {
        return call2(Functions.sub, x, y);
    }
    
    public static Program mul(Program x, Program y) {
        return call2(Functions.mul, x, y);
    }
    
    public static Program div(Program x, Program y) {
        return call2(Functions.div, x, y);
    }
    
    public static Program negate(Program x) {
        return call1(Functions.neg, x);
    }
    
}
