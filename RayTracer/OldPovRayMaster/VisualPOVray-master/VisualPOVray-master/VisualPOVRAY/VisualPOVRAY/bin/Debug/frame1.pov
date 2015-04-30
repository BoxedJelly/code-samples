#include "colors.inc"
    camera {
        location <0, 2, -3>
        look_at <0, 1, 2>
     }
    sphere {
        <0, 1, 2>, 2
        texture {
            pigment { Red }
        }
    }
    light_source {
        <2, 4, -3> , rgb <1, 1, 1>
        area_light
        4,4,4,4
        fade_distance 0
        fade_power 0
        media_interaction on
        media_attenuation off
    }
