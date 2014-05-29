package simulator

// Job is the basic interface for a simulator job
type Job interface {
	run()
	release()
}
