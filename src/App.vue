<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <canvas id="canvas"></canvas>
</template>

<script>
import {Chip8} from './components/Chip8.js';
export default {
  name: 'App',
  
  mounted() {
    this.runChip8();
  },
  methods: {
    async runChip8(){
      const chip8 = new Chip8();
      let update = 1;
      while(update){
        const keydown = chip8.keyboard.haskeyDown();
        const iskeydown = chip8.keyboard.iskeyDown(1);
        console.log(keydown, iskeydown);
        await chip8.sleep();
      }
    }
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
