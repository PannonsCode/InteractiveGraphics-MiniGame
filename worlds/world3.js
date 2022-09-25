//World 3
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Portal } from '/worlds_elements/portal.js';
import { Stone } from '/worlds_elements/stone.js';
import { Model3D } from '/worlds_elements/model3D.js';
import {Util} from "/utils.js";
import { World4 } from '/worlds/world4.js';
import { Spiderman } from '/spiderman.js';

class World3{
	
	constructor(camera){
		this.scene_camera = camera;
		this.portal = new Portal();
		this.stone1 = new Stone(60,2,-40,'textures/viola.jpg');
		this.stone1.stone.name = "stone1";
		this.tot_stones = 1;
		this.accumulated_stones = 0;
		this.spotLight = new THREE.SpotLight( 0xffffff, 10 );
		this.scene = this.set_world3();
		this.camera={
			x: 0,
			y: 3,
			z: 30
		};
		this.spiderman = new Spiderman();
		this.animated = false;
		this.spiderman.jump(this.scene, this.camera.x,0.2,this.camera.z-5);
	}
	
	//INITIALIZATION OF THE WORLD
	set_world3(){
				
		//SCENE
		const scene = new THREE.Scene();
		scene.background = new THREE.Color( 'black' );

		//LIGHT
		const ambientLight = new THREE.AmbientLight( 'black' );
		scene.add( ambientLight );
		this.spotLight.position.set( 0, 50, 25 );
		this.spotLight.angle = Math.PI / 6;
		this.spotLight.penumbra = 1;
		this.spotLight.decay = 2;
		this.spotLight.distance = 100;
		this.spotLight.castShadow = true;
		this.spotLight.shadow.camera.near = 10;
		this.spotLight.shadow.camera.far = 2000;
		this.spotLight.shadow.camera.fov = 180;
		this.spotLight.shadow.focus = 1;
		scene.add( this.spotLight );
		const spotLight2 = new THREE.SpotLight( 0xffffff, 10 );
		spotLight2.position.set( 100, 25, -100 );
		spotLight2.angle = Math.PI / 6;
		spotLight2.penumbra = 1;
		spotLight2.decay = 2;
		spotLight2.distance = 100;
		spotLight2.castShadow = true;
		spotLight2.shadow.camera.near = 10;
		spotLight2.shadow.camera.far = 200;
		spotLight2.shadow.focus = 1;
		scene.add( spotLight2 );
		const spotLight3 = new THREE.SpotLight( 0xffffff, 10 );
		spotLight3.position.set( -100, 25, -100 );
		spotLight3.angle = Math.PI / 6;
		spotLight3.penumbra = 1;
		spotLight3.decay = 2;
		spotLight3.distance = 100;
		spotLight3.castShadow = true;
		spotLight3.shadow.camera.near = 10;
		spotLight3.shadow.camera.far = 200;
		spotLight3.shadow.focus = 1;
		scene.add( spotLight3 );

		//FLOOR
		const geometry = new THREE.PlaneGeometry(400, 300);
		const texture = new THREE.TextureLoader().load( 'textures/railways.jpg' )
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set( 64, 64 );;
		const material = new THREE.MeshLambertMaterial( { map: texture } );
		const mesh = new THREE.Mesh( geometry, material);
		mesh.rotation.x = - Math.PI / 2;
		mesh.receiveShadow = true;
		scene.add( mesh );

		//OBJECTS
		scene.add(this.stone1.stone);
		new Model3D(scene,'models/wall.glb',-180,0.2,-100);
		new Model3D(scene,'models/wall.glb',-130,0.2,-100);
		new Model3D(scene,'models/wall.glb',-80,0.2,-100);
		new Model3D(scene,'models/wall.glb',0,0.2,-100);
		new Model3D(scene,'models/wall.glb',50,0.2,-100);
		new Model3D(scene,'models/wall.glb',100,0.2,-100);
		new Model3D(scene,'models/wall.glb',150,0.2,-100);
		new Model3D(scene,'models/wall.glb',-180,0.2,0);
		new Model3D(scene,'models/wall.glb',-130,0.2,0);
		new Model3D(scene,'models/wall.glb',-80,0.2,0);
		new Model3D(scene,'models/wall.glb',-30,0.2,0);
		new Model3D(scene,'models/wall.glb',20,0.2,0);
		new Model3D(scene,'models/wall.glb',100,0.2,0);
		new Model3D(scene,'models/wall.glb',150,0.2,0);
		new Model3D(scene,'models/wall.glb',-180,0.2,100);
		new Model3D(scene,'models/wall.glb',-130,0.2,100);
		new Model3D(scene,'models/wall.glb',-80,0.2,100);
		new Model3D(scene,'models/wall.glb',0,0.2,100);
		new Model3D(scene,'models/wall.glb',50,0.2,100);
		new Model3D(scene,'models/wall.glb',80,0.2,100);
		new Model3D(scene,'models/wall.glb',150,0.2,100);
		new Model3D(scene,'models/wall.glb',-120,2,130);
		new Model3D(scene,'models/wall.glb',100,0.2,130);
		new Model3D(scene,'models/wall.glb',-120,2,70);
		new Model3D(scene,'models/wall.glb',100,0.2,70);
		new Model3D(scene,'models/wall.glb',-120,2,-60);
		new Model3D(scene,'models/wall.glb',100,0.2,-60);
		new Model3D(scene,'models/wall.glb',0,2,-40);
		new Model3D(scene,'models/wall.glb',0,0.2,40);

		window.alert("GOING IN THE THIRD WORLD, YOU HAVE TO FIND ONLY A STONE!!! \n (Hint: look on the right)");
		return scene;
	}
	
	//SLEEP FUNCTION
	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	
	//ANIMATION OF THE WORLD
	animate(){
		this.spotLight.position.x = this.scene_camera.position.x;
		this.spotLight.position.z += this.scene_camera.position.z-this.spotLight.position.z;
		if(!this.stone1.taken && this.stone1.stone.position.x==this.scene_camera.position.x && this.stone1.stone.position.z==this.scene_camera.position.z){
			window.alert("YOU COLLECTED THE STONE!!! \n NOW A PORTAL WILL BE OPENED, CROSS TROUGH IT!");
			this.stone1.taken = true;
			this.scene.remove(this.scene.getObjectByName("stone1"));
			this.accumulated_stones += 1;
			const x_portal = this.scene_camera.position.x;
			const z_portal = this.scene_camera.position.z-10;
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
			Util.world = new World4(this.scene_camera);
			this.scene_camera.position.x = Util.world.camera.x;
			this.scene_camera.position.y = Util.world.camera.y;
			this.scene_camera.position.z = Util.world.camera.z;
		}
	}
}

export {World3};
