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
public class Number extends Program{
    double value;
    
    public Number(double value){
            this.value = value;
    }
    public String printProgram(){
        return "" + value;
    }

    @Override
    public String printProgram(int prec) { 
        return ""+ this.value; //To change body of generated methods, choose Tools | Templates.
    }
    
    @Override
    public double cval(){
        return value;
    }
    
    @Override
    public boolean isConst() {
        return true;
    }
    
    @Override
    public boolean isConst(double d) {
        return value == d;
    }
    
}
