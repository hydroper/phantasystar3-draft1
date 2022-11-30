import MainScene from './MainScene.js';
import ProjectSettings from '../ProjectSettings.js';

export default class Preloader extends MainScene {
    constructor() {
        super();
        this.dots = 0;
        this.m_adviceTickId = 0;
        // this.m_adviceTextArea = null;
    }

    initialize() {
        super.initialize();
        this.container.innerHTML = `<div class="textarea" style="width: 300px" id="preloadingAdvice"></div>`;
        this.m_adviceTickId = setInterval(this.adviceTick.bind(this), 200);
        // this.m_adviceTextArea = document.getElementById('preloadingAdvice');
        this.adviceTick();
    }

    destroy() {
        super.destroy();
        clearInterval(this.m_adviceTickId);
    }

    adviceTick() {
        let advice = this.container.querySelector('#preloadingAdvice');
        advice.innerText = `Preloading assets${'.'.repeat(this.dots)}`;
        advice.style.position = 'absolute';
        advice.style.left = `${ProjectSettings.centerX(advice.offsetWidth)}px`;
        advice.style.top = `${ProjectSettings.centerY(advice.offsetHeight)}px`;
        this.dots++;
        this.dots %= 4;
    }
}