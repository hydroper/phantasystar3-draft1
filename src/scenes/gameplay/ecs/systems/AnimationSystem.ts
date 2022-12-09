import type World from '../World';
import $ from 'jquery';

export default class AnimationSystem {
    constructor(private world: World) {
    }

    update() {
        for (let entity of this.world.entities) {
            entity.nextFrame();
        }
    }
}