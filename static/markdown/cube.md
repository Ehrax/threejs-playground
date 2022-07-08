# Cube
Creating a basic cube in three.js is quite simple for that we need:
- a canvas `document.querySelector('.canvas')`
- a scene a scene
- a camera to show our object
- a render to render everything

to create those we can use the following code:
```
import * as THREE from 'three';

const canvas = document.querySelector('.canvas');

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({canvass});
render.setSize(window.innerWidth, window.innerHeight); // to set the size of the canvas

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; // we need to zoom out a bit to see our cube

const cube = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({color: 0x00ff00}));
scene.add(cube);

renderer.render(scene, camera);
```

# Docs
- [Scene](https://threejs.org/docs/index.html#api/en/scenes/Scene)
- [BoxGeometry](https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry)
- [MeshBasicMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial)
- [Mesh](https://threejs.org/docs/index.html#api/en/objects/Mesh)
- [PerspectiveCamera](https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera)
- [WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)
- [Color](https://threejs.org/docs/index.html#api/en/math/Color)