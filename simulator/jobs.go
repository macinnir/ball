package simulator

import (
	"github.com/eliothedeman/ball/objects"
)

// CollisionDetector is a Job that determins if there was a collision between two objects.
type CollisionDetector struct {
	obj1, obj2     objects.Object
	resolutionChan chan *Resolution
}
