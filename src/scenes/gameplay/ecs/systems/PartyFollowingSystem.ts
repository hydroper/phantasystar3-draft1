import type World from '../World';
import $ from 'jquery';
import CharacterEntity, {CharacterMovingState} from '../CharacterEntity';

export default class PartyFollowingSystem {
    constructor(private world: World) {
    }

    update() {
        let follows = this.world.partyOrderedList[0];
        for (let follower of this.world.partyOrderedList.slice(1)) {
            let followsRect = follows.rect;
            let followerRect = follower.rect;
            if (follows.isMoving && !follows.rect.hitTest(follower.rect)) {
                // puts party character to walk to another one.
                // if character is far away, teleport it to which one precedes it
                // in the party order.
                notYetImplementedPleaseImplement();
                //
            } else {
                this.standFromTo(follower, follows);
                follower.characterMovingState = follows.characterMovingState;
                follower.movable!.dx = 0;
                follower.movable!.dy = 0;
            }
            follows = follower;
        }
    }

    standFromTo(one: CharacterEntity, other: CharacterEntity, walking: boolean = false) {
        if (one.x < other.x) {
            one.characterMovingState = walking ? CharacterMovingState.WALKING_RIGHT : CharacterMovingState.STANDING_RIGHT;
        } else if (one.y > other.y) {
            one.characterMovingState = walking ? CharacterMovingState.WALKING_UP : CharacterMovingState.STANDING_UP;
        } else if (one.x > other.x) {
            one.characterMovingState = walking ? CharacterMovingState.WALKING_LEFT : CharacterMovingState.STANDING_LEFT;
        } else {
            one.characterMovingState = walking ? CharacterMovingState.WALKING_DOWN : CharacterMovingState.STANDING_DOWN;
        }
    }
}