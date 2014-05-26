var animFlag;
var r = 2;
var p1 = new Point(500,500);
var animationStack = []
var tmpStack = []
var c = null
// basic init function on load
window.onload = function () {
	c = document.getElementById("gameBox");
	c.addEventListener("mousedown", addBall, false);
	c.addEventListener("mousemove", followMouse, false);
	var ctx= c.getContext("2d");
	var p1 = new Point(500,500);
	var p2 = new Point(0,0)
	animationStack = getJSON("http://localhost:8080/test.json")
	animFlag = setInterval(function() {draw(ctx)}, 25)

	// load the temp stack up with temp circles which are off the canvas
	for (var i = 0; i < 3; i++) {
		tmpStack.push(new Ball(-10000,-10000,40))
	}
}
// main drawing function
function draw(ctx) {
	ctx.clearRect(0,0,c.width,c.height)
	// draw persistant animationStack
	for (var i = 0; i < animationStack.length; i++) {
		switch (animationStack[i].kind) {
			case "line":
				drawLine(animationStack[i].start, animationStack[i].end, ctx);
				break; 
			case "ball":
				drawCircle(animationStack[i].position,animationStack[i].radius, ctx)
				
		} 
		
	};
	// draw persistant animationStack
	for (var i = 0; i < tmpStack.length; i++) {
		switch (tmpStack[i].kind) {
			case "line":
				drawLine(tmpStack[i].start, tmpStack[i].end, ctx);
				break; 
			case "ball":
				drawCircle(tmpStack[i].position,tmpStack[i].radius, ctx)
				
		} 
		
	};



}

// Draw a circle at Point p with radius r
function drawCircle(p,r,ctx) {
	ctx.beginPath();
	ctx.arc(p.x,p.y,r,0, 2*Math.PI,false);
	ctx.stroke();
	r +=10;
	p1.x +=1
	if (r > 200 ) {
		r = 0;
	}
}

// Draw a line from x1,y1 to x2,y2 with witdth w 
function drawLine(p1,p2,ctx) {
	ctx.beginPath();
	ctx.moveTo(p1.x,p1.y);
	ctx.lineTo(p2.x,p2.y);
	ctx.stroke();
}

// Create a new point at x,y
function Point (x,y) {
	this.x = x;
	this.y = y;
}
// Create a new ball at x,y with radius r
function Ball(x,y,r) {
	this.position = new Point(x,y)
	this.radius = r
	this.kind = "ball"
}
// Create a new line at p1 going to p2
function Line(start,end) {
	this.start = start;
	this.end = end;
	this.kind = "line"
}


// follow the mouse around with a ball if there is a ball in the tmpStack
function followMouse(event) {
	if (tmpStack.length > 0 ) {
		tmpStack[tmpStack.length -1].position = {x:event.clientX, y:event.clientY}
	} else {
		c.removeEventListener("mousedown", addBall);
		c.removeEventListener("mousemove", followMouse);
		c.addEventListener("mousedown", fixEndPoint, false);
		c.addEventListener("mousemove", followEndpoint, false);
		tmpStack.push(new Line(new Point(100,100), new Point(100,100)))
	}
}

// pop the top ball from the tmpStack and push it on to the animationStack
function addBall(event) {
	if (tmpStack.length > 0) {
		animationStack.push(tmpStack.pop());
	}
	
}

// follow the mouse with a line instead of a ball
function followEndpoint(event) {
	if (tmpStack.length > 0) {
		tmpStack[0].end = {x:event.clientX, y:event.clientY};
	}
}

// fix endpoint of line
function fixEndPoint(event) {
	animationStack.push(tmpStack.pop());
	submit();
}

// submit animationStack to api
function submit() {
	c.removeEventListener("mousedown", fixEndPoint);
	c.removeEventListener("mousemove", followEndpoint);
	postJSON("submit",JSON.stringify(animationStack));
}