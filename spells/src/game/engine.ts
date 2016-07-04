import {Injectable} from '@angular/core';
import {Logger} from '../models/logger';
import {Scene, Vec2, BoundingBox} from '../models/scene';
import {Delta} from './delta';
import {SpellEngine} from './spell_engine';


@Injectable()
export class GameEngine {

    private _loop: () => void = undefined;
    private loop_id: number = 0;
    private last_time: number = 0;

    constructor(private logger: Logger, private scene: Scene, private spell_engine: SpellEngine) {}

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

    castSpell() {
        let caster = this.scene.entities[0];
        let deltas = this.spell_engine.cast(caster);
        this.process_deltas(deltas);
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
        // Collect deltas:
        let deltas: Array<Delta> = [];
        for (let projectile of this.scene.projectiles) {
            for (let entity of this.scene.entities) {
                if (this.collide(projectile, entity) && projectile.canCollideWith(entity)) {
                    let res = this.spell_engine.onHit(projectile, entity);
                    deltas.push(...res);
                    break;
                }
            }
        }
        // Clear all projectiles
        this.scene.projectiles = [];
        // Resolve deltas
        this.process_deltas(deltas);
    }

    private process_deltas(deltas: Delta[]) {
        for (let delta of deltas) {
            if (delta.spawn_projectile) {
                this.scene.projectiles.push(delta.spawn_projectile);
            } else if (delta.spawn_aoe) {
                // TODO: Spawn aoe
            }
        }
    }

    private collide(a: BoundingBox & Vec2, b: BoundingBox & Vec2): boolean {
        let a_left  = a.x - a.w / 2;
        let a_right = a.x + a.w / 2;
        let a_bot   = a.y - a.h / 2;
        let a_top   = a.y + a.h / 2;
        let b_left  = b.x - b.w / 2;
        let b_right = b.x + b.w / 2;
        let b_bot   = b.y - b.h / 2;
        let b_top   = b.y + b.h / 2;

        if (a_bot > b_top) { return false; }
        if (a_top < b_bot) { return false; }

        if (a_right < b_left)  { return false; }
        if (a_left  > b_right) { return false; }

        return true;
    }
}
