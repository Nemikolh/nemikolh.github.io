import {Component} from '@angular/core';
import {Scene} from '../models/scene';
import {uniqueId} from 'lodash';

@Component({
    selector: 'scene',
    styles: [
        `canvas {
            width: 100vw;
            height: 100vh;
            position: absolute;
            z-index: -1;
        }`
    ],
    template: `
    <canvas id={{id}}></canvas>
    `
})
export class SceneComp {
    id: string;
    private _loop: () => void;

    constructor(
        private scene: Scene
    ) {
        this.id = uniqueId('scene');
    }

    ngAfterViewInit() {
        let canvas = document.getElementById(this.id) as HTMLCanvasElement;
        let ctx = canvas.getContext('2d');
        let width = canvas.clientWidth;
        let height = canvas.clientHeight;
        canvas.width = width;
        canvas.height = height;
        console.log(width, height);

        this._loop = () => {
            this.loop(ctx, width, height);
            requestAnimationFrame(this._loop);
        };

        this._loop();
    }

    private loop(ctx: CanvasRenderingContext2D, w: number, h: number) {
        // Clear screen + transform
        ctx.setTransform(
            1, 0,
            0, 1, 0, 0
        );
        ctx.clearRect(0, 0, w, h);
        ctx.translate(w / 2, h / 2);
        ctx.scale(2, 2);
        // Draw AOE:
        ctx.fillStyle = 'blue';
        for (let aoe of this.scene.aoes) {
            ctx.fillRect(aoe.x, aoe.y, aoe.w, aoe.h);
        }
        // Draw entities
        for (let entity of this.scene.entities) {
            if (entity.health < 25) {
                ctx.fillStyle = 'rgb(202, 144, 0)';
            } else if (entity.health < 50) {
                ctx.fillStyle = 'rgb(180, 208, 48)';
            } else {
                ctx.fillStyle = 'green';
            }
            ctx.fillRect(entity.x, entity.y, entity.w, entity.h);
        }
        // Draw projectiles
        ctx.fillStyle = 'red';
        for (let particle of this.scene.projectiles) {
            ctx.fillRect(particle.x, particle.y, particle.w, particle.h);
        }
    }
}
