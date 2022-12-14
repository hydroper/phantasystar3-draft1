import BaseResolution from 'app/BaseResolution';
import KeyboardSettings from 'app/KeyboardSettings';
import PreloadedAssets from 'app/PreloadedAssets';
import Scene from 'app/scenes/Scene';
import MainMenu from 'app/scenes/mainMenu/MainMenu';
import Gameplay from 'app/scenes/gameplay/Gameplay';
import {cloneImage} from 'app/util/Image';
import $ from 'jquery';

export default class BrandPresents extends Scene {
    container: any = null;

    constructor() {
        super();
        this.initialize();
    }

    initialize() {
        super.initialize();
        let segaLogo = PreloadedAssets.segaLogo!.cloneNode(true) as HTMLObjectElement;
        this.container = $('<div style="transition: opacity 0.5s; opacity: 0"></div>').get(0) as HTMLElement;
        this.container.innerHTML = '<span style="position: absolute">THIS FAN GAME INCLUDES PROPERTIES OWNED BY</span>';
        this.backgroundContainer?.appendChild(this.container);
        this.container.children[0].style.left = `${BaseResolution.centerX(this.container.children[0].offsetWidth)}px`;
        this.container.children[0].style.top = `${BaseResolution.centerY(this.container.children[0].offsetHeight) - 100}px`;
        this.container.appendChild(segaLogo);
        segaLogo.style.position = 'absolute';
        segaLogo.style.left = `${BaseResolution.centerX(segaLogo.offsetWidth)}px`;
        segaLogo.style.top = `${BaseResolution.centerY(segaLogo.offsetHeight)}px`;
        segaLogo.style.transform = 'scale(1)';
        setTimeout(() => {
            this.container.style.opacity = '1';
            setTimeout(() => {
                this.container.style.opacity = '0';
                setTimeout(() => {
                    this.destroy();
                    new MainMenu(Gameplay);
                }, 500);
            }, 2000);
        }, 500);
    }

    destroy() {
        super.destroy();
    }
}