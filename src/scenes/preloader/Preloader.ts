import BaseResolution from 'app/BaseResolution';
import KeyboardSettings from 'app/KeyboardSettings';
import PreloadedAssets from 'app/PreloadedAssets';
import Scene from 'app/scenes/Scene';
import BrandPresents from 'app/scenes/brandPresents/BrandPresents';
import {cloneImage} from 'app/util/Image';
import $ from 'jquery';

export default class Preloader extends Scene {
    dots: number = 0;
    adviceTickId: number = 0;
    queue = new createjs.LoadQueue;
    queueFailed = false;

    constructor() {
        super();
        this.initialize();
    }

    override initialize(): void {
        super.initialize();
        this.uiContainer!.innerHTML = `<div class="TextArea" style="width: 300px" id="preloadingAdvice"></div>`;

        this.queue.loadFile({id: 'cutscenes_orakioVersusLaya', src: 'res/img/cutscenes/orakio-versus-laya-1.png'});
        this.queue.loadFile({id: 'cutscenes_womanOnBeach', src: 'res/img/cutscenes/woman-on-beach.mp4', type: createjs.AbstractLoader.BINARY});
        this.queue.loadFile({id: 'cutscenes_outerspace1', src: 'res/img/cutscenes/outerspace-1.png'});
        this.queue.loadFile({id: 'logo', src: 'res/img/logo/logo.png'});
        this.queue.loadFile({id: 'segaLogo', src: 'res/img/segalogo/logo.svg'});
        this.queue.loadFile({id: 'overworldGeneration1', src: 'res/img/overworldcharacters/generation1.png'});
        this.queue.loadFile({id: 'overworldGeneration2', src: 'res/img/overworldcharacters/generation2.png'});
        this.queue.loadFile({id: 'overworldGeneration3', src: 'res/img/overworldcharacters/generation3.png'});

        this.queue.on('error', evt => {
            this.queue_onError(evt);
        });
        this.queue.on('complete', evt => {
            this.queue_onComplete(evt);
        });

        this.adviceTickId = setInterval(this.adviceTick.bind(this), 200);
        this.adviceTick();
    }

    override destroy(): void {
        super.destroy();
        clearInterval(this.adviceTickId);
    }

    queue_onComplete(evt: any) {
        if (this.queueFailed) {
            return;
        }
        PreloadedAssets.initializeMisc(this.queue);
        PreloadedAssets.initializeOverworldSheets(this.queue);
        setTimeout(() => {
            this.destroy();
            new BrandPresents;
        }, 500);
    }

    queue_onError(evt: any) {
        clearInterval(this.adviceTickId);
        this.queueFailed = true;
        let advice = this.uiContainer!.querySelector('#preloadingAdvice');
        (advice as HTMLElement).innerText = `Failed loading assets. Please try again later.`;
    }

    adviceTick() {
        let advice = this.uiContainer!.querySelector('#preloadingAdvice') as HTMLElement;
        advice.innerText = `Preloading assets${'.'.repeat(this.dots)}`;
        advice.style.position = 'absolute';
        advice.style.left = `${BaseResolution.centerX(advice.offsetWidth)}px`;
        advice.style.top = `${BaseResolution.centerY(advice.offsetHeight)}px`;
        this.dots++;
        this.dots %= 4;
    }
}