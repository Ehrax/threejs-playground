import { writable } from 'svelte/store';
import { PerspectiveCamera } from 'three';
import { createScene, getWindowSize } from '../utils/three.js';

function createThreeJSStore() {
	const { subscribe, set, update } = writable();

	return {
		subscribe,
		createScene: ({ canvas, width, height }) => {
			const { renderer, scene } = createScene({ canvas, width, height });

			const camera = new PerspectiveCamera(100, width / height);
			camera.position.z = 3;
			scene.add(camera);

			set({ renderer, scene, camera, canvas, width, height });
		},
		resize: () => {
			const { width, height } = getWindowSize();
			update(({ renderer, camera, ...props }) => {
				camera.aspect = width / height;
				camera.updateProjectionMatrix();

				renderer.setSize(width, height);
				renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

				return {
					...props,
					width,
					height,
					renderer,
					camera
				};
			});
		}
	};
}

export const threeJSStore = createThreeJSStore();
