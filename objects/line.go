package objects

import (
	"math"
)

// Line is a struct which represents a line between two points
type Line struct {
	Start Point `json:"start"`
	End   Point `json:"end"`
}

// Collision returns if a line intersects another object
func (l *Line) Collision(obj2 Object) bool {
	// type switch on teh exact type of obj2
	switch obj2.(type) {
	case *Ball:
		return l.Distance(&obj2.(*Ball).Position) < obj2.(*Ball).Radius
	case *Polygon:
		return false
	case *Line:
		return false
	default:
		return false
	}
}

// Distance calculates the distance of a point to the nearest point on the line
func (l *Line) Distance(p *Point) float64 {
	a := l.Start.Distance(p)
	b := l.End.Distance(p)
	c := l.Start.Distance(&l.End)
	s := 0.5 * (a + b + c)
	area := math.Sqrt(s * (s - a) * (s - b) * (s - c))
	// finially calculate distance
	return 2 * (area / c)

}

// Slope returns the slope of the line
func (l *Line) Slope() float64 {
	return (l.End.Y - l.Start.Y) / (l.End.X - l.Start.X)
}

//
