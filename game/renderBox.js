/**
 * Objects 
 */ 

	var animFlag;
	var r = 2;
	var p1 = new Point(500,500);
	var tmpStack = [];
	var rect = null;
	var index = 0;
	var animationMode = 0;
	var frameIndex = 0;

	
	var Balls = function(configVars){
		
		if ( arguments.callee._singletonInstance )
	    	return arguments.callee._singletonInstance;
	  	arguments.callee._singletonInstance = this;

	  	this.config = { 
	  		height : 0, 
	  		width : 0, 
	  		immobileBallSize : 40, 
	  		immobileBallNum : 3, 
	  		mobileBallSize : 40,
	  		user1 : {}, 
	  		user2 : {}

	  	};

	  	if(configVars){ 
	  		console.log('config vars!'); 
	  		$.extend(this.config, configVars); 
	  	}


	  	this.gameBox = {}; 
	  	this.ctx = null; 
	  	this.users = []; 
	  	this.animationStack = []; 

	  	// Initialize the game
		this.Init = function(){ 

			this.gameBox = document.getElementById("gameBox");
			this.ctx = this.gameBox.getContext("2d");

			rect = this.gameBox.getBoundingClientRect();
			this.config.height = this.gameBox.height;
			this.config.width = this.gameBox.width;
			// this.config.mobileBallSize = 40;
			// this.config.immobileBallSize = 50;
			// this.config.immobileBallNum = 3;
			this.config.user1 = new User("u1",1);
			this.config.user2 = new User("u2",2);
			this.users.push(this.config.user1);
			this.users.push(this.config.user2);
			this.loadUser();
			this.gameBox.addEventListener("mousedown", fixBall, false);
			this.gameBox.addEventListener("mousemove", followMouseBall, false);
			animFlag = setInterval(function() {	Balls().draw(); }, 15);

		}; 

		// load a users into the tmpStack
		this.loadUser = function() {
			u = this.users[index];
			for (var i = 0; i < u.immobileBalls.length; i++) {
				tmpStack.push(u.immobileBalls[i]);
			};
			tmpStack.push(u.ballVector);
			index +=1;
		};

		// reset for a new game
		this.reset = function() {
			
			animationMode = 0;
			frameIndex = 0;
			this.animationStack = [];
			tmpStack = [];
			index = 0;
			
			this.gameBox.removeEventListener("mousedown", fixMouseEndPoint);
			this.gameBox.removeEventListener("mousemove", followMouseEndpoint);
			this.gameBox.addEventListener("mousedown", fixBall, false);
			this.gameBox.addEventListener("mousemove", followMouseBall, false);
			
			this.loadUser();

		};

		// main drawing function
		this.draw = function(){ 

			this.ctx.clearRect(0,0,this.gameBox.width,this.gameBox.height)
			// animationMode == 0 == single frame animation
			if (animationMode == 0 ) {
				for (var i = 0; i < this.animationStack.length; i++) {
					switch (this.animationStack[i].kind) {
						case "line":
							this.drawLine(this.animationStack[i].start, this.animationStack[i].end);
							break; 
						case "ball":
							this.drawCircle(this.animationStack[i].position,this.animationStack[i].radius)		
					} 
				};
				// draw tmp animationStack
				if (tmpStack.length > 0 ) {
					switch (tmpStack[0].kind) {
						case "line":
							this.drawLine(tmpStack[0].start, tmpStack[0].end);
							break; 
						case "ball":
							this.drawCircle(tmpStack[0].position,tmpStack[0].radius)
					}	
				}
			// multiframe animation
			} else {
				
				if (frameIndex < this.animationStack.length) {
					for (var x = 0; x < this.animationStack[frameIndex].length; x++) {
						switch (this.animationStack[frameIndex][x].kind) {
							case "line":
								this.drawLine(this.animationStack[frameIndex][x].start, this.animationStack[frameIndex][x].end);
								break; 
							case "ball":
								this.drawCircle(this.animationStack[frameIndex][x].position, this.animationStack[frameIndex][x].radius);		
						}
					};
					frameIndex +=1;
				} else {
					alert(JSON.stringify(this.animationStack));
					this.reset();
				}
				
			}

		}; 

		// Draw a circle at Point p with radius r
		this.drawCircle = function(p,r) { 

			this.ctx.beginPath();
			this.ctx.arc(p.x,p.y,r,0, 2*Math.PI,false);
			this.ctx.stroke();
			r +=10;
			p1.x +=1
			
			if (r > 200 ) {
				r = 0;
			}

		};

		// Draw a line from x1,y1 to x2,y2 with witdth w 
		this.drawLine = function(p1,p2,ctx) {
		
			this.ctx.beginPath();
			this.ctx.moveTo(p1.x,p1.y);
			this.ctx.lineTo(p2.x,p2.y);
			this.ctx.stroke();
		
		};


	}; 

/**
 * Objects
 */ 
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
		p = new Point((Balls().config.width/3)*side, Balls().config.height/2);
		this.ballVector = new Line(p, p);
		this.score = 0;
		this.mobileBalls = new Ball(-1000,-1000,Balls().config.mobileBallSize, name);
		this.immobileBalls = [];
		for (var i = 0; i < Balls().config.immobileBallNum; i++) {
			this.immobileBalls.push(new Ball(-1000,-1000,Balls().config.immobileBallSize, name));
		};
	}

/**
 * Event Handlers 
 */ 
	// follow the mouse around with a ball if there is a ball in the tmpStack
	function followMouseBall(event) {
		if (tmpStack.length > 1 ) {
			tmpStack[0].position = {x:getXMouse(event), y:getYMouse(event)}
		} else {
			Balls().gameBox.removeEventListener("mousedown", fixBall);
			Balls().gameBox.removeEventListener("mousemove", followMouseBall);
			Balls().gameBox.addEventListener("mousedown", fixMouseEndPoint, false);
			Balls().gameBox.addEventListener("mousemove", followMouseEndpoint, false);
		}
	}

	// pop the top ball from the tmpStack and push it on to the animationStack
	function fixBall(event) {
		console.log(JSON.stringify(tmpStack));
		if (tmpStack.length > 1) {
			Balls().animationStack.push(tmpStack.shift());
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
		Balls().animationStack.push(tmpStack.pop());
		if (index < Balls().users.length) {
			Balls().loadUser();
			Balls().gameBox.removeEventListener("mousedown", fixMouseEndPoint);
			Balls().gameBox.removeEventListener("mousemove", followMouseEndpoint);
			Balls().gameBox.addEventListener("mousedown", fixBall, false);
			Balls().gameBox.addEventListener("mousemove", followMouseBall, false);
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


