<script>
	import { createScene } from '../utils/three.js';
	import { onMount } from 'svelte';
	import {
		AxesHelper,
		BoxGeometry,
		Group,
		Mesh,
		MeshBasicMaterial,
		PerspectiveCamera
	} from 'three';

	let canvas;

	onMount(() => {
		const width = window.innerWidth;
		const height = window.innerHeight;

		const { renderer, scene } = createScene({ canvas, width, height });

		const axesHelper = new AxesHelper(2);
		scene.add(axesHelper);

		const camera = new PerspectiveCamera(75, width / height);
		camera.position.z = 3;
		scene.add(camera);

		const group = new Group();
		group.scale.y = 2;
		group.rotation.y = 0.2;

		const cube1 = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ color: 0xff0000 }));
		cube1.position.x = -1.5;
		group.add(cube1);

		const cube2 = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ color: 0xff0000 }));
		cube2.position.x = 0;
		group.add(cube2);

		const cube3 = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ color: 0xff0000 }));
		cube3.position.x = 1.5;
		group.add(cube3);

		scene.add(group);

		renderer.render(scene, camera);
	});
</script>

<canvas bind:this={canvas} />
