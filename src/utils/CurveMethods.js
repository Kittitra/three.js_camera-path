import * as THREE from 'three';
import { loadJSON } from '../healpers/JSONHealper';

export async function loadCurveFromJSON(scene, curvePathJSON) {
	
	let curveJSON = await loadJSON(curvePathJSON);
	let curve = createCurveFromJSON(curveJSON);
	let curveTubeMesh = getTubeFromCurveAndJSONData(curve, curveJSON);

	let curveAndMesh = {
		curve: curve,
		mesh: curveTubeMesh
	}
	return curveAndMesh
}

function createCurveFromJSON(json) {

	const vertices = json.points;
    const points = [];

    for (let i = 0; i < vertices.length; i++) {
        const x = vertices[i].x;
        const y = vertices[i].y;
        const z = vertices[i].z;
        points.push(new THREE.Vector3(x, y, z));
    }
    

    
    const curve = new THREE.CatmullRomCurve3(points);
    curve.curveType = 'chordal';
    curve.tension = 0.0;
    curve.closed = false;

    return curve;
}

function getTubeFromCurveAndJSONData(curve, json){
    const geometry = new THREE.TubeGeometry(curve, 100, .05, 8, true)
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);

	return mesh
}