import Entity from 'app/scenes/gameplay/ecs/Entity';
import MovementAndZOrderingSystem from 'app/scenes/gameplay/ecs/systems/MovementAndZOrderingSystem';
import AnimationSystem from 'app/scenes/gameplay/ecs/systems/AnimationSystem';
import PartyFollowingSystem from 'app/scenes/gameplay/ecs/systems/PartyFollowingSystem';
import CharacterEntity from 'app/scenes/gameplay/ecs/CharacterEntity';

export default class World {
    readonly entities: Entity[] = [];
    partyOrderedList: CharacterEntity[] = [];

    // systems
    movementAndZOrderingSystem: MovementAndZOrderingSystem | null = null;
    animationSystem: AnimationSystem | null = null;
    partyFollowingSystem: PartyFollowingSystem | null = null;

    constructor() {
        // initialize systems
        this.movementAndZOrderingSystem = new MovementAndZOrderingSystem(this);
        this.animationSystem = new AnimationSystem(this);
        this.partyFollowingSystem = new PartyFollowingSystem(this);
    }

    update() {
        // run systems
        this.partyFollowingSystem!.update();
        this.movementAndZOrderingSystem!.update();
    }

    animationUpdate() {
        this.animationSystem!.update();
    }
}