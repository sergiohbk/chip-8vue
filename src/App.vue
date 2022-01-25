<template>
  <div class="box">
    <div class="title">
      <h1>CHIP 8</h1>
    </div>
    <div class="subtitle">
      <h4>emulador by sergiohbk</h4>
    </div>
  </div>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import {Chip8} from './components/Chip8.js';

export default {
  name: 'App',
  data() {
    return {
      rom: '',
    }
  },
  
  mounted() {
    this.runChip8();
  },
  methods: {
    async runChip8(){
      const rom = await fetch('./roms/test.ch8'); //hay que meterlo en public porque fetch es especialito, en fin xD
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
body{
  margin: 0;
}
#app {
  font-family: Avenir, 'Lucida Sans Unicode', Geneva, Verdana, sans-serif, Helvetica, Arial, sans-serif, Book Antiqua;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: rgb(41, 41, 41);
}
.box{
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title{
  width: 30%;
  position: relative;
  height: 50px;
}
.title > h1{
  font-family: 'Lucida Sans Unicode';
  color: #fff;
  animation: mainFadeIn 2s forwards;
  -o-animation: mainFadeIn 2s forwards;
  -webkit-animation: mainFadeIn 2s forwards;
  opacity: 0;
}
.subtitle{
  width: 100%;
  position: relative;
  height: 30px;
  margin-top: -3px;
}
.subtitle > h4{
  font-family: 'Lucida Sans Unicode';
  color: rgb(255, 255, 255);
  animation: subFadeIn 2s forwards;
  -o-animation: subFadeIn 2s forwards;
  -webkit-animation: subFadeIn 2s forwards;
  animation-delay: 1.6s;
  letter-spacing: 7px;
  opacity: 0;
}

@keyframes mainFadeIn {
  0% {
    width: 75%;
    opacity: 0;
    
  }
  100% {
    width: 100%;
    opacity: 1;
  }
}
@keyframes subFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
