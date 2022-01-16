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
    this.runChip8(chip8);
  },
  methods: {
    async runChip8(chip8){
      let loop = true
      chip8.registers.ST = 0x10;
      while(loop){
        await chip8.sleep(200)
        if(chip8.registers.DT > 0){
          await chip8.sleep()
          chip8.registers.DT--
        }
        if(chip8.registers.ST > 0){
          chip8.soundcard.enableSound()
          await chip8.sleep()
          chip8.registers.ST--
        }
        if(chip8.registers.ST == 0){
          chip8.soundcard.disableSound()
        }
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
