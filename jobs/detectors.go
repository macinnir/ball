package jobs

import (
	"github.com/eliothedeman/ball/objects"
)

// CollisionDetector is a Job that determins if there was a collision between two objects.
type DetectCollision struct {
	obj1, obj2 objects.Object
	JobChan    chan *job
}

// Run the collision tetction between the two objects
func (c *DetectCollision) Run() {
	if c.obj1.Collision(c.obj2) {
		c.jobChan <- &ResoveCollision{ob1: c.obj1, ob2: c.obj2}
	}
}
