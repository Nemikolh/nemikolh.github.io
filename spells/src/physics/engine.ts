import {Injectable} from '@angular/core';
import {Scene, Projectile, Entity} from '../models/scene';
import {SpellEngine} from '../spells/engine';


@Injectable()
export class PhysicsEngine {

    private _loop: () => void = undefined;
    private loop_id: number = 0;
    private last_time: number = 0;

    constructor(private scene: Scene, private spell_engine: SpellEngine) {}

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
        let caster = this.scene.entities[0];
        for (let entity of this.scene.entities) {
            entity.x += entity.speed.x * elapsed;
            entity.y += entity.speed.y * elapsed;
        }
        for (let projectile of this.scene.projectiles) {
            projectile.x += projectile.speed.x * elapsed;
            projectile.y += projectile.speed.y * elapsed;
        }
        for (let projectile of this.scene.projectiles) {
            for (let entity of this.scene.entities) {
                if (this.collide(projectile, entity) && caster != entity) {
                    this.spell_engine.onHit(caster, projectile, entity);
                }
            }
        }
    }

    private collide(projectile: Projectile, entity: Entity): boolean {
        return false;
    }
}
