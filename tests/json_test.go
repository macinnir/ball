package tests

import (
	"encoding/json"
	"github.com/eliothedeman/ball/objects"
	"testing"
)

// TestPointJson test the json encoding of a Point Object
func TestPointJson(t *testing.T) {
	p := objects.Point{X: 0.0, Y: 0.0}
	j, err := json.Marshal(p)
	if err != nil {
		t.Errorf("Point p could nto be parsed into json")
	}
	if string(j) != `{"x":0,"y":0}` {
		t.Errorf(`Expected {"x":0,"y":0}, got %s`, string(j))
	}
}

// TestLineJson test the json encoding of a Line Object
func TestLineJson(t *testing.T) {
	l := objects.Line{}
	l.Start = objects.Point{X: 0.0, Y: 0.0}
	l.End = objects.Point{X: 10.0, Y: 10.0}
	j, err := json.Marshal(l)
	if err != nil {
		t.Errorf("Point p could nto be parsed into json")
	}
	if string(j) != `{"start":{"x":0,"y":0},"end":{"x":10,"y":10}}` {
		t.Errorf(`Expected {"start":{"x":0,"y":0},"end":{"x":10,"y":10}}, got %s`, string(j))
	}
}
