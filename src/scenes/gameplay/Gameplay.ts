import baseResolution from '../../baseResolution';
import keyboardSettings from '../../keyboardSettings';
import PreloadedAssets from '../../preloadedAssets';
import Scene from '../Scene';
import {cloneImage} from '../../util/image';
import $ from 'jquery';
import Cutscene1 from './Cutscene1';
import MainMenu from '../mainMenu/MainMenu';

export default class Gameplay extends Cutscene1 {
    constructor(slotNum: number) {
        super();
        this.initialize(slotNum);
    }

    override initialize(slotNum: number = NaN): void {
        super.initialize();
        if (isNaN(slotNum)) {
            this.cutscene1_begin();
        }
    }

    override tick(): void {
        super.tick();
    }

    override destroy(): void {
        super.destroy();
    }

    override cutscene1_onComplete(): void {
        //
    }
}