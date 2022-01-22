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
      const rom = await fetch('./rom/test.ch8'); //hay que meterlo en public porque fetch es especialito, en fin xD
      const buffer = await rom.arrayBuffer();
      const rombuffer = new Uint8Array(buffer);
      const chip8 = new Chip8(rombuffer);
      chip8.running = true;
      while(chip8.running){
        await chip8.sleep();
        if(chip8.registers.DT > 0)
        {
          await chip8.sleep();
          chip8.registers.DT--;
        }
        if(chip8.registers.ST > 0)
        {
          chip8.soundcard.enableSound();
          await chip8.sleep();
          chip8.registers.ST--;
        }
        if(chip8.registers.ST === 0){
          chip8.soundcard.disableSound();
        }
        chip8.run();
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
