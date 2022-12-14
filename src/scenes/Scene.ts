import BaseResolution from 'app/BaseResolution';
import KeyboardSettings from 'app/KeyboardSettings';
import $ from 'jquery';

export default class Scene {
    backgroundContainer: HTMLElement | null = null;
    overworldContainer: HTMLElement | null = null;
    battleContainer: HTMLElement | null = null;
    messageDialogContainer: HTMLElement | null = null;
    uiContainer: HTMLElement | null = null;

    /**
     * Determines whether message dialog is open or not.
     */
    public messageDialogIsOpen: boolean = false;

    private messageDialogElement: HTMLElement | null = null;
    private messageDialogRemaining: string[] = [];
    private messageDialogTypingIntervalId: number = -1;

    private dialogue_skipListener: Function | null = null;
    private dialogue_timeoutId: number = -1;
    private dialogue_next: Function | null = null;
    private dialogue_fullSkip: Function | null = null;

    private tickIntervalId: number = -1;

    initialize() {
        this.backgroundContainer = document.getElementById('backgroundContainer')!;
        this.overworldContainer = document.getElementById('overworldContainer')!;
        this.battleContainer = document.getElementById('battleContainer')!;
        this.messageDialogContainer = document.getElementById('messageDialogContainer')!;
        this.uiContainer = document.getElementById('uiContainer')!;

        this.tickIntervalId = setInterval(() => {
            this.tick();
        }, 1_000 / BaseResolution.frameRate);
        this.tick();
    }

    tick() {
    }

    destroy() {
        this.backgroundContainer!.innerHTML = '';
        this.overworldContainer!.innerHTML = '';
        this.battleContainer!.innerHTML = '';
        this.messageDialogContainer!.innerHTML = '';
        this.uiContainer!.innerHTML = '';

        if (this.messageDialogTypingIntervalId != -1) {
            clearInterval(this.messageDialogTypingIntervalId);
            this.messageDialogTypingIntervalId = -1;
        }
        clearInterval(this.tickIntervalId);
        this.tickIntervalId = -1;
    }

    beginDialogue(options: DialogueOptions = { fullSkip: null }) {
        document.getElementById('skipMessageBtn')!.style.display = 'inline-block';
        document.getElementById('skipCutsceneBtn')!.style.display = 'inline-block';
        this.dialogue_fullSkip = options.fullSkip || null;

        window.addEventListener('keyup', this.dialogue_skipListener = (e: KeyboardEvent) => {
            // skip
            if (KeyboardSettings.cancelOrSkip.includes(e.key.toUpperCase()) && this.dialogue_next != null) {
                if (this.isTypingMessageDialog) {
                    this.skipToMessageDialogEnd();
                } else if (this.dialogue_timeoutId != -1) {
                    clearTimeout(this.dialogue_timeoutId);
                    this.dialogue_timeoutId = -1;
                    this.dialogue_next();
                }
            }
            // full-skip
            else if (KeyboardSettings.openMenu.includes(e.key.toUpperCase()) && this.dialogue_fullSkip != null) {
                this.destroyMessageDialog();
                if (this.dialogue_timeoutId != -1) {
                    clearTimeout(this.dialogue_timeoutId);
                    this.dialogue_timeoutId = -1;
                }
                let fullSkip = this.dialogue_fullSkip;
                fullSkip();
            }
        });
    }

    dialogueNextPart(fn: Function, nextPartMilli: number = 24 * 60 * 60 * 1000) {
        this.dialogue_timeoutId = setTimeout(this.dialogue_next = () => {
            if (this.dialogue_timeoutId != -1) {
                clearTimeout(this.dialogue_timeoutId);
            }
            this.dialogue_next = null;
            fn();
        }, nextPartMilli);
    }

    endDialogue() {
        window.removeEventListener('keyup', this.dialogue_skipListener as any);
        if (this.dialogue_timeoutId != -1) {
            clearTimeout(this.dialogue_timeoutId);
        }
        this.dialogue_timeoutId = -1;
        this.dialogue_next = null;
        this.dialogue_fullSkip = null;
        this.dialogue_skipListener = null;
        document.getElementById('skipMessageBtn')!.style.display = 'none';
        document.getElementById('skipCutsceneBtn')!.style.display = 'none';
    }

    showMessageDialog(text: string) {
        if (this.messageDialogIsOpen) {
            this.destroyMessageDialog();
        }
        this.messageDialogIsOpen = true;
        this.messageDialogElement = $(`
            <div class="MessageDialog" style="
                position: absolute; width: 470px; height: 50px;
            "></div>`).get(0)!;
        document.getElementById('messageDialogContainer')?.appendChild(this.messageDialogElement);
        this.messageDialogElement.style.left = `${BaseResolution.centerX(this.messageDialogElement.offsetWidth)}px`;
        this.messageDialogElement.style.top = `${BaseResolution.height - this.messageDialogElement.offsetHeight - 30}px`;
        let split = text.split('');
        this.messageDialogRemaining = split;
        this.messageDialogTypingIntervalId = setInterval(() => {
            if (split.length == 0) {
                clearInterval(this.messageDialogTypingIntervalId);
                this.messageDialogTypingIntervalId = -1;
                return;
            }
            let s = split.shift();
            this.messageDialogElement!.innerText += s == ' ' ? ' ' + split.shift() : s;
        }, 30);
    }

    get isTypingMessageDialog() {
        return this.messageDialogTypingIntervalId != -1;
    }

    skipToMessageDialogEnd() {
        if (!this.messageDialogIsOpen) {
            return;
        }
        this.messageDialogElement!.innerText += this.messageDialogRemaining.join('');
        clearInterval(this.messageDialogTypingIntervalId);
        this.messageDialogTypingIntervalId = -1;
    }

    destroyMessageDialog() {
        if (!this.messageDialogIsOpen) {
            return;
        }
        if (this.messageDialogTypingIntervalId != -1) {
            clearInterval(this.messageDialogTypingIntervalId);
            this.messageDialogTypingIntervalId = -1;
        }
        this.messageDialogElement?.remove();
        this.messageDialogIsOpen = false;
    }
}

export type DialogueOptions = {
    fullSkip: Function | null,
};