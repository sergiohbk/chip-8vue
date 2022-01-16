import { INITIAL_VOLUME } from "./variables/SoundCardConstants";

export class SoundCard{
    constructor(){
        this.soundEnable = false;
        if("AudioContext" in window || "webkitAudioContext" in window){
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.gainNode = this.audioContext.createGain();
            this.gainNode.connect(this.audioContext.destination);
            this.gainNode.gain.value = INITIAL_VOLUME;
            let soundEnable = false;
            let oscillator;
            Object.defineProperties(this, {
                soundEnable:{
                    get:()=>{
                        return soundEnable;
                    },
                    set:(value)=>{
                        if(value === soundEnable){
                            return;
                        }
                        soundEnable = value;
                        if(soundEnable){
                            oscillator = this.audioContext.createOscillator({
                                type: "square",
                            });
                            oscillator.connect(this.gainNode);
                            oscillator.start();
                        }else{
                            oscillator.stop();
                        }
                    }
                }
            })
        }
    }

    enableSound(){
        this.soundEnable = true;
    }
    disableSound(){
        this.soundEnable = false;
    }
}