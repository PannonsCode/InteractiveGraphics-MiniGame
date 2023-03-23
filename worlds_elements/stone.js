//LOAD A STONE
import * as THREE from '../build/three.module.js';

class Stone{
	
	constructor(x,y,z,color){
		this.stone = this.set_stone(color);
		this.up = true;
		this.max_height = 3;
		this.min_height = 1;
		this.taken = false;
		
		this.stone.position.x = x;
		this.stone.position.y = y;
		this.stone.position.z = z;
	}
	
	//INITIALIZATION
	set_stone(color){
		const geometry = new THREE.SphereGeometry( 0.3, 32, 16 );
		const texture = new THREE.TextureLoader().load( color );
		const material = new THREE.MeshPhongMaterial( { map: texture } );
		const stone = new THREE.Mesh( geometry, material );
		return stone;
	}
	
	//ANIMATION
	animate(){
		if(this.up)
			if(this.stone.position.y < this.max_height)
				this.stone.position.y += 0.02;
			else
				this.up = false;
		else
			if(this.stone.position.y > this.min_height)
				this.stone.position.y -= 0.02;
			else
				this.up = true;
				
		this.stone.rotation.y += 0.08;
	}
}

export { Stone }
