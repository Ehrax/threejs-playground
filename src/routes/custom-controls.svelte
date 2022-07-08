<script>
  import { onMount } from "svelte";
  import { createScene, getWindowSize, createCube } from '../utils/three.js'
  import { PerspectiveCamera } from "three";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

  let el;

  onMount(() => {
    const {width, height} = getWindowSize();
    const {scene, renderer} = createScene({canvas: el, width, height});

    const cube = createCube();
    scene.add(cube);

    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 3;
    camera.lookAt(cube);
    scene.add(camera);

    const controls = new OrbitControls(camera, el);
    controls.enableDamping = true

    const tick = () => {
      controls.update();
      window.requestAnimationFrame(tick);
      renderer.render(scene, camera);
    };

    tick();
  });
</script>

<canvas bind:this={el}></canvas>