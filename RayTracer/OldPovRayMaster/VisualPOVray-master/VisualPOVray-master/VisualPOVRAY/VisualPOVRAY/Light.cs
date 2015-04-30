using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VisualPOVRAY
{

    class Light : PovObj
    {
        public Point3 loc, color;
        public String type;
        public Boolean shadows, interaction, atmosphere;

        public float fadeDist, fadePower;
        public Light(Point3 loc, Point3 color, float fadeDist, float fadePower, Boolean shadows = true, Boolean interaction = true, Boolean atmosphere = false, String type = " ")
        {
            this.loc = loc;
            this.color = color;
            this.type = type;
            this.fadeDist = fadeDist;
            this.fadePower = fadePower;
        }

        public void move(Point3 loc)
        {
            this.loc = loc;
        }

        public List<string> render()
        {
            List<string> l = new List<string>();
            l.Add("light_source {");
            l.Add("    " + this.loc.render()[0] + " , rgb " + this.color.render()[0]);
            l.Add("    " + type);
            l.Add("    " + "fade_distance " + fadeDist);
            l.Add("    " + "fade_power " + fadePower);
            if (shadows)
            {
                l.Add("    " + "shadowless");
            }
            if (!interaction)
            {
                l.Add("    " + "media_interaction on");
            }
            else
            {
                l.Add("    " + "media_interaction off");
            }
            if (atmosphere)
            {
                l.Add("    " + "media_attenuation on");
            }
            else
            {
                l.Add("    " + "media_attenuation off");
            }
            l.Add("}");
            return l;
        }
        public static Light pointLight(Point3 loc, Point3 color, float fadeDist, float fadePower, Boolean shadows = true, Boolean interaction = true, Boolean atmosphere = false)
        {
            return new Light(loc, color, fadeDist, fadePower, shadows, interaction, atmosphere, " ");
        }
        public static Light parallelLight(Point3 loc, Point3 color, float fadeDist, float fadePower, Boolean shadows = true, Boolean interaction = true, Boolean atmosphere = false)
        {
            return new Light(loc, color, fadeDist, fadePower, shadows, interaction, atmosphere, "parallel");
        }
        public static Light spotLight(Point3 loc, Point3 color, float fadeDist, float fadePower, Boolean shadows = true, Boolean interaction = true, Boolean atmosphere = false)
        {
            return new Light(loc, color, fadeDist, fadePower, shadows, interaction, atmosphere, "spotlight");
        }
        public static Light cylindricalLight(Point3 loc, Point3 color, float fadeDist, float fadePower, Boolean shadows = true, Boolean interaction = true, Boolean atmosphere = false)
        {
            return new Light(loc, color, fadeDist, fadePower, shadows, interaction, atmosphere, "cylinder");
        }
    }
        class AreaLight : PovObj
        {
            public Point3 loc, color;
            public String type;
            public Boolean shadows, interaction, atmosphere;
            public int width, height, widthLight, heightLight;
            public float fadeDist, fadePower;
            public AreaLight(Point3 loc, Point3 color, int width, int height, int widthLight, int heightLight, float fadeDist, float fadePower, Boolean shadows = true, Boolean interaction = true, Boolean atmosphere = false)
            {
                this.loc = loc;
                this.color = color;

                this.width = width;
                this.height = height;
                this.widthLight = widthLight;
                this.heightLight = heightLight;
                this.fadeDist = fadeDist;
                this.fadePower = fadePower;
                type = "area_light";
            }


            public List<string> render()
            {
                List<string> l = new List<string>();
                l.Add("light_source {");
                l.Add("    " + this.loc.render()[0] + " , rgb " + this.color.render()[0]);
                l.Add("    " + type);
                l.Add("    " + width + "," + height + "," + widthLight + "," + heightLight);
                l.Add("    " + "fade_distance " + fadeDist);
                l.Add("    " + "fade_power " + fadePower);
                if (shadows)
                {
                    l.Add("    " + "shadowless");
                }
                if (!interaction)
                {
                    l.Add("    " + "media_interaction on");
                }
                else
                {
                    l.Add("    " + "media_interaction off");
                }
                if (atmosphere)
                {
                    l.Add("    " + "media_attenuation on");
                }
                else
                {
                    l.Add("    " + "media_attenuation off");
                }
                l.Add("}");
                return l;
            }
        }
    
}

