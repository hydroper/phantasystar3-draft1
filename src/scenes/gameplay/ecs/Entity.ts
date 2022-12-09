import {Movable} from './Component';
import Rectangle from '../../../util/rectangle';

export default class Entity {
    htmlElement: HTMLElement | null = null;
    x: number = 0;
    y: number = 0;
    rectWidth: number = 0;
    rectHeight: number = 0;

    constructor() {
    }

    get rectangle(): Rectangle {
        return new Rectangle(this.x, this.y, this.rectWidth, this.rectHeight);
    }

    get movable(): Movable | null {
        return null;
    }

    set movable(v) {
    }
}

export class Character extends Entity {
    private m_movable: Movable | null = new Movable(0, 0);

    constructor() {
        super();
    }

    override get movable(): Movable | null {
        return this.m_movable;
    }

    override set movable(v) {
        this.m_movable = v;
    }
}