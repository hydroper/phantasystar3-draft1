import {Movable} from './Component';

export default class Entity {
    constructor() {
    }

    get movable(): Movable | null {
        return null;
    }
}

export class Character extends Entity {
    public m_movable = new Movable;

    constructor() {
    }

    override get movable(): Movable | null {
        return this.m_movable;
    }
}