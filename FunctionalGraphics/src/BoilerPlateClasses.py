# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

__author__ = "macowner"
__date__ = "$Mar 11, 2015 8:38:21 AM$"

from javax.swing import JPanel
from java.awt.event import ActionListener
from java.awt.event import MouseAdapter
from math import *
from java.lang import Math

#-----------------------------BOILER PLATE CLASSES---------------------------------
    
class P2:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __add__(self,p):
        return P2(self.x+p.x, self.y+p.y)
    def __sub__(self, p):
        return P2(self.x-p.x, self.y-p.y)        
    def __abs__(self):
        return Math.sqrt(self.x*self.x+self.y*self.y)
    def __mul__(self,p):
        return P2(self.x*p, self.y*p)
    def dist(self, p):
        return Math.sqrt(((self.y-p.y)*(self.y-p.y))+((self.x-p.x)*(self.x-p.x)))
    def __str__(self):
        return "("+str(self.x)+","+str(self.y)+")"
    def __repr__(self):
        return "("+str(self.x)+","+str(self.y)+")"
    def rotate(self, ang):
        x2 = x*math.cos(math.radians(ang)) - y*math.sin(math.radians(ang))
        y2 = y*math.cos(math.radians(ang)) + x*math.sin(math.radians(ang))
        return P2(x2,y2)
    def norm2(self):
        return self.x*self.x+self.y*self.y
        
class P3:
    def __init__(self, x, y, z):
        self.x = x
        self.y = y     
        self.z = z
        
    def __str__(self):
        return "("+str(self.x)+","+str(self.y)+","+str(self.z)+")"
    def __repr__(self):
        return "("+str(self.x)+","+str(self.y)+","+str(self.z)+")"
    def __add__(self,p):
        return P2(self.x+p.x, self.y+p.y, self.z+p.z)
    def __sub__(self, p):
        return P2(self.x-p.x, self.y-p.y, self.z-p.z)
    def __mul__(self,p):
        return P2(self.x*p, self.y*p, self.z*p.z)
    def norm2(self):
        return self.x*self.x+self.y*self.y+self.z*self.z
    def __abs__(self):
        return Math.sqrt(self.norm2())
        
class C:
    def __init__(self, r, g, b, alpha=1): # opaque is alpha = 1. 
        self.r = r
        self.g = g
        self.b = b
        self.a = alpha
        
    def getalpha(self):
        pass
    
    def __str__(self):
        return "c("+str(self.r)+","+str(self.g)+","+str(self.b)+","+str(self.a)+")"


class MA(MouseAdapter):
    def __init__(self, clicker):
        self.clicker = clicker
    def mouseClicked(self, event):
        self.clicker(event.getX(), event.getY())

class GameWindow(JPanel):
    
    def __init__(self, drawer, click):
        super(GameWindow, self).__init__()
        self.drawer = drawer
        self.click = click
        self.addMouseListener(MA(lambda x, y: self.click(x,y)))
        
    def paint(self, g):
        JPanel.paint(self, g)
        self.drawer(g)
        
#-----------------------------BOILER PLATE CLASSES---------------------------------
