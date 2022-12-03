import MainScene from '../MainScene.js';
import MainMenuScene from '../mainMenu/MainMenuScene.js';
import ProjectSettings from '../../ProjectSettings.js';
import PreloadedAssets from '../../PreloadedAssets.js';
import PlayerPersonalSettings from '../../PlayerPersonalSettings.js';
import {cloneImage} from '../../util/ImageHelpers.js';
import {focusNextElement, focusPrevElement} from '../../focuslock/index.js';
import GameplayData from './GameplayData.js';
import ECS from '../../ecs/ecs.js';

import {cutscene1_show} from './cutscene1.js';

const world = ECS.createWorld();

function movementSystem(world) {
    const onUpdate = dt => {
        //
    };
    return {onUpdate};
}

ECS.addSystem(world, movementSystem);

export default class GameplayScene extends MainScene {
    constructor(slotNum) {
        super();
        this.initialize(slotNum);
    }

    initialize(slotNum) {
        super.initialize();
        GameplayData.gameplayScene = this;
        if (isNaN(slotNum)) {
            cutscene1_show(this);
        }
    }

    tick() {
        super.tick();
        ECS.update(world, 0);
        ECS.cleanup(world);
    }

    destroy() {
        super.destroy();
        for (let entity of ECS.getEntities(world, [])) {
            ECS.removeEntity(world, entity, false);
        }
        GameplayData.gameplayScene = null;
    }
}