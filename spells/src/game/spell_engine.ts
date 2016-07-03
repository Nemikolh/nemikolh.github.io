import {Injectable} from '@angular/core';
import {Delta} from '../game/delta';
import {Logger} from '../models/logger';
import {Scene, Projectile, Vec2} from '../models/scene';
import {Entity, EntitySnapshot} from '../models/entity';
import {SpellList, Spell} from '../models/spell';
import {SpellCost,ProjectileWithScript,AOEWithScript,SpellEffectOnHit, SpellEffect} from '../spells/spec.ts';

interface LookupTable {
    [id: string]: {
        spell: Spell;
        on_hit: SpellEffectOnHit;
        caster: EntitySnapshot;
    };
}

@Injectable()
export class SpellEngine {
    private lookup_table: LookupTable = {};

    constructor(
        private logger: Logger,
        private scene: Scene,
        private spell_list: SpellList
    ) {}

    cast(caster: Entity): Delta[] {
        let to_cast = this.spell_list.selected_spell;
        let cost: number;
        if (typeof to_cast.cost == 'number') {
            cost = to_cast.cost;
        } else {
            cost = to_cast.cost(caster);
        }
        if (caster.mana >= cost) {
            caster.mana -= cost;
            // TODO: Switch to on_start_cast, and start timer to on_end_cast
            return this.castSpellEffects(
                caster.clone(),
                to_cast,
                to_cast.on_end_cast
            );
        } else {
            return [];
        }
    }

    onHit(projectile: Projectile, target: Entity): Delta[] {
        let id = projectile.id;
        let spell = this.lookup_table[id];
        let deltas: Delta[] = [];
        if (spell) {
            let lycan = new Lycan();
            let in_ = {
                $caster: spell.caster,
                $target: target,
                $spell: spell.spell.definitions,
                $lycan: lycan,
                $self: projectile as any, // FIXME
            };
            let out = {
                $caster: { current: new EntityOut() },
                $target: new EntityOut(),
                $lycan: lycan,
            };
            spell.on_hit(in_, out);
            out.$target.finalize(target);
            out.$caster.current.finalize(spell.caster.current);
            this.spawnProjectiles(spell.caster, spell.spell, out.$lycan.new_projectiles);
            delete this.lookup_table[id];
        } else {
            this.logger.log('Error: no effects in the lookup table');
        }

        return deltas;
    }

    private castSpellEffects(
        caster: EntitySnapshot,
        spell: Spell,
        effects: SpellEffect[]
    ): Delta[] {
        let deltas: Delta[] = [];
        for (let effect of effects) {
            let interrupt = false;
            let lycan = new Lycan();
            let in_ = {
                $caster: caster,
                $spell: spell.definitions,
                $lycan: lycan,
            };
            let out = {
                $caster: new EntityOut(),
                $lycan: lycan,
                $interrupt: () => { interrupt = true; },
            };
            effect(in_, out);
            caster.health -= out.$caster.total_damages;
            deltas.push(
                ...lycan.new_projectiles.map(
                    partial_proj => ({
                        x: caster.x,
                        y: caster.y,
                        speed: this.dir_and_speed_to_vec(
                            partial_proj.direction,
                            partial_proj.speed
                        )
                    })
                )
            );
            if (interrupt) { break; }
        }
        return deltas;
    }

    private dir_and_speed_to_vec(direction: number, speed: number): Vec2 {
        return {
            x: speed * 16 * Math.cos(direction),
            y: speed * 16 * Math.sin(direction),
        };
    }
}

class Lycan {
    effects: any[] = [];
    new_projectiles: ProjectileWithScript[] = [];

    spawn(to_spawn: ProjectileWithScript | AOEWithScript) {
        // At the moment assume it is only a projectile
        let projectile = <ProjectileWithScript> to_spawn;
        this.new_projectiles.push(projectile);
    }
}

class EntityOut {
    total_damages: number = 0;

    damages(d: number) {
        this.total_damages += d;
    }

    effects(e: any) {
        // TODO
    }

    finalize(e: Entity) {
        e.health -= this.total_damages;
    }
}
