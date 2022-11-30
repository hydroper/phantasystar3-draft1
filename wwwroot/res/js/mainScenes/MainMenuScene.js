import MainScene from './MainScene.js';
import ProjectSettings from '../ProjectSettings.js';
import PreloadedAssets from '../PreloadedAssets.js';
import {cloneImage} from '../util/ImageHelpers.js';

export default class MainMenuScene extends MainScene {
    constructor() {
        super();
        this.initialize();
        this.m_mainTextArea = null;
    }

    initialize() {
        super.initialize();
        let logo = cloneImage(PreloadedAssets.logo);
        logo.style.transition = 'opacity 0.5s';
        logo.style.opacity = '0';
        logo.style.position = 'absolute';
        this.container.appendChild(logo);
        logo.style.left = `${ProjectSettings.centerX(logo.offsetWidth)}px`;
        logo.style.top = `100px`;
        setTimeout(() => {
            logo.style.opacity = '1';
            this.mainTextArea_show();
        }, 500);
    }

    mainTextArea_show() {
        if (this.m_mainTextArea != null) {
            return;
        }
        this.m_mainTextArea = document.createElement('div');
        this.m_mainTextArea.classList.add('textarea');
        this.m_mainTextArea.style.display = 'flex';
        this.m_mainTextArea.style['flex-direction'] = 'column';
        this.m_mainTextArea.style['gap'] = '5px';
        this.m_mainTextArea.style.position = 'absolute';
        this.m_mainTextArea.style.left = `${ProjectSettings.centerX(500)}px`;
        this.m_mainTextArea.style.top = `${ProjectSettings.centerY(500) + 200}px`;
        this.m_mainTextArea.style.width = `500px`;
        this.m_mainTextArea.innerHTML = `
            <button class="btn" style="text-align: left">Start Game</button>
            <button class="btn" style="text-align: left">Continue</button>
            <button class="btn" style="text-align: left">Settings</button>
            <button class="btn" style="text-align: left">Exit Game</button>
        `;
        this.container.appendChild(this.m_mainTextArea);
    }

    destroy() {
        super.destroy();
    }
}