var canvas_width = 1000;
var canvas_height = 1000;

var Drawing = (function(global) {
	var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas');
		
	canvas.width = canvas_width;
    canvas.height = canvas_height;
    doc.body.appendChild(canvas);
	window.onload = function(){
		init();
	}
	function init() {
		console.log("init");
		main();
	} // end init
	function main() {
		console.log("main");
		render();
		win.requestAnimationFrame(main);
	} // end main	
	function render(){
		console.log("render");
	} // end render
	
})(this);