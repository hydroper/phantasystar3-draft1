import {Movable} from './Component';
import Rectangle from '../../../util/rectangle';
import type {CharacterKind, CharacterMovingState} from './CharacterEntity';

export default class Entity {
    htmlElement: HTMLElement | null = null;
    x: number = 0;
    y: number = 0;
    rectWidth: number = 0;
    rectHeight: number = 0;

    constructor() {
    }

    get rect(): Rectangle {
        return new Rectangle(this.x, this.y, this.rectWidth, this.rectHeight);
    }

    get isMoving(): boolean {
        return false;
    }

    get movable(): Movable | null {
        return null;
    }

    set movable(v) {
    }

    get characterKind(): CharacterKind | null {
        return null;
    }

    set characterKind(v) {
    }

    get characterMovingState(): CharacterMovingState | null {
        return null;
    }

    set characterMovingState(v) {
    }

    nextFrame() {
    }
}