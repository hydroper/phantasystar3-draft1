import {createVideoFromBinary} from './util/video';

export default class PreloadedAssets {
    /**
     * Image element.
     */
    static logo: HTMLImageElement | null = null;
    /**
     * SVG object element.
     */
    static segaLogo: HTMLObjectElement | null = null;
    /**
     * Image element.
     */
    static overworldGeneration1: HTMLImageElement | null = null;
    /**
     * Image element.
     */
    static overworldGeneration2: HTMLImageElement | null = null;
    /**
     * Image element.
     */
    static overworldGeneration3: HTMLImageElement | null = null;

    /**
     * Image element.
     */
    static cutscenes_orakioVersusLaya: HTMLImageElement | null = null;
    /**
     * Video element.
     */
    static cutscenes_womanOnBeach: HTMLVideoElement | null = null;
    /**
     * Image element.
     */
    static cutscenes_outerspace1: HTMLImageElement | null = null;

    static initializeMisc(loadQueue: createjs.LoadQueue) {
        // logo
        PreloadedAssets.logo = loadQueue.getResult('logo') as HTMLImageElement;
        PreloadedAssets.logo!.draggable = false;

        // segaLogo
        PreloadedAssets.segaLogo = loadQueue.getResult('segaLogo') as HTMLObjectElement;

        // cutscenes_orakioVersusLaya
        PreloadedAssets.cutscenes_orakioVersusLaya = loadQueue.getResult('cutscenes_orakioVersusLaya') as HTMLImageElement;

        // cutscenes_womanOnBeach
        PreloadedAssets.cutscenes_womanOnBeach = createVideoFromBinary(loadQueue.getResult('cutscenes_womanOnBeach') as any);
        PreloadedAssets.cutscenes_womanOnBeach.width = 608;
        PreloadedAssets.cutscenes_womanOnBeach.height = 380;

        // cutscenes_outerspace1
        PreloadedAssets.cutscenes_outerspace1 = loadQueue.getResult('cutscenes_outerspace1') as HTMLImageElement;
    }

    static initializeOverworldSheets(loadQueue: createjs.LoadQueue) {
        let tags = [
            PreloadedAssets.overworldGeneration1 = loadQueue.getResult('overworldGeneration1') as HTMLImageElement,
            PreloadedAssets.overworldGeneration2 = loadQueue.getResult('overworldGeneration2') as HTMLImageElement,
            PreloadedAssets.overworldGeneration3 = loadQueue.getResult('overworldGeneration3') as HTMLImageElement,
        ];
        for (let img of tags) {
            (img.style as any)['image-rendering'] = 'pixelated';
        }
    }
};