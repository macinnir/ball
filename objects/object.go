package objects

// Object is the interface which all objects must impliment
type Object interface {
	// return if two objects have collided
	Collision(obj2 Object) bool
}
