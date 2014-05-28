package main

import (
	"io"
	"io/ioutil"
	"log"
	"net/http"
)

// takea  response from the client, run simulation, and return result
func Submit(w http.ResponseWriter, req *http.Request) {
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		log.Println("Faild read response.")
		return
	}
	log.Println(string(body))
	w.Header().Set("Content-Type", "application/json")
	io.WriteString(w, `[[{"start":{"x":682.6666666666666,"y":384},"end":{"x":875,"y":344},"kind":"line"}]]`)
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("game/")))
	http.HandleFunc("/submit", Submit)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("listenAndServer: ", err)
	}
}
