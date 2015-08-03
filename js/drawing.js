
var canvas_width = 1000;
var canvas_height = 1000;

var camera, scene, renderer;

var Drawing = (function(global) {
	var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas');
		
	var canvasWidth = 846;
	var canvasHeight = 494;
	var canvasRatio = canvasWidth / canvasHeight;
	// scene
	scene = new THREE.Scene();

	// Camera: Y up, X right, Z up
	windowScale = 4;
	var windowWidth = windowScale * canvasRatio;
	var windowHeight = windowScale;

	camera = new THREE.OrthographicCamera( windowWidth / - 2, windowWidth / 2, windowHeight / 2, windowHeight / - 2, 0, 40 );
	
	var focus = new THREE.Vector3( 0,1,0 );
	camera.position.x = focus.x;
	camera.position.y = focus.y;
	camera.position.z = 10;
	camera.lookAt(focus);

	renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true});
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize( canvasWidth, canvasHeight );
	//renderer.setClearColorHex( 0xffffff, 1.0 );
	
	document.body.appendChild( renderer.domElement );
	    
	window.onload = function(){
		init();
	}
	function PolygonGeometry(sides) {
		var geo = new THREE.Geometry();
		
		// generate vertices
		for ( var pt = 0 ; pt < sides; pt++ )
		{
			// Add 90 degrees so we start at +Y axis, rotate counterclockwise around
			var angle = (Math.PI/2) + (pt / sides) * 2 * Math.PI;

			var x = Math.cos( angle );
			var y = Math.sin( angle );
			
			// YOUR CODE HERE
			//Save the vertex location - fill in the code
			geo.vertices.push( new THREE.Vector3( x, y, 0 ) );
		}
		// YOUR CODE HERE
		// Write the code to generate minimum number of faces for the polygon.
		/*geo.faces.push( new THREE.Face3( 0, 1, 2 ) );
		geo.faces.push( new THREE.Face3( 2, 3, 0 ) );
		geo.faces.push( new THREE.Face3( 3, 4, 0 ) );*/
		//geo.faces.push( new THREE.Face3( 1, 2, 4 ) );
		for (var face = 0; face < sides-2; face++){
			geo.faces.push(new THREE.Face3(0,face+1, face+2));
		}
		// Return the geometry object
		return geo;
	}
	
	function init() {
		var geo = PolygonGeometry(5);
		var material = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.FrontSide } );
		var mesh = new THREE.Mesh( geo, material );
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