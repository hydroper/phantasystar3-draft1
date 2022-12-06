import baseResolution from '../../baseResolution';
import keyboardSettings from '../../keyboardSettings';
import PreloadedAssets from '../../preloadedAssets';
import Scene from '../Scene';
import {cloneImage} from '../../util/image';
import $ from 'jquery';

export default class Cutscene1 extends Scene {
    cutscene1_begin() {
        this.beginDialogue({
            fullSkip: () => {
                this.endDialogue();
                this.destroyMessageDialog();
                this.backgroundContainer!.innerHTML = '';
                this.cutscene1_onComplete();
            },
        });

        let orakioVersusLayaImg = cloneImage(PreloadedAssets.cutscenes_orakioVersusLaya);
        this.backgroundContainer!.appendChild(orakioVersusLayaImg);
        orakioVersusLayaImg.style.opacity = '0';
        orakioVersusLayaImg.style.transition = 'opacity 0.5s';
        orakioVersusLayaImg.style.transform = 'scale(0.7)';
        orakioVersusLayaImg.style.position = 'absolute';
        orakioVersusLayaImg.style.left = `${baseResolution.centerX(orakioVersusLayaImg.offsetWidth)}px`;
        orakioVersusLayaImg.style.top = `${30}px`;

        this.dialogueNextPart(() => {
            orakioVersusLayaImg.style.opacity = '1';
            this.dialogueNextPart(() => {
                this.showMessageDialog('The legends of Landen, your homeland, tell of world-sweeping wars fought 1,000 years ago.');
                this.dialogueNextPart(() => {
                    this.showMessageDialog('Brave Orakio sought to foil the evil schemes of the dark witch Laya and her hordes of monsters.');
                    this.dialogueNextPart(() => {
                        this.cutscene1_2_cont(orakioVersusLayaImg);
                    }, 8000);
                }, 8000);
            }, 500);
        }, 500);
    }

    cutscene1_2_cont(orakioVersusLayaImg: any) {
        orakioVersusLayaImg.style.opacity = '0';
        this.showMessageDialog('In the final battle, all combatants were killed, though Orakio and Laya\'s bodies were never found.');
        this.dialogueNextPart(() => {
            orakioVersusLayaImg.remove();
            let womanOnBeachVideo = PreloadedAssets.cutscenes_womanOnBeach!.cloneNode(true) as HTMLElement;
            womanOnBeachVideo.setAttribute('autoplay', 'true');
            womanOnBeachVideo.setAttribute('loop', 'true');
            this.backgroundContainer!.appendChild(womanOnBeachVideo);
            womanOnBeachVideo.style.transition = 'opacity 0.5s';
            womanOnBeachVideo.style.transform = 'scale(0.7)';
            womanOnBeachVideo.style.opacity = '0';
            womanOnBeachVideo.style.position = 'absolute';
            womanOnBeachVideo.style.left = `${baseResolution.centerX(womanOnBeachVideo.offsetWidth)}px`;
            womanOnBeachVideo.style.top = `${30}px`;
            womanOnBeachVideo.click();
            this.showMessageDialog('The passageways between the Layan worlds and the Orakian worlds were sealed.');
    
            this.dialogueNextPart(() => {
                womanOnBeachVideo.style.opacity = '1';
                this.showMessageDialog('In time, people forgot there were other worlds besides Landen.');
                this.dialogueNextPart(() => {
                    this.showMessageDialog('Two months ago, a young woman washed up on the shores of Landen.');
                    this.dialogueNextPart(() => {
                        this.showMessageDialog('The woman remembered nothing of her life prior to waking up on the beach.');
                        this.dialogueNextPart(() => {
                            this.showMessageDialog('This seemingly minor event sets an epic adventure in motion...');
                            this.dialogueNextPart(() => {
                                this.destroyMessageDialog();
                                womanOnBeachVideo.style.opacity = '0';
                                this.dialogueNextPart(() => {
                                    this.cutscene1_3_cont();
                                }, 500);
                            }, 8000);
                        }, 8000);
                    }, 8000);
                }, 8000);
            }, 8000);
        }, 8000);
    }

    cutscene1_3_cont() {
        this.backgroundContainer!.innerHTML = '';
        this.endDialogue();
        this.cutscene1_onComplete();
    }

    cutscene1_onComplete() {
        //
    }
}