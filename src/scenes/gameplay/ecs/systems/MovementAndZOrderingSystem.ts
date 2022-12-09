import type World from '../World';
import $ from 'jquery';

export default class MovementAndZOrderingSystem {
    constructor(private world: World) {
    }

    update() {
        for (let entity of this.world.entities) {
            let mv = entity.movable;
            if (mv != null && (mv.dx != 0 || mv.dy != 0)) {
                entity.x += mv.dx;
                entity.y += mv.dy;
                let cancelledDX = false, cancelledDY = false;
                let {rect} = entity;
                for (let entity2 of this.world.entities) {
                    if (entity == entity2) continue;
                    let rect2 = entity2.rect;
                    if (!cancelledDX && rect.horizontalHitTest(rect2)) {
                        cancelledDX = true;
                        entity.x -= mv.dx;
                    }
                    if (!cancelledDY && rect.verticalHitTest(rect2)) {
                        cancelledDY = true;
                        entity.y -= mv.dy;
                    }
                }
                entity.htmlElement!.style.left = entity.x + 'px';
                entity.htmlElement!.style.top = entity.y + 'px';
            }
            // Z-ordering
            for (let entity2 of this.world.entities) {
                if (entity.y > entity2.y) {
                    $(entity.htmlElement as any).before($(entity2.htmlElement as any));
                }
            }
        }
    }
}