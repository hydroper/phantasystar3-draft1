import baseResolution from './baseResolution';
import keyboardSettings from './keyboardSettings';
import Preloader from './scenes/Preloader';

class Main {
    container: HTMLElement | null = null;

    constructor() {
        this.initialize();
    }

    initialize() {
        this.container = document.getElementById('gameContainer');
        this.container!.style.width = `${baseResolution.width}px`;
        this.container!.style.height = `${baseResolution.height}px`;
        this.handleResize();

        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('orientationchange', this.handleResize.bind(this));

        document.getElementById('skipMessageBtn')?.addEventListener('click', evt => {
            window.dispatchEvent(new KeyboardEvent('keyup', {
                key: keyboardSettings.cancelOrSkip[0],
            }));
        });
        document.getElementById('skipCutsceneBtn')?.addEventListener('click', evt => {
            window.dispatchEvent(new KeyboardEvent('keyup', {
                key: keyboardSettings.openMenu[0],
            }));
        });
        window.addEventListener('keyup', e => {
            if (keyboardSettings.okOrTalk.includes(e.key.toUpperCase())) {
                (document.activeElement as any).click();
            }
        });
        new Preloader;
    }

    private handleResize() {
        let scale = this.getFittingScale();
        let container = document.getElementById('gameContainer');
        container!.style.transform = `scale(${scale})`;
        container!.style.left = `${window.innerWidth / 2 - baseResolution.width / 2}px`;
        container!.style.top = `${window.innerHeight / 2 - baseResolution.height / 2}px`;
    }

    private getFittingScale(): number {
        let ratio = baseResolution.width / baseResolution.height;
        let windowRatio = window.innerWidth / window.innerHeight;
        if (windowRatio > ratio) {
            return window.innerHeight / baseResolution.height;
        } else return window.innerWidth / baseResolution.width;
    }
}

new Main;