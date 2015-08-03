
var canvas_width = 1000;
var canvas_height = 1000;

var camera, scene, renderer;

var Drawing = (function(global) {
	var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas');
		
	canvas.width = canvas_width;
    canvas.height = canvas_height;
	//doc.body.appendChild(canvas);
	
	var canvasRatio = canvas.width / canvas.height;
	
	// scene
	scene = new THREE.Scene();

	// Camera: Y up, X right, Z up
	windowScale = 10;
	var windowWidth = windowScale * canvasRatio;
	var windowHeight = windowScale;	
	
	camera = new THREE.OrthographicCamera( windowWidth / - 2, windowWidth / 2,
		windowHeight / 2, windowHeight / - 2, 0, 40 );
	
	var focus = new THREE.Vector3( 5,4,0 );
	camera.position.x = focus.x;
	camera.position.y = focus.y;
	camera.position.z = 10;
	camera.lookAt( focus );

	renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true});
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize( canvas.width, canvas.height );
	//renderer.setClearColorHex( 0xffffff, 1.0 );
	
	document.body.appendChild( renderer.domElement );
	    
	window.onload = function(){
		init();
	}
	function init() {
		var geometry = new THREE.BoxGeometry( 5, 5, 5 );
            var material = new THREE.MeshLambertMaterial( { color: 0xFF0000 } );
            var mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );
			
			var light = new THREE.PointLight( 0xFFFF00 );
            light.position.set( 10, 0, 10 );
            scene.add( light );

            renderer.setClearColor( 0xdddddd, 1);
            renderer.render( scene, camera );
		//showGrids();
		main();
	} // end init
	function main() {
		render();
		win.requestAnimationFrame(main);
	} // end main	
	function render(){
	} // end render
	function showGrids() {
		// Background grid and axes. Grid step size is 1, axes cross at 0, 0
		Coordinates.drawGrid({size:100,scale:1,orientation:"z"});
		Coordinates.drawAxes({axisLength:11,axisOrientation:"x",axisRadius:0.04});
		Coordinates.drawAxes({axisLength:11,axisOrientation:"y",axisRadius:0.04});
	}	
})(this);