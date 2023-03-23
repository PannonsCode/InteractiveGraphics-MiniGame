//LOAD A PORTAL
import * as THREE from '../build/three.module.js';

class Portal{
	
	constructor(){
		this.portal = this.set_portal();
		this.open = false;
	}
	
	//INITIALIZATION
	set_portal(){
		const geometry = new THREE.CircleGeometry( 3, 64);
		const texture = new THREE.TextureLoader().load( './textures/portal2.JPG' );
		const material = new THREE.MeshBasicMaterial( { map: texture } );
		const portal = new THREE.Mesh( geometry, material );
		return portal;
	}
	
	//SET POSITION
	set_position(x,y,z){
		this.portal.position.set(x,y,z);
	}
	
	//ANIMATION
	animate(){
		this.portal.rotation.z += 0.1;
	}
}

export {Portal}
