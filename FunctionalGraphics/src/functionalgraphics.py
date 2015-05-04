# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.
from java.awt import Color
from java.awt.event import ActionListener
from java.awt.event import MouseAdapter
from java.lang import Math
from javax.swing import JFrame, JFileChooser
from BoilerPlateClasses import *
from Numerics import *
from math import *
from javax.imageio import ImageIO
from java.io import File
import random

__author__ = "macowner"
__date__ = "$Mar 2, 2015 8:07:22 AM$"
#-----------------------------GLOBAL VARS----------------------------------
winsize = 200
f = "strawberry.jpeg"



def getimage(f):
    img = ImageIO.read(File(f))
    print img.getRGB(100,100)
    w = img.getWidth()
    h = img.getHeight()
    size = max(w,h)
    def fn(p):   #staging
        i = int(((p.x+1.0)*w)/2.0)
        j = int(((p.y+1.0)*w)/2.0)
        
        if i < w and j < h and i >= 0 and j >= 0:    
            rgb = img.getRGB(i,j)
            r = (rgb >> 16) & 0xFF
            g = (rgb >> 8) & 0xFF
            b = rgb & 0xFF
            color = C(r/255.0, g/255.0, b/255.0)
            return color
        else:
            return C(0,0,0,0)
        
    return fn
    
#-----------------------------GLOBAL VARS----------------------------------
#----------------------------CUSTOM CLASSES------------------------------------
        
class Infix:
    def __init__(self, function):
        self.function = function
    def __ror__(self, other):
        return Infix(lambda x, self=self, other=other: self.function(other, x))
    def __or__(self, other):
        return self.function(other)
    def __rlshift__(self, other):
        return Infix(lambda x, self=self, other=other: self.function(other, x))
    def __rshift__(self, other):
        return self.function(other)
    def __call__(self, value1, value2):
        return self.function(value1, value2)
    
#-------------------------------CUSTOM CLASSES----------------------------------
#-----------------------------FUNCTIONAL STUFFS---------------------------------
# Basic functional programming
id = lambda x:x  # The identity function
o = Infix(lambda f1, f2: lambda x: f1(f2(x)))  # Function composition: (f |o| g)(x) = f(g(x))
const = lambda x: lambda y: x # const(x) returns a function which always returns x
scale = lambda s: lambda x: x*s
translate = lambda p: lambda x: x-p

# Arithmetic over functionals
fplus = Infix(lambda f1, f2: lambda x: f1(x) + f2(x))
fminus = Infix(lambda f1, f2: lambda x: f1(x) - f2(x))
ftimes = Infix(lambda f1, f2: lambda x: f1(x) * f2(x))
fhalf = Infix(lambda f1, f2: lambda x: .5*f1(x) + .5*f2(x))

# Numeric functions
one = const(1)
zero = const(0)
frac = id |fminus| floor
step = lambda x: 1 if x>= 0 else 0
xstep = lambda a: step |o| translate(a)
norm = lambda x: abs(x)
norm2 = lambda x: a.norm2()
repeat = lambda d: lambda x: d*frac(x*1.0/d)
maxc = lambda x: lambda y: max(x,y)
minc = lambda x: lambda y: min(x,y)

# Various 1-D functions that yield fractions:
pulse = step |fminus| xstep(1)
pulses = pulse |o| repeat(2)
tooth = lambda x: 0 if x < 0 else x if x < 1 else 2-x if x < 2 else 0
teeth = tooth |o| repeat(2)

# Functions that work at all dimensions:
disk = step |o| (one |fminus| norm)
colorDisk = lambda p: C(.5, .2, .8) if norm(p) < .5 else C(.2, .9, .2)
circles = pulses |o| norm |o| scale(8)  ## Try frac instead of pulses
circles2 = circles |o| translate(P2(.2, 0))
both = circles |fhalf| circles2
loadedimage = getimage(f)


def createGrid(size):
    r = random
    return [[r.uniform(0,1) for x in range(size)] for y in range(size)] 

def interp1d(y1,y2,t):
    ft = t * pi
    f = (1-cos(ft)) * 0.5
    return (y1 * (1.0-f)) + (y2 * f)
def interp2d(i1, i2, i3, i4, tx, ty):
    x = interp1d(i1, i2, ty)
    y = interp1d(i3, i4, ty)
    return interp1d(x, y, tx)

def interpGrid(grid, p, size):
    i = int(((p.x + 1) / 2.0) * (size -1))
    j = int(((p.y + 1) / 2.0) * (size - 1))
    ix = (((2.0 * i)  / (size - 1)) - 1) 
    jx = (((2.0 * j) / (size - 1)) - 1) 
    tx = (p.x -ix) / (2.0 / (size - 1))
    ty = (p.y - jx) / (2.0 / (size - 1))
    if i >= 0 and i < size -1 and j >= 0 and j < size -1:
        return interp2d(grid[i][j], grid[i][j + 1], grid[i + 1][j], grid[i + 1] [j + 1], tx, ty)
    else:
        return 0
    
def noise(octaves, per):
    grids = []
    for i in range(octaves):
        size = 2 ** i + 1
        grids.append(createGrid(size))
    max = 0
    intense = 1.0
    for i in range(octaves):
        max = max + intense
        intense = intense * per
    def getColor(p):
        total = 0 
        intense = 1.0
        for g in grids:
            total = total + (intense * interpGrid(g, p, len(g)))
            intense = intense * per
        return total / max
    return getColor

def rotate(p2):
    return p2.rotate()
def norm(p2):
    return p2.norm2()
def center(i,j,n):
    x = ((i*2.0)/n)-1
    y = ((j*2.0)/n)-1
    return P2(x,y)

def viewer(fn, screensize):
    screen = [[0 for x in range(screensize)] for x in range(screensize)]
    for i in range(0, screensize):
        for j in range(0, screensize):
            p = center(i,j,screensize)
            c = fn(p)
            #print p, c
            if isinstance(c, int) or isinstance(c, float):
                if c <= 1 or c >=0:
                    screen[i][j] = C(c,c,c,1)
            elif isinstance(c, bool):
                screen[i][j] = C(1,1,1,1) if c else C(0,0,0,1)
            else:
                screen[i][j] = c
    return screen  

#-----------------------------FUNCTIONAL STUFFS---------------------------------
#-------------------------------DAS FRAME!!!------------------------------------
        
class Viewer(JFrame):
    
    def __init__(self):
        super(Viewer, self).__init__()
        self.makeMe()
    
    def mypaint(self, g):
        perlin = noise(8,.25)
        c = viewer(perlin,winsize)
        for i in range(0, len(c)):
            for j in range(0, len(c[0])):
                clr = Color(int(c[i][j].r*255),int(c[i][j].g*255),int(c[i][j].b*255),int(c[i][j].a*255))
                g.setColor(clr)
                g.fillRect(i,j,i+1,j+1)
    
    def myclick(self, x, y):
        pass
    
    def makeMe(self):
        self.colormake = C
        self.test = disk(P2(0.0,0.96))
        
        self.setTitle("Functional Graphics")
        self.setLayout(None) 
        self.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE)
        self.setLocationRelativeTo(None)
        self.setSize(winsize*2,winsize*2)
        self.setVisible(True)
        
        self.panel = GameWindow(lambda g: self.mypaint(g),lambda x, y: self.myclick(x, y))
        self.panel.setBackground(Color(100,250,100))
        self.getContentPane().add(self.panel)
        self.panel.setBounds(10,10,winsize,winsize)
        self.panel.setOpaque(False)
    
program = Viewer()