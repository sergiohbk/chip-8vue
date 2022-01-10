<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <canvas id="canvas"></canvas>
</template>

<script>
import {Chip8} from './components/Chip8.js';
export default {
  name: 'App',
  
  mounted() {
    const chip8 = new Chip8();
    chip8.memory.setMemory(0x25,0xFF);
    const result = chip8.memory.getMemory(0x25);
    console.log(result);
  },
  
  components: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
