package objects

// Ball is a struct which represents a ball in the game
type Ball struct {
	Position Point   `json:"position"`
	Radius   float64 `json:"radius"`
	Mass     float64 `json:"mass"`
}

// Collision returns if two objects have collided
func (b *Ball) Collision(obj2 Object) bool {
	// type switch on the exact type of obj2
	switch obj2.(type) {
	case *Ball:
		distance := b.Position.DistancePre(&obj2.(*Ball).Position)
		combinedRadius := b.Radius + obj2.(*Ball).Radius
		return (combinedRadius * combinedRadius) > distance
	case *Polygon:
		return false
	default:
		return false
	}
}
