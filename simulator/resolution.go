package simulator

// Resolution represents the actions needed to resolve a conflict between two objects
type Resolution interface {
	Resolve()
}
