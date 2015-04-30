#include "colors.inc"
    camera {
        location <0, 2, -3>
        look_at <0, 1, 2>
    normal {bumps 0}
     }
    light_source {
        <2, 4, -3> , rgb <1, 1, 1>
        
        fade_distance 1
        fade_power 1
        media_interaction on
        media_attenuation off
    }
    sphere {
        <0, 1, 2>, 70.2
        texture {
            pigment { Red }
        }
        rotate <0, 0, 0>
        translate <0, 0, 0>
    }
    sphere {
        <0, 0, 0>, 1
        texture {
            pigment { Red }
        }
        rotate <0, 0, 0>
        translate <0, 0, 0>
    }
