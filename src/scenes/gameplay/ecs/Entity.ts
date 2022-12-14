import {Movable} from 'app/scenes/gameplay/ecs/Component';
import Rectangle from 'app/util/Rectangle';
import type {CharacterKind, CharacterMovingState} from 'app/scenes/gameplay/ecs/CharacterEntity';

export default class Entity {
    htmlElement: HTMLElement | null = null;
    x: number = 0;
    y: number = 0;
    rectWidth: number = 0;
    rectHeight: number = 0;

    constructor() {
    }

    reflectPosition() {
        this.htmlElement!.style.left = this.x + 'px';
        this.htmlElement!.style.top = this.y + 'px';
    }

    get rect(): Rectangle {
        return new Rectangle(this.x - this.rectWidth / 2, this.y - this.rectHeight / 2, this.rectWidth, this.rectHeight);
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