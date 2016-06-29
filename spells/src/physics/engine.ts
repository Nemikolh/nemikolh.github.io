import {Injectable} from '@angular/core';
import {Scene} from '../models/scene';

@Injectable()
export class PhysicsEngine {

    private _loop: () => void = undefined;
    private loop_id: number = 0;
    private last_time: number = 0;

    constructor(private scene: Scene) {}

    hasStarted() {
        return this._loop !== undefined;
    }

    start() {
        if (!this._loop) {
            this._loop = () => {
                if (this.last_time !== 0) {
                    let elapsed = (Date.now() - this.last_time) / 1000;
                    this.update(elapsed);
                }
                this.last_time = Date.now();
                this.loop_id = setTimeout(this._loop, 15);
            };
            this._loop();
        }
    }

    stop() {
        clearTimeout(this.loop_id);
        this.last_time = 0;
        this._loop = undefined;
    }

    private update(elapsed: number) {
        for (let entity of this.scene.entities) {
            entity.x += entity.speed.x * elapsed;
            entity.y += entity.speed.y * elapsed;
        }
        for (let particle of this.scene.projectiles) {
            particle.x += particle.speed.x * elapsed;
            particle.y += particle.speed.y * elapsed;
        }
    }
}
