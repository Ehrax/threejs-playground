<script>
	import { createCube, createScene } from '../utils/three.js';
	import { onMount } from 'svelte';
	import { AxesHelper, PerspectiveCamera } from 'three';
	import HelpButton from '../components/help-button.svelte';

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

		const cube = createCube();
		cube.rotation.x = Math.PI * 0.25;
		cube.rotation.y = Math.PI * 0.25;
		scene.add(cube);

		renderer.render(scene, camera);
	});
</script>

<canvas bind:this={canvas} />
<HelpButton src="/markdown/cube.md" />
