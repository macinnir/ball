var animFlag;
var r = 2;
var p1 = new Point(500,500);
var animationStack = [];
var tmpStack = [];
var c = null;
var rect = null;
var config = {};
var users = [];
var index = 0;
var ctx = null;
var animationMode = 0
// basic init function on load
window.onload = function () {
	c = document.getElementById("gameBox");
	ctx = c.getContext("2d");
	rect = c.getBoundingClientRect();
	config.height = c.height;
	config.width = c.width;
	config.mobileBallSize = 40;
	config.immobileBallSize = 50;
	config.immobileBallNum = 3;
	config.user1 = new User("u1",1);
	config.user2 = new User("u2",2);
	users.push(config.user1);
	users.push(config.user2);
	loadUser();
	c.addEventListener("mousedown", fixBall, false);
	c.addEventListener("mousemove", followMouseBall, false);
	animFlag = setInterval(function() {draw(ctx)}, 25);
}
// main drawing function
function draw(ctx) {
	ctx.clearRect(0,0,c.width,c.height)
	// animationMode == 0 == single frame animation
	if (animationMode == 0 ) {
		for (var i = 0; i < animationStack.length; i++) {
			switch (animationStack[i].kind) {
				case "line":
					drawLine(animationStack[i].start, animationStack[i].end, ctx);
					break; 
				case "ball":
					drawCircle(animationStack[i].position,animationStack[i].radius, ctx)		
			} 
		};
		// draw tmp animationStack
		if (tmpStack.length > 0 ) {
			switch (tmpStack[0].kind) {
				case "line":
					drawLine(tmpStack[0].start, tmpStack[0].end, ctx);
					break; 
				case "ball":
					drawCircle(tmpStack[0].position,tmpStack[0].radius, ctx)
			}	
		}
	// multiframe animation
	} else {
		for (var i = 0; i < animationStack.length; i++) {
			animationStack[i]
			for (var x = 0; x < animationStack[i].length; x++) {
				switch (animationStack[i][x].kind) {
					case "line":
						drawLine(animationStack[i][x].start, animationStack[i][x].end, ctx);
						break; 
					case "ball":
						drawCircle(animationStack[i][x].position,animationStack[i][x].radius, ctx);		
				}
			};
		};
		alert("done");
		reset();
	}
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
function Ball(x,y,r,u) {
	this.position = new Point(x,y);
	this.radius = r;
	this.kind = "ball";
	this.owner = u;
}
// Create a new line from start to end
function Line(start,end) {
	this.start = start;
	this.end = end;
	this.kind = "line"
}
// Create a new User and return it
function User(name, side) {
	this.side = side;
	this.name = name;
	p = new Point((config.width/3)*side, config.height/2);
	this.ballVector = new Line(p, p);
	this.score = 0;
	this.mobileBalls = new Ball(-1000,-1000,config.mobileBallSize, name);
	this.immobileBalls = [];
	for (var i = 0; i < config.immobileBallNum; i++) {
		this.immobileBalls.push(new Ball(-1000,-1000,config.immobileBallSize, name));
	};
}
// follow the mouse around with a ball if there is a ball in the tmpStack
function followMouseBall(event) {
	if (tmpStack.length > 1 ) {
		tmpStack[0].position = {x:getXMouse(event), y:getYMouse(event)}
	} else {
		c.removeEventListener("mousedown", fixBall);
		c.removeEventListener("mousemove", followMouseBall);
		c.addEventListener("mousedown", fixMouseEndPoint, false);
		c.addEventListener("mousemove", followMouseEndpoint, false);
	}
}
// pop the top ball from the tmpStack and push it on to the animationStack
function fixBall(event) {
	console.log(JSON.stringify(tmpStack));
	if (tmpStack.length > 1) {
		animationStack.push(tmpStack.shift());
	}
}

// follow the mouse with a line instead of a ball
function followMouseEndpoint(event) {
	if (tmpStack.length > 0) {
		tmpStack[0].end = {x:getXMouse(event), y:getYMouse(event)};
	}
}
// fix endpoint of line
function fixMouseEndPoint(event) {
	animationStack.push(tmpStack.pop());
	if (index < users.length) {
		loadUser();
		c.removeEventListener("mousedown", fixMouseEndPoint);
		c.removeEventListener("mousemove", followMouseEndpoint);
		c.addEventListener("mousedown", fixBall, false);
		c.addEventListener("mousemove", followMouseBall, false);
	} else {
		submit();
		animationMode = 1;
	}
}
// return x position of mouse in canvas
function getXMouse(event) {
	return event.clientX - rect.left;
}
// return y position of mouse in canvas
function getYMouse(event) {
	return event.clientY - rect.top;
}
// load a users into the tmpStack
function loadUser() {
	u = users[index];
	for (var i = 0; i < u.immobileBalls.length; i++) {
		tmpStack.push(u.immobileBalls[i]);
	};
	tmpStack.push(u.ballVector);
	index +=1;
}

// reset for a new game
function reset() {
	animationMode = 0;
	animationStack = [];
	tmpStack = [];
	index = 0;
	c.removeEventListener("mousedown", fixMouseEndPoint);
	c.removeEventListener("mousemove", followMouseEndpoint);
	c.addEventListener("mousedown", fixBall, false);
	c.addEventListener("mousemove", followMouseBall, false);
	loadUser();
}