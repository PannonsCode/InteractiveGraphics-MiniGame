//World4
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Portal } from '/worlds_elements/portal.js';
import { Stone } from '/worlds_elements/stone.js';
import { Model3D } from '/worlds_elements/model3D.js';
import {Util} from "/utils.js";
import { World0 } from '/worlds/world0.js';
import { Spiderman } from '/spiderman.js';

class World4{
	
	constructor(camera){
		this.scene_camera = camera;
		this.portal = new Portal();
		this.stone1 = new Stone(30,2,-50,'textures/green.jpg');
		this.stone1.stone.name = "stone1";
		this.tot_stones = 1;
		this.accumulated_stones = 0;
		this.scene = this.set_world4();
		this.camera={
			x: 3,
			y: 1.5,
			z: 8
		};
		this.spiderman = new Spiderman();
		this.animated = false;
		this.spiderman.jump(this.scene, this.camera.x,0.2,this.camera.z-5);
	}
	
	//INITIALIZATION OF THE WORLD
	set_world4(){
				
		//SCENE
		const scene = new THREE.Scene();
		scene.background = new THREE.Color( 'lightsalmon' );
		scene.fog = new THREE.Fog( 'lightsalmon', 10, 500 );


		//LIGHT
		const ambientLight = new THREE.AmbientLight( 0x404040 );
		scene.add( ambientLight );
		const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
		hemiLight.position.set( 0, 20, 0 );
		scene.add( hemiLight );
		
		//FLOOR
		const geometry = new THREE.PlaneGeometry( 400, 400 );
		const texture = new THREE.TextureLoader().load( 'textures/stone_floor.jpg' )
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
		new Model3D(scene,'models/destroyed_warehouse.glb',-80,0.2,50)
		new Model3D(scene,'models/city2.glb',80,15,-100)
		new Model3D(scene,'models/centro_storico.glb',0,-55,-200)
		
		window.alert("GOING IN THE FOURTH WORLD, YOU HAVE TO FIND ONLY A STONE!!!");
		return scene;
	}
	
	//SLEEP FUNCTION
	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	
	//ANIMATION OF THE WORLD
	animate(){
		if(!this.stone1.taken && this.stone1.stone.position.x==this.scene_camera.position.x && this.stone1.stone.position.z==this.scene_camera.position.z){
			window.alert("CONGRATULATION!!!! \n YOU COLLECTED ALL THE STONE AND FINISHED THE GAME, CROSSING THIS LAST PORTAL YOU WILL RETURN TO THE HOME, BYE!!!");
			this.stone1.taken = true;
			this.scene.remove(this.scene.getObjectByName("stone1"));
			this.accumulated_stones += 1;
		}
		else{
			if(this.stone1.taken!=true)
				this.stone1.animate();
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
			Util.world = new World0(this.scene_camera);
			this.scene_camera.position.x = Util.world.camera.x;
			this.scene_camera.position.y = Util.world.camera.y;
			this.scene_camera.position.z = Util.world.camera.z;
		}
	}
}

export {World4};
