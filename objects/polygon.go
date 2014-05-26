package objects

// Polygon is a Axis Aligned Bounding Box used for collision detection
type Polygon struct {
	Vertices []Point `json:"vertices"`
	Lines    []Line  `json:"lines"`
	Mass     float64 `json:"mass"`
}

// Collision returns if two objects have collided
func (p *Polygon) Collision(obj2 Object) bool {
	// type switch on the exact type of obj2
	switch obj2.(type) {
	case *Ball:
		return false
	case *Polygon:
		return false
	default:
		return false
	}
}
