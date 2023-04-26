<script>
	import { onDestroy, onMount } from 'svelte';
	import { threeJSStore } from '../stores/three.store.js';
	import Canvas from '../components/canvas.svelte';
	import { createCube } from '../utils/three.js';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

	let unsubscribe;

	onMount(() => {
		unsubscribe = threeJSStore.subscribe(({ renderer, scene, canvas, camera }) => {
			const cube = createCube();
			cube.rotation.x = Math.PI * 0.25;
			cube.rotation.y = Math.PI * 0.25;
			scene.add(cube);

			const controls = new OrbitControls(camera, canvas);
			controls.enableDamping = true;

			const tick = () => {
				controls.update();
				window.requestAnimationFrame(tick);
				renderer.render(scene, camera);
			};

			tick();
		});
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<Canvas />
