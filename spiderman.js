//spiderman
import * as THREE from './build/three.module.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import * as TWEEN from './tween_js/tween.esm.js';

class Spiderman{
	
	constructor(){
		this.gltfLoader = new GLTFLoader();
		this.model = null;
	}
	
	//sleep function
	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	
	//Animation for initial position
	async init(world,x,y,z){
		var data_loaded = await this.gltfLoader.loadAsync('./models/spiderman.glb');
		this.model = data_loaded.scene;
        this.model.position.set(x,y,z);
        world.add(this.model); 
		 
		var armature = this.model.getObjectByName('mixamorig_HipsArm');
		var shoulderRight = this.model.getObjectByName('mixamorig_RightShoulder');
		var shoulderLeft = this.model.getObjectByName('mixamorig_LeftShoulder');
		 
		var tween = new TWEEN.Tween(armature.rotation).to({y: 3.14}, 1000).start();
		tween = new TWEEN.Tween(shoulderRight.rotation).to({y: -0.1}, 1000).start();
		tween = new TWEEN.Tween(shoulderLeft.rotation).to({y: 0.6}, 1000).start();
	}
	
	//Animation for open a portal
	async open_portal(world,x,y,z){
		var data_loaded = await this.gltfLoader.loadAsync('/models/spiderman.glb');
		this.model = data_loaded.scene;
        this.model.position.set(x,y,z);
        world.add(this.model); 
		
		var armature = this.model.getObjectByName('mixamorig_HipsArm');
        var shoulderRight = this.model.getObjectByName('mixamorig_RightShoulder');
        var armRight = this.model.getObjectByName('mixamorig_RightArm');
        var handRight = this.model.getObjectByName('mixamorig_RightHand');
        var pinkyRight = this.model.getObjectByName('mixamorig_RightHandPinky1');
        var ringRight = this.model.getObjectByName('mixamorig_RightHandRing1');
        var middleRight = this.model.getObjectByName('mixamorig_RightHandMiddle1');
        var indexRight = this.model.getObjectByName('mixamorig_RightHandIndex1');
        var thumbRight = this.model.getObjectByName('mixamorig_RightHandThumb1');
        var shoulderLeft = this.model.getObjectByName('mixamorig_LeftShoulder');
        var handLeft = this.model.getObjectByName('mixamorig_LeftArm');
        var pinkyLeft = this.model.getObjectByName('mixamorig_LeftHandPinky1');
        var ringLeft = this.model.getObjectByName('mixamorig_LeftHandRing1');
        var middleLeft = this.model.getObjectByName('mixamorig_LeftHandMiddle1');
        var indexLeft = this.model.getObjectByName('mixamorig_LeftHandIndex1');
        var thumbLeft = this.model.getObjectByName('mixamorig_LeftHandThumb1');
        var pinkyLeft2 = this.model.getObjectByName('mixamorig_LeftHandPinky2');
        var ringLeft2 = this.model.getObjectByName('mixamorig_LeftHandRing2');
        var middleLeft2 = this.model.getObjectByName('mixamorig_LeftHandMiddle2');
        var indexLeft2 = this.model.getObjectByName('mixamorig_LeftHandIndex2');
        var thumbLeft2 = this.model.getObjectByName('mixamorig_LeftHandThumb2');

		var tween = new TWEEN.Tween(armature.rotation).to({y: 3.14}, 1000).start();
		tween = new TWEEN.Tween(shoulderRight.rotation).to({y: -4.26}, 1000).start();
		tween = new TWEEN.Tween(shoulderLeft.rotation).to({y: -4.26}, 1000).start();
		this.sleep(1200).then(()=> tween = new TWEEN.Tween(shoulderLeft.rotation).to({x: 3.26}, 1000).start());
		tween = new TWEEN.Tween(handLeft.rotation).to({y: 0.5}, 1000).start();
		tween = new TWEEN.Tween(pinkyLeft.rotation).to({y: -3.5}, 1000).start();
		tween = new TWEEN.Tween(ringLeft.rotation).to({y: -3.5}, 1000).start();
		tween = new TWEEN.Tween(middleLeft.rotation).to({y: -3.5}, 1000).start();
		tween = new TWEEN.Tween(indexLeft.rotation).to({y: -3.5}, 1000).start();
		tween = new TWEEN.Tween(thumbLeft.rotation).to({y: -3.5}, 1000).start();
		tween = new TWEEN.Tween(pinkyLeft2.rotation).to({y: -3.5}, 1000).start();
		tween = new TWEEN.Tween(ringLeft2.rotation).to({y: -3.5}, 1000).start();
		tween = new TWEEN.Tween(middleLeft2.rotation).to({y: -3.5}, 1000).start();
		tween = new TWEEN.Tween(indexLeft2.rotation).to({y: -3.5}, 1000).start();
		tween = new TWEEN.Tween(thumbLeft2.rotation).to({y: -3.5}, 1000).start();
		tween = new TWEEN.Tween(handRight.rotation).to({y: -0.5}, 1000).start();
		tween = new TWEEN.Tween(pinkyRight.rotation).to({y: -4.7}, 1000).start();
		tween = new TWEEN.Tween(ringRight.rotation).to({y: -4.7}, 1000).start();
		tween = new TWEEN.Tween(middleRight.rotation).to({y: -4.7}, 1000).start();
		tween = new TWEEN.Tween(indexRight.rotation).to({y: -4.7}, 1000).start();
		tween = new TWEEN.Tween(thumbRight.rotation).to({y: -4.7}, 1000).start();

    }
    
