<script>
  import { onMount } from "svelte";
  import { threeJSStore } from '../stores/three.store.js';
  import { getWindowSize } from "../utils/three.js";

  let canvas;

  onMount(() => {
    const {width, height} = getWindowSize();
    threeJSStore.createScene(({canvas, width, height}));
  });

  function handleResize() {
    threeJSStore.resize();
  }

  function handleOpenFullScreen() {
    if (!document.fullscreenElement) {
      canvas.requestFullscreen();
    } else {
      document.exitFullscreen()
    }
  }
</script>

<svelte:window on:resize={handleResize} on:dblclick={handleOpenFullScreen}/>
<canvas bind:this={canvas}></canvas>