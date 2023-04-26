<script>
	import { onDestroy, onMount } from 'svelte';
	import { threeJSStore } from '../stores/three.store.js';
	import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

	import * as lil from 'lil-gui';
	import gsap from 'gsap';

	import Canvas from '../components/canvas.svelte';

	let unsubscribe;
	let gui;

	onMount(() => {
		unsubscribe = threeJSStore.subscribe(({ renderer, scene, canvas, camera }) => {
			gui = new lil.GUI();

			const geometry = new BoxGeometry(1, 1, 1);
			const material = new MeshBasicMaterial({ color: 0xef233c });
			const mesh = new Mesh(geometry, material);
			scene.add(mesh);

			const guiParams = {
				spin: () => {
					gsap.to(mesh.rotation, {
						duration: 1,
						y: Math.PI * 2
					});
				}
			};

			// debug
			gui.addColor(material, 'color');
			gui.add(mesh.position, 'y', -3, 3, 0.01);
			gui.add(mesh.position, 'x', -3, 3, 0.01);
			gui.add(mesh.position, 'z', -3, 3, 0.01);
			gui.add(material, 'wireframe');
			gui.add(mesh, 'visible');
			gui.add(guiParams, 'spin');

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

		if (gui) {
			gui.destroy();
		}
	});
</script>

<Canvas />
