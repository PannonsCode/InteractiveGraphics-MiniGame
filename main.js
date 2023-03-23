//main.js
import * as THREE from 'three';
import Stats from './three/addons/libs/stats.module.js';
import { GLTFLoader } from './three/addons/loaders/GLTFLoader.js';
import { Model3D } from './worlds_elements/model3D.js';
import { World0 } from './worlds/world0.js';
import { World1 } from './worlds/world1.js';
import { World2 } from './worlds/world2.js';
import { World3 } from './worlds/world3.js';
import { World4 } from './worlds/world4.js';
import { Spiderman } from './spiderman.js';
import * as TWEEN from './tween_js/tween.esm.js';
import {Util} from "./utils.js";

var world, camera;

//INIT-----------------------------------------------------------------------------------------------------------------------------------------
function init(spiderman){
	
	//CAMERA
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	
	//FIRS TSCENE
	Util.world = new World0(camera);
	Util.world_selected = 0;
	camera.position.x = Util.world.camera.x;
	camera.position.y = Util.world.camera.y;
	camera.position.z = Util.world.camera.z;
	
	//RENDER
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//container
	const container = document.querySelector('#scene-container');
	container.append(renderer.domElement);


	//EVENTS
	document.addEventListener("keydown", getKeyAndMove, false);

	function getKeyAndMove(e) {
		var key_code = e.which || e.keyCode;
		switch (key_code) {
			case 37:
				camera.position.x -= 1;
			break;
			
			case 38:
				camera.position.z -= 1;
			break;
			
			case 39:
				camera.position.x += 1;
			break;
			
			case 40:
				camera.position.z += 1;
			break;
			
			case 65:
				camera.rotation.y -=0.5*Math.PI/180;
			break;
			
			case 68:
				camera.rotation.y +=0.5*Math.PI/180;
			break;
			
			case 83:
				camera.rotation.x +=0.5*Math.PI/180;
			break;
			
			case 87:
				camera.rotation.x -=0.5*Math.PI/180;
			break;
		}
	}

	
	//ANIMATE WORLD
	function animate() {
		requestAnimationFrame( animate );
		Util.world.animate();
		TWEEN.update();
		renderer.render( Util.world.scene, camera );
	};

	animate();
}

//main call
init();
