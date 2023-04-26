<script>
	import { createScene } from '../utils/three.js';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import * as Noise from 'noisejs';

	let canvas;

	onMount(() => {
		const width = window.innerWidth;
		const height = window.innerHeight;

		const { renderer, scene } = createScene({ canvas: canvas, width, height });

		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
		scene.add(camera);

		// Set up geometry for lines
		const geometry = new THREE.BufferGeometry();
		const positions = [];
		const colors = [];
		const numLines = 30000; // Number of lines to draw

		// Create noise generator
		const noise = new Noise.Noise(Math.random());

		// Loop to generate line points and colors
		for (let i = 0; i < numLines; i++) {
			const x1 = Math.random() * 2 - 1; // Random x coordinate for start point (-1 to 1)
			const y1 = Math.random() * 2 - 1; // Random y coordinate for start point (-1 to 1)
			const x2 = x1 + (Math.random() - 0.5) * 0.1; // Random x coordinate for end point (-1 to 1) with slight variation
			const y2 = y1 + (Math.random() - 0.5) * 0.1; // Random y coordinate for end point (-1 to 1) with slight variation

			// Calculate color based on noise
			const color = new THREE.Color();
			color.setHSL(0.5, 1, Math.abs(THREE.MathUtils.clamp(noise.perlin2(x1, y1), 0, 1)));

			// Add points and colors to the buffers
			positions.push(x1, y1, 0);
			colors.push(color.r, color.g, color.b);
			positions.push(x2, y2, 0);
			colors.push(color.r, color.g, color.b);
		}

		// Set up buffers for position and color attributes
		geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

		// Set up material with shader for rendering lines
		const material = new THREE.ShaderMaterial({
			vertexShader: `
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
            vColor = color;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
			fragmentShader: `
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `
		});

		// Create mesh and add to the scene
		const linesMesh = new THREE.LineSegments(geometry, material);
		scene.add(linesMesh);

		// Render loop
		function render() {
			requestAnimationFrame(render);
			renderer.render(scene, camera);
		}
		render();
	});
</script>

<canvas bind:this={canvas} />
