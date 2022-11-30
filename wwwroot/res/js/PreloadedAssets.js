const PreloadedAssets = {
    /**
     * Image element.
     */
    logo: null,

    /**
     * Image element.
     */
    overworldGeneration1: null,
    /**
     * Image element.
     */
    overworldGeneration2: null,
    /**
     * Image element.
     */
    overworldGeneration3: null,

    initializeMisc(loadQueue) {
        PreloadedAssets.logo = loadQueue.getResult('logo');
    },

    initializeOverworldSheets(loadQueue) {
        let tags = [
            PreloadedAssets.overworldGeneration1 = loadQueue.getResult('overworldGeneration1'),
            PreloadedAssets.overworldGeneration2 = loadQueue.getResult('overworldGeneration2'),
            PreloadedAssets.overworldGeneration3 = loadQueue.getResult('overworldGeneration3'),
        ];
        for (let img of tags) {
            img.style['image-rendering'] = 'pixelated';
        }
    },
};

export default PreloadedAssets;