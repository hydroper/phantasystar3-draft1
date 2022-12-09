export default class Rectangle {
    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly width: number,
        public readonly height: number
    )
    {
    }

    hitTest(another: Rectangle): boolean {
        return this.horizontalHitTest(another)
            || this.verticalHitTest(another);
    }

    horizontalHitTest(another: Rectangle): boolean {
        return this.x < another.x + another.width
            && this.x + this.width > another.x;
    }

    verticalHitTest(another: Rectangle): boolean {
        return this.y < another.y + another.height
            && this.y + this.height > another.y;
    }
}