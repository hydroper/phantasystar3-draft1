import {createVideoFromBinary} from './util/VideoHelpers.js';

const PreloadedAssets = {
    /**
     * Image element.
     */
    logo: null,
    /**
     * SVG object element.
     */
    segaLogo: null,
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

    /**
     * Image element.
     */
    story1_orakioVersusLaya: null,
    /**
     * Video element.
     */
    story1_womanOnBeach: null,

    initializeMisc(loadQueue) {
        // logo
        PreloadedAssets.logo = loadQueue.getResult('logo');
        PreloadedAssets.logo.draggable = false;

        // segaLogo
        PreloadedAssets.segaLogo = loadQueue.getResult('segaLogo');

        // story1_orakioVersusLaya
        PreloadedAssets.story1_orakioVersusLaya = loadQueue.getResult('story1.orakioVersusLaya');

        // story1_womanOnBeach
        PreloadedAssets.story1_womanOnBeach = createVideoFromBinary(loadQueue.getResult('story1.womanOnBeach'));
        PreloadedAssets.story1_womanOnBeach.width = 608;
        PreloadedAssets.story1_womanOnBeach.height = 380;
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