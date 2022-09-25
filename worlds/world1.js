//World 1
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Portal } from '/worlds_elements/portal.js';
import { Stone } from '/worlds_elements/stone.js';
import { Model3D } from '/worlds_elements/model3D.js';
import { Spiderman } from '/spiderman.js';
import {Util} from "/utils.js";
import { World2 } from '/worlds/world2.js';

class World1{
	
	constructor(camera){

		this.scene_camera = camera;
		this.portal = new Portal();
		this.stone1 = new Stone(30,2,-50,'textures/blue.jpg');
		this.stone1.stone.name = "stone1";
		this.stone2 = new Stone(-20,2,-20,'textures/red.jpg');
		this.stone2.stone.name = "stone2";
		this.tot_stones = 2;
		this.accumulated_stones = 0;
		this.scene = this.set_world1();
		this.camera={
			x: 0,
			y: 2,
			z: 4
		};
		this.spiderman = new Spiderman();
		this.animated = false;
		this.spiderman.jump(this.scene, this.camera.x,0.2,this.camera.z-5);
	}
	
	//INITIALIZATION OF THE WORLD
	set_world1(){
				
		//SCENE
		const scene = new THREE.Scene();
		scene.background = new THREE.Color( 'steelblue' );
		scene.fog = new THREE.Fog( 0xa0a0a0, 20, 50 );


		//LIGHT
		const ambientLight = new THREE.AmbientLight( 0x404040 );
		scene.add( ambientLight );
		const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
		hemiLight.position.set( 0, 20, 0 );
		scene.add( hemiLight );

		//FLOOR
		const geometry = new THREE.PlaneGeometry( 1000, 1000 );
		const texture = new THREE.TextureLoader().load( 'textures/ground1.jpg' )
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set( 64, 64 );;
		const material = new THREE.MeshBasicMaterial( { map: texture } );
		const mesh = new THREE.Mesh( geometry, material);
		mesh.rotation.x = - Math.PI / 2;
		mesh.receiveShadow = true;
		scene.add( mesh );

		//OBJECTS
		scene.add(this.stone1.stone);
		scene.add(this.stone2.stone);

		for(var i=0;i<10;i++){
			var x = Math.random() * 100 +1;
			var z = Math.random() * 100 +1;
			new Model3D(scene,'models/tree.glb',x,0.5,z);
			var x = Math.random() * 100 +1;
			var z = Math.random() * 100 +1;
			new Model3D(scene, 'models/tree.glb', -x,0.5,z);
			var x = Math.random() * 100 +1;
			var z = Math.random() * 100 +1;
			new Model3D(scene,'models/tree.glb', x,0.5,-z);
			var x = Math.random() * 100 +1;
			var z = Math.random() * 100 +1;
			new Model3D(scene,'models/tree.glb',-x,0.5,-z);
		}
		
		for(var i=0;i<10;i++){
			var x = Math.random() * 200 +1;
			var z = Math.random() * 200 +1;
			new Model3D(scene,'models/tree2.glb',x,0.5,z);
			var x = Math.random() * 200 +1;
			var z = Math.random() * 200 +1;
			new Model3D(scene, 'models/tree2.glb', -x,0.5,z);
			var x = Math.random() * 200 +1;
			var z = Math.random() * 200 +1;
			new Model3D(scene,'models/tree2.glb', x,0.5,-z);
			var x = Math.random() * 200 +1;
			var z = Math.random() * 200 +1;
			new Model3D(scene,'models/tree2.glb',-x,0.5,-z);
		}
		
		window.alert("GOING IN THE FIRST WORLD, LOOK FOR THE 2 STONES!!! \n (Hint: look on the left and on the right)");
		return scene;
	}
	
	//SLEEP FUNCTION
	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	
	//ANIMATION OF THE WORLD
	animate(){
		if(!this.stone1.taken && this.stone1.stone.position.x==this.scene_camera.position.x && this.stone1.stone.position.z==this.scene_camera.position.z){
			window.alert("YOU COLLECTED A STONE!!");
			this.stone1.taken = true;
			this.scene.remove(this.scene.getObjectByName("stone1"));
			this.accumulated_stones += 1;
			if(this.accumulated_stones==2)
				window.alert("YOU COLLECTED BOTH THE STONES!!! \n NOW A PORTAL WILL BE OPENED, CROSS TROUGH IT!");
		}
		else{
			if(this.stone1.taken!=true)
				this.stone1.animate();
		}
		if(!this.stone2.taken && this.stone2.stone.position.x==this.scene_camera.position.x && this.stone2.stone.position.z==this.scene_camera.position.z){
			window.alert("YOU COLLECTED A STONE!!");
			this.stone2.taken = true;
			this.scene.remove(this.scene.getObjectByName("stone2"));
			this.accumulated_stones += 1;
			if(this.accumulated_stones==2)
				window.alert("YOU COLLECTED BOTH THE STONES!!! \n NOW A PORTAL WILL BE OPENED, CROSS TROUGH IT!");
		}
		else{
			if(this.stone2.taken!=true)
				this.stone2.animate();
		}
		if(this.accumulated_stones==this.tot_stones){
			this.portal.open = true;
			if(!this.animated){
				this.animated = true;
				this.spiderman.open_portal(this.scene, this.scene_camera.position.x,0.2,this.scene_camera.position.z-5);
				this.portal.set_position(this.scene_camera.position.x,3,this.scene_camera.position.z-10);
			}
			this.sleep(1000).then(() => (this.scene.add(this.portal.portal),1000));
			this.portal.animate();
		}
		if(this.portal.open && this.portal.portal.position.x==this.scene_camera.position.x && this.portal.portal.position.z==this.scene_camera.position.z){
			Util.world = new World2(this.scene_camera);
			this.scene_camera.position.x = Util.world.camera.x;
			this.scene_camera.position.y = Util.world.camera.y;
			this.scene_camera.position.z = Util.world.camera.z;
		}
	}
}

export {World1};
