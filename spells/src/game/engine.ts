import {Injectable} from '@angular/core';
import {Logger} from '../models/logger';
import {Scene, Vec2, BoundingBox} from '../models/scene';
import {Delta} from './delta';
import {SpellEngine} from './spell_engine';
import {pullAll, remove} from 'lodash';


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
        for (let entity of this.scene.entities) {
            entity.x += entity.speed.x * elapsed;
            entity.y += entity.speed.y * elapsed;
        }
        for (let projectile of this.scene.projectiles) {
            let dx = projectile.speed.x * elapsed;
            let dy = projectile.speed.y * elapsed;
            projectile.x += dx;
            projectile.y += dy;
            projectile.range -= Math.sqrt(dx * dx + dy * dy);
        }
        // Remove projectiles that have reached the end of their range:
        let end_range_proj = remove(this.scene.projectiles, p => p.range < 0);
        for (let proj of end_range_proj) {
            this.spell_engine.onEndRange(proj);
        }
        // Collect deltas:
        let deltas: Array<Delta> = [];
        let projectile_consumed = [];
        for (let projectile of this.scene.projectiles) {
            for (let entity of this.scene.entities) {
                if (this.collide(projectile, entity) && projectile.canCollideWith(entity)) {
                    let res = this.spell_engine.onHit(projectile, entity);
                    projectile_consumed.push(projectile);
                    deltas.push(...res);
                    break;
                }
            }
        }
        // Clear all projectiles
        pullAll(this.scene.projectiles, projectile_consumed);
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

        if (a.x > b.x + b.w) { return false; }
        if (a.x + a.w < b.x) { return false; }

        if (a.y > b.y + b.h)  { return false; }
        if (a.y + a.h < b.y) { return false; }

        return true;
    }
}