    //Animation of jump when enter in a new world
    async jump(world,x,y,z){
		var data_loaded = await this.gltfLoader.loadAsync('./models/spiderman.glb');
		this.model = data_loaded.scene;
        this.model.position.set(x,y,z);
        world.add(this.model); 
		
		var armature = this.model.getObjectByName('mixamorig_HipsArm');
		var shoulderLeft = this.model.getObjectByName('mixamorig_LeftShoulder');
		var legUpLeft = this.model.getObjectByName('mixamorig_LeftUpLeg');
		var legLeft = this.model.getObjectByName('mixamorig_LeftLeg');
		var shoulderRight = this.model.getObjectByName('mixamorig_RightShoulder');
		var legUpRight = this.model.getObjectByName('mixamorig_RightUpLeg');
		var legRight = this.model.getObjectByName('mixamorig_RightLeg');
		var spine = this.model.getObjectByName('mixamorig_Spine');
		var head = this.model.getObjectByName('mixamorig_Head');
		
		var tween = new TWEEN.Tween(shoulderRight.rotation).to({y: 0.1}, 1000).start();
		tween = new TWEEN.Tween(shoulderLeft.rotation).to({y: 2.5}, 1000).start();
		tween = new TWEEN.Tween(legUpLeft.rotation).to({y: -2.55}, 1000).start();
		tween = new TWEEN.Tween(legLeft.rotation).to({y: -2.35}, 1000).start();
		tween = new TWEEN.Tween(legUpRight.rotation).to({y: -1.55}, 1000).start();
		tween = new TWEEN.Tween(legRight.rotation).to({y: -2.35}, 1000).start();
		this.sleep(500).then(()=>tween = new TWEEN.Tween(spine.rotation).to({y: 0.8}, 1000).start());	
		this.sleep(900).then(()=>tween = new TWEEN.Tween(armature.position).to({y: 1}, 500).start());
		this.sleep(1500).then(()=>tween = new TWEEN.Tween(armature.position).to({y: -0.8}, 500).start());
		this.sleep(500).then(()=>tween = new TWEEN.Tween(legUpLeft.rotation).to({y: 0}, 1000).start());
		this.sleep(500).then(()=>tween = new TWEEN.Tween(head.rotation).to({y: -0.8}, 1000).start());
	}
	
}

export { Spiderman }
