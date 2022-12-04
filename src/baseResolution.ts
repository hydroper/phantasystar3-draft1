const baseResolution = {
    width: 800,
    height: 500,
    frameRate: 60,

    centerX(forItemWidth: number = 0): number {
        return baseResolution.width / 2 - forItemWidth / 2;
    },

    centerY(forItemHeight: number = 0): number {
        return baseResolution.height / 2 - forItemHeight / 2;
    },
};

export default baseResolution;