import $ from 'jquery';

export function createVideoFromBinary(src: string, mimeType: string = 'video/mp4'): HTMLVideoElement {
    let $video = $(`<video/>`);
    let $source = $(`<source type="${mimeType}"/>`);
    let blob = new Blob([src], {type: mimeType});
    let urlCreator = window.URL || window.webkitURL;
    let objUrl = urlCreator.createObjectURL(blob);
    $source.attr('src', objUrl);
    $video.append($source);
    return $video.get(0) as HTMLVideoElement;
}