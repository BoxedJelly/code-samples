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
public class Variable extends Program{
    String name;
    public Variable(String name){
        this.name = name;
    }
    public String printProgram(){
        return name;
    }
    
    @Override
    public boolean isConst() {
        return false;
    }

    @Override
    public String printProgram(int prec) {
        return "" + name;
    }
}
