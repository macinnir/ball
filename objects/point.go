package objects

import (
	"math"
	"sync"
)

// Point is the basic structure which gives location to a given object
type Point struct {
	*sync.Mutex
	X float64 `json:"x"`
	Y float64 `json:"y"`
}

// Distance returns the distance between two Points
// TODO optomize this so square root is not needed
func (p *Point) Distance(p2 *Point) float64 {
	return math.Sqrt(math.Pow(p.X-p2.X, 2) + math.Pow(p.Y-p2.Y, 2))
}

// DistancePre returns the pre square root distance between two points
// This is done as an optomization to get around using a square root
func (p *Point) DistancePre(p2 *Point) float64 {
	return math.Pow(p.X-p2.X, 2) + math.Pow(p.Y-p2.Y, 2)
}

// Dot returns the dot product of two Points
func (p *Point) Dot(p2 *Point) float64 {
	return (p.X * p2.X) + (p.Y * p2.Y)
}

// Add returns the sum of two Points
func (p *Point) Add(p2 *Point) Point {
	return Point{X: (p.X + p2.X), Y: (p.Y + p2.Y)}
}

// Sub returns p - p2
func (p *Point) Sub(p2 *Point) Point {
	return Point{X: (p.X - p2.X), Y: (p.Y - p2.Y)}
}

// NewPoint creates and returns a new point
func NewPoint(x, y float64) *Point {
	p := &Point{X: x, Y: y}
	p.Mutex = new(sync.Mutex)
	return p
}

// Lock the mutex on the point
func (p *Point) Lock() {
	p.Mutex.Lock()
}

// Unlock the mutex on the point
func (p *Point) Unlock() {
	p.Mutex.Unlock()
}
