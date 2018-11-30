function draw_grid(ctx, minor, major, stroke, fill) {
	minor = minor || 10;
	major = major || minor * 5;
	stroke = stroke || "#00FF00";
	fill = fill || "#009900";

	ctx.save();
	ctx.strokeStyle = stroke;
	ctx.fillStyle = fill;
	let width = ctx.canvas.width, height = ctx.canvas.height

	for(var x = 0; x < width; x += minor) {
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, height);
		ctx.lineWidth = (x % major == 0) ? 0.5 : 0.25;
		ctx.stroke();
		if(x % major == 0 ) {
			ctx.fillText(x, x, 10);
		}
	}
	for(var y = 0; y < height; y += minor) {
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(width, y);
		ctx.lineWidth = (y % major == 0) ? 0.5 : 0.25;
		ctx.stroke();
		if(y % major == 0 ) {
			ctx.fillText(y, 0, y + 10);
		}
	}
	ctx.restore();
}

function getRandomColor() {
    var r = (Math.floor((Math.random() * 255) + 1)).toString(16);
    var g = (Math.floor((Math.random() * 255) + 1)).toString(16);
    var b = (Math.floor((Math.random() * 255) + 1)).toString(16);
    return '#' + r + g + b;
}

function HighestCommonFactor(a, b) {
	var i = 0;
	var j = 0;
	var hcf = 0;

	if(a < b) {
		hcf = 1;
		i = b;
	} else {
		hcf = b;
		i = a;
	}

	do {
		j = i % hcf;
		if (j != 0) {
			i = hcf;
			hcf = j;
		}
	} while(j != 0);

	return hcf;
}

function gcd(a,b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) {var temp = a; a = b; b = temp;}
    while (true) {
        if (b == 0) return a;
        a %= b;
        if (a == 0) return b;
        b %= a;
    }
}