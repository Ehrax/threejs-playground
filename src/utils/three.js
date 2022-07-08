import { BoxGeometry, Mesh, MeshBasicMaterial, Scene, WebGLRenderer } from 'three';

export const createScene = ({ canvas, width, height }) => {
	const scene = new Scene();
	const renderer = new WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(width, height);

	return { scene, renderer };
};

export const createCube = () => {
	return new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ color: 0xef233c }));
};

export const getWindowSize = () => {
	return {
		width: window.innerWidth,
		height: window.innerHeight
	};
};
