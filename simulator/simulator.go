package simulator

// Simulator is the object that coordanates workers for the game computations
type Simulator struct {
	killChan    chan struct{}
	workerQueue chan *Worker
	numWorkers,
	maxWorkers int
	JobChan chan *Job
}

// ListenAndServer listen for new requrests and serve the responses
func (s *Simulator) ListenAndServer() {
	for {

		select {

		case tmp := <-s.JobChan:
			// see if there is an open worker
			select {
			// if there is an open worker, assign the job to that worker and run the job
			case w := <-s.workerQueue:
				w.job = tmp
				go w.job.run()
			// if there is no open worker, but the max number of workers has not been reaches, create a new worker and assign it the job
			default:
				if s.numWorkers < s.maxWorkers {
					w := NewWorker(s)
					w.job = tmp
					go w.Run()
					s.numWorkers += 1
				} else {
					// if a new worker cannot be created, block until a worker is ready
					w := <-s.workerQueue
					w.job = tmp
					go w.Run()
				}
			}
		// If signal on killChan is recieved, close all channels and return the function.
		case <-s.killChan:
			close(s.JobChan)
			close(s.killChan)
			return
		}
	}
}
