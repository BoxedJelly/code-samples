using System;

public class PointLight : Light

{
    Point3 color;

	public PointLight(Point3 color, Point3 loc) : base(loc)
	{
        this.color = color;
        this.loc = loc;
	}

        public void move(Point3 loc)
        {
            this.loc = loc;
        }

        public List<string> render()
        {
            List<string> l = new List<string>();
            l.Add("light_source { ");
            l.Add("    "+ this.loc.render() + ", rgb " + this.color.render());
            l.Add("    ");
            return l;
        }

}
