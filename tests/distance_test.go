package tests

import (
	"github.com/eliothedeman/ball/objects"

	"testing"
)

//BenchmarkBallDistance test performance of a ball to ball collision detection

func BenchmarkBallCollision(b *testing.B) {
	obj1 := objects.Ball{}
	obj2 := objects.Ball{}
	obj1.Position.X = 100.0
	obj1.Position.Y = 20.0
	obj1.Radius = 2.0
	obj2.Position.X = 16.0
	obj2.Position.Y = 21.0
	obj2.Radius = 2.0

	// calculate distance between two objects
	for n := 0; n < b.N; n++ {
		obj1.Collision(&obj2)
	}
}
