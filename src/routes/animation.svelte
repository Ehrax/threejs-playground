<script lang="ts">
	import { createScene, createCube } from '../utils/three.js';
	import { PerspectiveCamera, Clock } from 'three';
	import { onMount } from 'svelte';

	let el: HTMLCanvasElement;

	onMount(() => {
		const width = window.innerWidth;
		const height = window.innerHeight;

		const { renderer, scene } = createScene({ canvas: el, width, height });

		const camera = new PerspectiveCamera(100, width / height, 0.1, 1000);
		camera.position.z = 5;
		scene.add(camera);

		const cube = createCube();
		scene.add(cube);

		const clock = new Clock();
		const tick = () => {
			const time = clock.getElapsedTime();

			cube.rotation.y = time * 4;
			cube.position.x = Math.sin(time) * 3;

			requestAnimationFrame(tick);
			renderer.render(scene, camera);
		};

		tick();
	});
</script>

<canvas bind:this={el} />
