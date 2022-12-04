import baseResolution from '../../baseResolution';
import keyboardSettings from '../../keyboardSettings';
import PreloadedAssets from '../../preloadedAssets';
import Scene from '../Scene';
import {cloneImage} from '../../util/image';
import $ from 'jquery';

export default class Cutscene1 extends Scene {
    cutscene1_begin() {
        this.beginDialogue();
        let outerSpaceImg = cloneImage(PreloadedAssets.cutscenes_outerspace1);
        outerSpaceImg.style.position = 'absolute';
        this.backgroundContainer!.appendChild(outerSpaceImg);
        outerSpaceImg.style.width = `${baseResolution.width}px`;
        outerSpaceImg.style.height = `${baseResolution.height}px`;
        outerSpaceImg.style.transition = `opacity 0.5s`;
        outerSpaceImg.style.opacity = '0';
    
        this.dialogueNextPart(() => {
            outerSpaceImg.style.opacity = '1';
            this.dialogueNextPart(() => {
                let text1Span = $('<span style="position: absolute; left: 100px; top: 100px; transition: 0.5s opacity; opacity: 0; width: 400px; word-break: normal"></span>').get(0);
                text1Span!.innerHTML = `The legends of the past shape our lives and those of our children.`;
                this.backgroundContainer!.appendChild(text1Span!);
                this.dialogueNextPart(() => {
                    text1Span!.style.opacity = '1';
                    let text2Span = $('<span style="position: absolute; left: 100px; top: 300px; transition: 0.5s opacity; opacity: 0; width: 300px; word-break: normal"></span>').get(0);
                    text2Span!.innerHTML = `One such legend is of a struggle that almost destroyed our world.`;
                    this.backgroundContainer!.appendChild(text2Span!);
                    this.dialogueNextPart(() => {
                        text2Span!.style.opacity = '1';
                        this.dialogueNextPart(() => {
                            text1Span!.style.opacity = '0';
                            text2Span!.style.opacity = '0';
                            this.dialogueNextPart(() => {
                                text1Span!.remove();
                                text2Span!.remove();
                                this.cutscene1_2_cont(outerSpaceImg);
                            }, 3000);
                        }, 6000);
                    }, 3000);
                }, 1000);
            }, 1000);
        }, 1000);
    }

    cutscene1_2_cont(outerSpaceImg: any) {
        let text1Span = $('<span style="position: absolute; left: 100px; top: 100px; transition: 0.5s opacity; opacity: 0; width: 500px; word-break: normal"></span>').get(0);
        text1Span!.innerHTML = `The names of Orakio and Laya echo down through the years, still inspiring love and hatred even now, 1,000 years after their tragic deaths.`;
        this.backgroundContainer!.appendChild(text1Span!);
        this.dialogueNextPart(() => {
            text1Span!.style.opacity = '1';
            this.dialogueNextPart(() => {
                let text2Span = $('<span style="position: absolute; left: 100px; top: 300px; transition: 0.5s opacity; opacity: 0; width: 500px; word-break: normal"></span>').get(0);
                text2Span!.innerHTML = `Their conflict wiped out civilization and left the survivors in a world of mutated creatures and warring pockets of men.`;
                this.backgroundContainer!.appendChild(text2Span!);
                this.dialogueNextPart(() => {
                    text2Span!.style.opacity = '1';
                    this.dialogueNextPart(() => {
                        text1Span!.style.opacity = '0';
                        text2Span!.style.opacity = '0';
                        this.dialogueNextPart(() => {
                            text1Span!.remove();
                            text2Span!.remove();
                            this.cutscene1_3_cont(outerSpaceImg);
                        }, 2000);
                    }, 9000);
                }, 1500);
            }, 1500);
        }, 500);
    }

    cutscene1_3_cont(outerSpaceImg: any) {
        let text1Span = $('<span style="position: absolute; left: 100px; top: 100px; transition: 0.5s opacity; opacity: 0; width: 500px; word-break: normal"></span>').get(0);
        text1Span!.innerHTML = `Into this shattered world you are thrust to live or die by your sword and your wits...`;
        this.backgroundContainer!.appendChild(text1Span!);
        this.dialogueNextPart(() => {
            text1Span!.style.opacity = '1';
            this.dialogueNextPart(() => {
                text1Span!.style.opacity = '0';
                this.dialogueNextPart(() => {
                    text1Span!.remove();
                    this.dialogueNextPart(() => {
                        outerSpaceImg.style.opacity = '0';
                        this.dialogueNextPart(() => {
                            this.cutscene1_4_cont();
                        }, 500);
                    }, 2000);
                }, 500);
            }, 8000);
        }, 1000);
    }

    cutscene1_4_cont() {
        this.backgroundContainer!.innerHTML = '';
        this.endDialogue();
        this.cutscene1_onComplete();
    }

    cutscene1_onComplete() {
        //
    }
}