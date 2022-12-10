import Entity from './Entity';
import {Movable} from './Component';
import Rectangle from '../../../util/rectangle';
import AnimationFrame from './AnimationFrame';
import PreloadedAssets from '../../../preloadedAssets';
import {cloneImage} from '../../../util/image';

export default class CharacterEntity extends Entity {
    private m_movable: Movable = new Movable(0, 0);
    private m_kind = CharacterKind.RHYS;
    private m_movingState = CharacterMovingState.STANDING_DOWN;
    private m_animationFrames: AnimationFrame[] | null = null;
    private m_currentFrame: number = 0;

    constructor() {
        super();
        this.rectWidth = 26 * 3;
        this.rectHeight = 31 * 3;
    }

    override get isMoving(): boolean {
        return this.m_movable!.dx != 0 || this.m_movable!.dy != 0;
    }

    override get movable(): Movable | null {
        return this.m_movable;
    }

    override set movable(v) {
        this.m_movable = v!;
    }

    override get characterKind(): CharacterKind | null {
        return this.m_kind;
    }

    override set characterKind(v: CharacterKind | null) {
        this.m_kind = v!;
        this.characterMovingState = CharacterMovingState.STANDING_DOWN;
    }

    override get characterMovingState(): CharacterMovingState | null {
        return this.m_movingState;
    }

    override set characterMovingState(v: CharacterMovingState | null) {
        v = v || CharacterMovingState.STANDING_DOWN;
        this.m_movingState = v;
        this.m_animationFrames = this.m_kind.animationFramesForMovingState(v);
        this.m_currentFrame = 0;

        this.renderFrame();
    }

    override nextFrame(): void {
        this.m_currentFrame += 1;
        this.m_currentFrame %= this.m_animationFrames!.length;
        this.renderFrame();
    }

    private renderFrame() {
        if (this.htmlElement == null) {
            this.htmlElement = $('<div class="overworld-character"></div>').get(0)!;
            this.htmlElement.appendChild(this.m_kind.animationImage());
        }
        let frame = this.m_animationFrames![this.m_currentFrame];
        let el = this.htmlElement;
        let img = this.htmlElement.firstElementChild;
        el.style.width = frame.rect.width + 'px';
        el.style.height = frame.rect.height + 'px';
        (el as any).style['margin-left'] = -frame.pivotX * 3 + 'px';
        (el as any).style['margin-top'] = -frame.pivotY * 3 + 'px';
        (img as any).style.transform = 'scale(3)';
        (img as any).style.right = frame.rect.x * 3 + 'px';
        (img as any).style.bottom = frame.rect.y * 3 + 'px';
    }
}

export class CharacterKind {
    static readonly RHYS = new CharacterKind;

    animationImage() {
        switch (this) {
            case CharacterKind.RHYS: return cloneImage(PreloadedAssets.overworldGeneration1);
        }
        throw new Error('unimplemented');
    }

    animationFramesForMovingState(state: CharacterMovingState): AnimationFrame[] {
        switch (this) {
            case CharacterKind.RHYS: {
                switch (state) {
                    case CharacterMovingState.STANDING_UP: return CharacterAnimationData.RHYS.frameCategories.standingUp;
                    case CharacterMovingState.STANDING_LEFT: return CharacterAnimationData.RHYS.frameCategories.standingLeft;
                    case CharacterMovingState.STANDING_DOWN: return CharacterAnimationData.RHYS.frameCategories.standingDown;
                    case CharacterMovingState.STANDING_RIGHT: return CharacterAnimationData.RHYS.frameCategories.standingRight;
                    case CharacterMovingState.WALKING_UP: return CharacterAnimationData.RHYS.frameCategories.walkingUp;
                    case CharacterMovingState.WALKING_LEFT: return CharacterAnimationData.RHYS.frameCategories.walkingLeft;
                    case CharacterMovingState.WALKING_DOWN: return CharacterAnimationData.RHYS.frameCategories.walkingDown;
                    case CharacterMovingState.WALKING_RIGHT: return CharacterAnimationData.RHYS.frameCategories.walkingRight;
                }
                break;
            }
        }
        throw new Error('unimplemented');
    }
}

export class CharacterMovingState {
    static readonly STANDING_UP = new CharacterMovingState;
    static readonly WALKING_UP = new CharacterMovingState;
    static readonly STANDING_LEFT = new CharacterMovingState;
    static readonly WALKING_LEFT = new CharacterMovingState;
    static readonly STANDING_DOWN = new CharacterMovingState;
    static readonly WALKING_DOWN = new CharacterMovingState;
    static readonly STANDING_RIGHT = new CharacterMovingState;
    static readonly WALKING_RIGHT = new CharacterMovingState;
}

export class CharacterAnimationData {
    static readonly RHYS = new CharacterAnimationData({
        standingUp: [
            new AnimationFrame(0, 0, new Rectangle(0, 0, 0, 0)),
        ],
        standingLeft: [
            new AnimationFrame(0, 0, new Rectangle(0, 0, 0, 0)),
        ],
        standingDown: [
            new AnimationFrame(9, 15, new Rectangle(72, 0, 16, 30)),
        ],
        standingRight: [
            new AnimationFrame(0, 0, new Rectangle(0, 0, 0, 0)),
        ],
        walkingUp: [
            new AnimationFrame(0, 0, new Rectangle(0, 0, 0, 0)),
            new AnimationFrame(0, 0, new Rectangle(0, 0, 0, 0)),
            new AnimationFrame(0, 0, new Rectangle(0, 0, 0, 0)),
        ],
        walkingLeft: [
            new AnimationFrame(0, 0, new Rectangle(0, 0, 0, 0)),
            new AnimationFrame(0, 0, new Rectangle(0, 0, 0, 0)),
            new AnimationFrame(0, 0, new Rectangle(0, 0, 0, 0)),
        ],
        walkingDown: [
            new AnimationFrame(0, 0, new Rectangle(0, 0, 0, 0)),
            new AnimationFrame(0, 0, new Rectangle(0, 0, 0, 0)),
            new AnimationFrame(0, 0, new Rectangle(0, 0, 0, 0)),
        ],
        walkingRight: [
            new AnimationFrame(0, 0, new Rectangle(0, 0, 0, 0)),
            new AnimationFrame(0, 0, new Rectangle(0, 0, 0, 0)),
            new AnimationFrame(0, 0, new Rectangle(0, 0, 0, 0)),
        ],
    });

    constructor(public frameCategories: FrameCategories) {
    }
}

export type FrameCategories = {
    standingUp: AnimationFrame[],
    standingLeft: AnimationFrame[],
    standingDown: AnimationFrame[],
    standingRight: AnimationFrame[],
    walkingUp: AnimationFrame[],
    walkingLeft: AnimationFrame[],
    walkingDown: AnimationFrame[],
    walkingRight: AnimationFrame[],
};