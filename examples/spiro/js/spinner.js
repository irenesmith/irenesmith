$(document).ready(function() {
	var canvas = $("#spinner").get(0);
	var context = canvas.getContext("2d");
	var width = context.canvas.width;
	var height = context.canvas.height;

	var centerX = width / 2;
	var centerY = height / 2;

	$('#btnStart').click(function() {
		doSpirograph(context);
	});

	$('#btnClear').click(function() {
		context.clearRect(0, 0, width, height)
		context.beginPath();
	});

	function doSpirograph(context) {
		// How many iterations before clearing the
		// screen and starting fresh.
		//var iterations = Math.floor((Math.random() * 150) + 50);
		var iterations = 5;

		// Define the variables I'll be using
		var a = 200;
		var b, d;
		var rab, lines;
		var alpha, beta, aDif, aOverB;
		var startX, startY;

		// Clear the screen before beginning.
		//context.clearRect(0, 0, width, height)

		// set values for next iteration
        b = Math.floor((Math.random() * 75) + 5);
        d = Math.floor((Math.random() * 250) + 25);

		rab = a - b;
		alpha = 0.0;
		aDif = (Math.PI / 100.0);
		aOverB = a / b;
		lines = Math.floor(200 * (b / gcd(a,b)));

		startX = rab + d + centerX;
		startY = centerY;

		// Pick a random color
		context.lineWidth = 1;
		context.strokeStyle = getRandomColor();

		// Now draw the design.
		for (var i = 1; i <= lines; i++) {
			// Now let's do the drawing
			context.beginPath();
			alpha += aDif;
			beta = alpha * aOverB;
			x = (rab * Math.cos(alpha) + d * Math.cos(beta));
			y = (rab * Math.sin(alpha) - d * Math.sin(beta));

			context.moveTo(startX, startY);
			context.lineTo(x + centerX, y + centerY);

			startX = x + centerX;
			startY = y + centerY;

			context.stroke();
		}
	}

});
