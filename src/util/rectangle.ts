export default class Rectangle {
    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly width: number,
        public readonly height: number
    )
    {
    }

    hitTest(other: Rectangle): boolean {
        return this.horizontalHitTest(other)
            || this.verticalHitTest(other);
    }

    horizontalHitTest(other: Rectangle): boolean {
        return this.x < other.x + other.width
            && this.x + this.width > other.x;
    }

    verticalHitTest(other: Rectangle): boolean {
        return this.y < other.y + other.height
            && this.y + this.height > other.y;
    }

    farFrom(other: Rectangle, farInPixels: number): boolean {
        return other.x - this.x >= farInPixels || other.y - this.y >= farInPixels;
    }
}