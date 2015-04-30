#include "colors.inc"
#include "textures.inc"
    camera {
        location <0, 2, -3>
        look_at <0, 1, 2>
     }
    plane {
    y, -1
    texture {
      pigment {
        checker
        color rgb<0.5, 0, 0>
        color rgb<0, 0.5, 0.5>
      }
      finish {
        diffuse 0.4
        ambient 0.2
        phong 1
        phong_size 100
        reflection 0.25
      }
    }
  }
  torus {
    1.5, 0.5
    texture { Brown_Agate }
    rotate <90, 160, 0>
    translate <-1, 1, 3>
  }
  box {
    <-1, -1, -1>, <1, 1, 1>
    texture { DMFLightOak }
    translate <2, 0, 2.3>
  }
  cone {
    <8,1,18>, 0, <10,0,22>, 1
    texture { PinkAlabaster }
    scale <1, 3, 1>
    translate <-2, -1, -1>
  }
  sphere {
    <-6,0,7>,1
    texture { Sapphire_Agate }
    translate <1.5, 0, -2>
  }

    
    light_source { 
        <2, 6, -3> 
        color Blue
        cylinder
        radius 20
        tightness 0
        point_at <0, -1, 3>
        }    
        
    light_source {
    <0, 10, -3>
    color White
    spotlight
    radius 15
    falloff 20
    tightness 10
    point_at <0, 0, 0>
  }
    
