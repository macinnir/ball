package objects

import (
	"sync"
)

// Ball is a struct which represents a ball in the game
type Ball struct {
	*sync.Mutex
	Position *Point  `json:"position"`
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

// NewBall returns a pointer to a newly created ball
func NewBall(p Point, r float64, m float64) *Ball {
	b := &Ball{Position: p, Rasius: r, Mass: m}
	b.Mutex = new(sync.Mutex)
	return b
}

// Lock the mutex on the ball
func (b *Ball) Lock() {
	b.Mutex.Lock()
}

// Unlock the mutex on the ball
func (b *Ball) Unlock() {
	b.Mutex.Unlock()
}
