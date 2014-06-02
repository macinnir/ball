package jobs

import (
	"github.com/eliothedeman/ball/objects"
)

// ResolveCollision resolves a detected collision
type ResoveCollision struct {
	obj1, obj2 *objects.Object
	JobChan    chan *Job
}

func (r *ResoveCollision) Run() {
}

// ResolveImpulse resolves the impulse of an object
type ResolveImpulse struct {
	obj *objects.Object
}
