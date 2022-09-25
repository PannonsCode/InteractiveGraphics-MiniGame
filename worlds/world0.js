//HOME PAGE
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Portal } from '/worlds_elements/portal.js';
import { Stone } from '/worlds_elements/stone.js';
import { Model3D } from '/worlds_elements/model3D.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import {Util} from "/utils.js";
import { World1 } from '/worlds/world1.js';
import { Spiderman } from '/spiderman.js';

class World0{
	
	constructor(camera){
		this.scene_camera = camera;
		this.portal1 = new Portal();
		this.portal1.set_position(-7,7,0);
		this.portal2 = new Portal();
		this.portal2.set_position(7,-7,0);
		this.portal3 = new Portal();
		this.portal3.set_position(-7,-7,0);
		this.portal4 = new Portal();
		this.portal4.set_position(7,7,0);
		this.start = null;
		this.info = null;
		this.scene = this.set_world0();
		this.camera={
			x: 0,
			y: 0,
			z: 10
		};
		this.spider = new Spiderman();
		this.spider.init(this.scene, this.camera.x,-1,this.camera.z-5);
	}
	
	//INITIALIZE WORLD
	set_world0(){
				
		//SCENE
		const scene = new THREE.Scene();
		scene.background = new THREE.Color( 'skyblue' );

		//OBJECTS
		const geometry = new THREE.BoxGeometry( 5, 2 );
		const texture = new THREE.TextureLoader().load( 'textures/start.png' );
		const material = new THREE.MeshBasicMaterial( {map: texture} );
		this.start = new THREE.Mesh( geometry, material );
		this.start.position.set(-5,0,0);
		this.start.rotation.y = 0.7;
		scene.add( this.start );
		const geometry2 = new THREE.BoxGeometry( 5, 2 );
		const texture2 = new THREE.TextureLoader().load( 'textures/info.png' );
		const material2 = new THREE.MeshBasicMaterial( {map: texture2} );
		this.info = new THREE.Mesh( geometry2, material2 );
		this.info.position.set(5,0,0);
		this.info.rotation.y = -0.5;
		scene.add( this.info );
		scene.add(this.portal1.portal);
		scene.add(this.portal2.portal);
		scene.add(this.portal3.portal);
		scene.add(this.portal4.portal);
		
		window.alert("WELCOME IN THIS GAME, YOU CAN CHOOSE TO START OR TO GET MORE INFO, GOING TROUGH THE RELATIVE BOX AND CROSSING IT USING THE ARROWS OF THE KEYBOARD (UP, DOWN, LEFT, RIGHT). \n (When you reach the exact position, an alert message will appear).");
		return scene;
	}
	
	//ANIMATION OF THE WORLD
	animate(){
		this.portal1.animate();
		this.portal2.animate();
		this.portal3.animate();
		this.portal4.animate();
		if(this.start.position.x==this.scene_camera.position.x && this.start.position.z==this.scene_camera.position.z){
			Util.world = new World1(this.scene_camera);
			this.scene_camera.position.x = Util.world.camera.x;
			this.scene_camera.position.y = Util.world.camera.y;
			this.scene_camera.position.z = Util.world.camera.z;
		}
		if(this.info.position.x==this.scene_camera.position.x && this.info.position.z==this.scene_camera.position.z){
			window.alert("IN THIS GAME YOU WILL CROSS 4 WORDS TO FIND AND COLLECT 6 STONES. \n A PORTAL WILL BE OPENED WHEN YOU COLLECTED ALL THE STONES OF THESE WORLD. \n To intercat with the objects (collect stones and cross portals) you have move trough them and reach the same position using the arrorws of the keyboard (UP,DOWN,LEFT,RIGHT) and the letters 'A' and 'D' to rotate a little bit the camera on the right or on the left. \n An alert message will appear when you reached the right position. \n  \n ATTENTION: THE CHARACTER (SPIDERMAN) IS NOT MOVING, ONLY THE CAMERA MOVES, SO TO REACH THE OBJECT YOU HAVE TO MOVE THE CAMERA AS IF YOU WERE WALKING YOURSELF. \n GOOD FUN!!!!");
			this.scene_camera.position.x = Util.world.camera.x;
			this.scene_camera.position.y = Util.world.camera.y;
			this.scene_camera.position.z = Util.world.camera.z;
		}
	}
}

export {World0};
