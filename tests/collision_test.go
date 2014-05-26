package tests

import (
	"github.com/eliothedeman/ball/objects"
	"testing"
)

// TestCollisionBalls test to see if two Balls are touching
func TestCollisionBallsFalse(t *testing.T) {
	obj1 := objects.Ball{}
	obj2 := objects.Ball{}
	obj1.Position.X = 100.0
	obj1.Position.Y = 20.0
	obj1.Radius = 2.0
	obj2.Position.X = 16.0
	obj2.Position.Y = 21.0
	obj2.Radius = 2.0
	result := obj1.Collision(&obj2)
	if result {
		t.Errorf("CollisionBallsFalse: %t Expected: false", result)
	}
}
