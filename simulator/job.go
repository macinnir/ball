package simulator

// Job is the basic interface for a simulator job
type Job interface {
	// Do the actual work needed to be done by the job
	run()
}
