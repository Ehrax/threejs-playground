<script>
  import Canvas from '../components/canvas.svelte';
  import HelpButton from '../components/help-button.svelte';
  import { onDestroy, onMount } from "svelte";
  import { threeJSStore } from '../stores/three.store.js';
  import { BufferAttribute, BufferGeometry, Mesh, MeshBasicMaterial } from 'three';
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

  let unsubscribe;

  onMount(() => {
    unsubscribe = threeJSStore.subscribe(({renderer, scene, canvas, camera}) => {
      const geometry = new BufferGeometry();

      // Create 50 triangles (450 values)
      const count = 500
      const positionsArray = new Float32Array(count * 3 * 3)
      for(let i = 0; i < count * 3 * 3; i++)
      {
        positionsArray[i] = (Math.random() - 0.5) * 4
      }
      const positionsAttribute = new BufferAttribute(positionsArray, 3)
      geometry.setAttribute('position', positionsAttribute)

      // const boxGeometry = new BoxGeometry(1, 1, 1, 4, 4, 4);
      // const spehereGeo = new SphereGeometry(1, 32, 32);

      const material = new MeshBasicMaterial({color: 0xf2cc8f, wireframe: true});
      const mesh = new Mesh(geometry, material);

      scene.add(mesh);

      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;

      const tick = () => {
        controls.update();
        window.requestAnimationFrame(tick);
        renderer.render(scene, camera);;
      }

      tick();
    })
  })

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  })
</script>

<Canvas/>
<HelpButton src="/markdown/geometries.svelte" />