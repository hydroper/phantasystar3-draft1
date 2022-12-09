import baseResolution from '../../baseResolution';
import keyboardSettings from '../../keyboardSettings';
import PreloadedAssets from '../../preloadedAssets';
import Scene from '../Scene';
import {cloneImage} from '../../util/image';
import $ from 'jquery';
import Cutscene1 from './Cutscene1';
import MainMenu from '../mainMenu/MainMenu';
import World from './ecs/World';

export default class Gameplay extends Cutscene1 {
    private world = new World;
    private animationIntervalId = -1;

    constructor(slotNum: number) {
        super();
        this.initialize(slotNum);
    }

    override initialize(slotNum: number = NaN): void {
        super.initialize();
        this.animationIntervalId = setInterval(() => {
            this.world.animationUpdate();
        }, 100);
        if (isNaN(slotNum)) {
            this.cutscene1_begin();
        }
    }

    override tick(): void {
        super.tick();
        this.world.update();
    }

    override destroy(): void {
        super.destroy();
        clearInterval(this.animationIntervalId);
        this.animationIntervalId = -1;
    }

    override cutscene1_onComplete(): void {
        //
    }
}