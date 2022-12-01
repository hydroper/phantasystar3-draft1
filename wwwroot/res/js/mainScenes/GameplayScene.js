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
        this.introduction1_skipListener = null;
        this.introduction1_timeoutFunction = null;
        this.introduction1_timeoutId = -1;
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

        window.addEventListener('keyup', this.introduction1_skipListener = e => {
            // skip part
            if (PlayerPersonalSettings.keyboardSettings.cancelOrSkip.indexOf(e.keyCode) != -1 && this.introduction1_timeoutFunction != null) {
                clearTimeout(this.introduction1_timeoutId);
                this.introduction1_timeoutFunction();
            }
        });

        this.introduction1_nextPart(() => {
            //
        });
    }

    introduction1_clearPart() {
        clearInterval(this.introduction1_timeoutId);
        this.introduction1_timeoutId = -1;
        this.introduction1_timeoutFunction = null;
    }

    introduction1_nextPart(fn, nextPartMilli = 1000) {
        this.introduction1_timeoutId = setTimeout(this.introduction1_timeoutFunction = fn, nextPartMilli);
    }

    introduction1_end() {
        this.container.innerHTML = '';
        window.removeEventListener('keyup', this.introduction1_skipListener);
        this.introduction1_skipListener = null;
    }

    destroy() {
        super.destroy();
    }
}