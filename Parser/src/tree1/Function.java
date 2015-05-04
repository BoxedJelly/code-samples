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
public class Function {
    
    public String name;
    public int leftPrec = 0, myPrec = 0, rightPrec = 0; 
    public Printer printer;
    public Simplifier simplifier = Simplifiers.noSimp;    
    
    public Function(String name){
        this.name = name;
        this.printer = Functions.printPrefix;
    }
    
    public Function(String name, Simplifier simp){
        this.name = name;
        this.simplifier = simp;
        this.printer = Functions.printPrefix;
    }
    
    public Function(String name, Simplifier simp, int myPrec, int rightPrec){
        this.name = name;
        this.simplifier = simp;
        this.myPrec = myPrec;
        this.rightPrec = rightPrec;
        this.printer = Functions.printUnary;
    }
    
    public Function(String name, Simplifier simp, int leftPrec, int myPrec, int rightPrec){
        this.name = name;
        this.simplifier = simp;
        this.leftPrec = leftPrec;
        this.myPrec = myPrec;
        this.rightPrec = rightPrec;
        this.printer = Functions.printInfix;
    }
    
    
}
