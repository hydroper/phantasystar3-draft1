import MainScene from './MainScene.js';
import MainMenuScene from './MainMenuScene.js';
import ProjectSettings from '../ProjectSettings.js';
import PreloadedAssets from '../PreloadedAssets.js';
import {cloneImage} from '../util/ImageHelpers.js';

export default class GameplayScene extends MainScene {
    constructor(slotNum) {
        super();
        this.initialize(slotNum);
    }

    initialize(slotNum) {
        super.initialize();
        if (isNaN(slotNum)) {
            this.introduction1_show();
        }
    }

    introduction1_show() {
        document.body.parentElement.setAttribute('outer-space', 'true');
        document.body.setAttribute('outer-space', 'true');
    }

    destroy() {
        super.destroy();
    }
}