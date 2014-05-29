package simulator

// Worker is the basic structure for managing work in the simulator
type Worker struct {
	job   *Job
	mySim *Simulator
}

// NewWorker creates a new empty worker and returns a pointer to it
func NewWorker(s *Simulator) *Worker {
	w := Worker{mySim: s}
	return &w
}
