import BaseResolution from 'app/BaseResolution';
import KeyboardSettings from 'app/KeyboardSettings';
import Preloader from 'app/scenes/preloader/Preloader';

class Main {
    container: HTMLElement | null = null;

    constructor() {
        this.initialize();
    }

    initialize() {
        this.container = document.getElementById('gameContainer');
        this.container!.style.width = `${BaseResolution.width}px`;
        this.container!.style.height = `${BaseResolution.height}px`;
        this.handleResize();

        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('orientationchange', this.handleResize.bind(this));

        document.getElementById('skipMessageBtn')?.addEventListener('click', evt => {
            window.dispatchEvent(new KeyboardEvent('keyup', {
                key: KeyboardSettings.cancelOrSkip[0],
            }));
        });
        document.getElementById('skipCutsceneBtn')?.addEventListener('click', evt => {
            window.dispatchEvent(new KeyboardEvent('keyup', {
                key: KeyboardSettings.openMenu[0],
            }));
        });
        window.addEventListener('keyup', e => {
            if (KeyboardSettings.okOrTalk.includes(e.key.toUpperCase())) {
                (document.activeElement as any).click();
            }
        });
        new Preloader;
    }

    private handleResize() {
        let scale = this.getFittingScale();
        let container = document.getElementById('gameContainer');
        container!.style.transform = `scale(${scale})`;
        container!.style.left = `${window.innerWidth / 2 - BaseResolution.width / 2}px`;
        container!.style.top = `${window.innerHeight / 2 - BaseResolution.height / 2}px`;
    }

    private getFittingScale(): number {
        let ratio = BaseResolution.width / BaseResolution.height;
        let windowRatio = window.innerWidth / window.innerHeight;
        // choose optimal scale ratio
        if (windowRatio > ratio) {
            return window.innerHeight / BaseResolution.height;
        } else return window.innerWidth / BaseResolution.width;
    }
}

new Main;