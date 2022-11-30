import ProjectSettings from '../ProjectSettings.js';

export default class MainScene {
    constructor() {
        this.container = document.createElement('div');
    }

    initialize() {
        document.getElementById('gameContainer').appendChild(this.container);
        this.m_tickIntervalId = 0;
        this.m_tickIntervalId = setInterval(() => {
            this.tick();
        }, 1_000 / ProjectSettings.frameRate);
        this.tick();
    }

    destroy() {
        clearInterval(this.m_tickIntervalId);
        document.getElementById('gameContainer').removeChild(this.container);
    }

    tick() {
    }
}