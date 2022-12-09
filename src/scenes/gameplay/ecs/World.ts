import Entity from './Entity';
import MovementAndZOrderingSystem from './systems/MovementAndZOrderingSystem';
import AnimationSystem from './systems/AnimationSystem';

export default class World {
    readonly entities: Entity[] = [];

    // systems
    movementAndZOrderingSystem: MovementAndZOrderingSystem | null = null;
    animationSystem: AnimationSystem | null = null;

    constructor() {
        // initialize systems
        this.movementAndZOrderingSystem = new MovementAndZOrderingSystem(this);
        this.animationSystem = new AnimationSystem(this);
    }

    update() {
        // run systems
        this.movementAndZOrderingSystem!.update();
    }

    animationUpdate() {
        this.animationSystem!.update();
    }
}