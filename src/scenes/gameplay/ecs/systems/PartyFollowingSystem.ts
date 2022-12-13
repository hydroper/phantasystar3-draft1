import type World from '../World';
import $ from 'jquery';
import CharacterEntity, {CharacterMovingState} from '../CharacterEntity';
import CharacterWalkSpeed from '../CharacterWalkSpeed';

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
                if (followsRect.farFrom(followerRect, 450)) {
                    follower.x = follows.x;
                    follower.y = follows.y;
                    follower.reflectPosition();
                    this.standFromTo(follower, follows);
                } else {
                    this.walkFromTo(follower, follows);
                }
            } else {
                this.standFromTo(follower, follows);
                follower.characterMovingState = follows.characterMovingState;
                follower.movable!.dx = 0;
                follower.movable!.dy = 0;
            }
            follows = follower;
        }
    }

    private standFromTo(one: CharacterEntity, other: CharacterEntity) {
        if (one.y > other.y) {
            one.characterMovingState = CharacterMovingState.STANDING_UP;
        } else if (one.y < other.y) {
            one.characterMovingState = CharacterMovingState.STANDING_DOWN;
        } else if (one.x < other.x) {
            one.characterMovingState = CharacterMovingState.STANDING_RIGHT;
        } else if (one.x > other.x) {
            one.characterMovingState = CharacterMovingState.STANDING_LEFT;
        } else {
            one.characterMovingState = CharacterMovingState.STANDING_DOWN;
        }
    }

    private walkFromTo(one: CharacterEntity, other: CharacterEntity) {
        if (one.x < other.x) {
            one.characterMovingState = CharacterMovingState.WALKING_RIGHT;
            one.movable!.dx = CharacterWalkSpeed.X;
        }
        if (one.x > other.x) {
            one.characterMovingState = CharacterMovingState.WALKING_LEFT;
            one.movable!.dx = -CharacterWalkSpeed.X;
        }
        if (one.y > other.y) {
            one.characterMovingState = CharacterMovingState.WALKING_UP;
            one.movable!.dy = -CharacterWalkSpeed.Y;
        }
        if (one.y < other.y) {
            one.characterMovingState = CharacterMovingState.WALKING_DOWN;
            one.movable!.dy = CharacterWalkSpeed.Y;
        }
    }
}