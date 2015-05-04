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
public class Simplifiers {

    public static Simplifier noSimp = new Simplifier() {
        public Program simplify(Call c) {
            return c;
        }

    };

    public static Simplifier addSimp = new Simplifier() {
        @Override
        public Program simplify(Call c) {
            Program left = c.args.get(0).simplify();
            Program right = c.args.get(1).simplify();
            Program mid;
            if (left.isConst(0)) {
                return right;
            }
            if (right.isConst(0)) {
                return left;
            }
            if (left.isConst() && right.isConst()) {

                return Functions.mkNum(left.cval() + right.cval());
            }

            return c;
        }
    };

    public static Simplifier subSimp = new Simplifier() {
        public Program simplify(Call c) {
            Program left = c.args.get(0).simplify();
            Program right = c.args.get(1).simplify();
            Program mid;
            if (left.isConst() && right.isConst()) {

                return Functions.mkNum(left.cval() - right.cval());
            }
            if (left.isConst(0)) {
                return Functions.negate(right);
            }
            if (right.isConst(0)) {
                return left;
            }
            return c;
        }
    };

    public static Simplifier mulSimp = new Simplifier() {
        public Program simplify(Call c) {
            Program left = c.args.get(0).simplify();
            Program right = c.args.get(1).simplify();
            Program mid;
            if (left.isConst(1)) {
                return right;
            }
            if (left.isConst(1)) {
                return left;
            }
            if (left.isConst(0)) {
                return Functions.mkNum(0);
            }
            if (right.isConst(0)) {
                return Functions.mkNum(left.cval() * right.cval());
            }

            return c;
        }
    };

    public static Simplifier divSimp = new Simplifier() {
        public Program simplify(Call c) {
            Program left = c.args.get(0).simplify();
            Program right = c.args.get(1).simplify();
            Program mid;
            if (left.isConst() && right.isConst()) {
                return Functions.mkNum(left.cval() / right.cval());
            }
            if (right.isConst(1)) {
                return left;
            }
            if (left.isConst(0)) {
                return Functions.mkNum(0);
            }
            return Functions.mkNum(left.cval()/ right.cval());
        }
    };

    public static Simplifier powSimp = new Simplifier() {
        public Program simplify(Call c) {
            Program left = c.args.get(0).simplify();
            Program right = c.args.get(1).simplify();
            Program mid;
            if (left.isConst(0)) {
                return Functions.mkNum(0);
            }
            if (right.isConst(0)) {
                return Functions.mkNum(1);
            }
            if (left.isConst() && right.isConst()) {

                return Functions.mkNum(left.cval() * right.cval());
            }
            return c;
        }
    };

    public static Simplifier negSimp = new Simplifier() {
        public Program simplify(Call c) {
            return null;
        }
    };

    public static Simplifier findSimp = new Simplifier() {
        public Program simplify(Call c) {
            Call c2 = new Call(c.function);
            for (Program p : c.args) {
                c2.addArg(p.simplify());
            }
            return c2;
        }
    };

}
