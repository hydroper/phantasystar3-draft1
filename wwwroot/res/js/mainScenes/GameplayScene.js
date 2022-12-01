import MainScene from './MainScene.js';
import MainMenuScene from './MainMenuScene.js';
import ProjectSettings from '../ProjectSettings.js';
import PreloadedAssets from '../PreloadedAssets.js';
import PlayerPersonalSettings from '../PlayerPersonalSettings.js';
import {cloneImage} from '../util/ImageHelpers.js';
import {focusNextElement, focusPrevElement} from '../focuslock/index.js';

export default class GameplayScene extends MainScene {
    constructor(slotNum) {
        super();
        this.initialize(slotNum);
    }

    initialize(slotNum) {
        super.initialize();
        if (isNaN(slotNum)) {
            this.cutscene1_show();
        }
    }

    cutscene1_show() {
        document.body.parentElement.setAttribute('outer-space', 'true');
        document.body.setAttribute('outer-space', 'true');

        window.addEventListener('keyup', this.cutscene_skipListener = e => {
            // skip part
            if (PlayerPersonalSettings.keyboardSettings.cancelOrSkip.indexOf(e.keyCode) != -1 && this.cutscene_timeoutFunction != null) {
                clearTimeout(this.cutscene_timeoutId);
                this.cutscene_timeoutFunction();
            }
        });

        /*
        this.cutscene_nextPart(() => {
            this.cutscene_clearPart();
            //
        }, 7000);
        */

        this.cutscene_nextPart(() => {
            this.cutscene_clearPart();
            //
        }, 7000);
    }

    cutscene1_end() {
        this.container.innerHTML = '';
        window.removeEventListener('keyup', this.introduction1_skipListener);
        this.introduction1_skipListener = null;
    }

    destroy() {
        super.destroy();
    }
}