//CLASS TO LOAD A 3D MODEL
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class Model3D{
	
	constructor(scene, model, x,y,z){
		this.load_model(scene,model,x,y,z);
	}
	
	load_model(scene, path, x,y,z){
		const loader = new GLTFLoader();
		loader.load(path,
					function ( gltf ) {
						var model = gltf.scene;
						model.position.set(x,y,z);
						scene.add(model);
					},
					undefined,
					function ( error ) {
						 console.error( error );
					} );
	}
}

export{ Model3D }
