import {Injectable} from '@angular/core';
import {Delta} from '../game/delta';
import {Scene, Projectile, Vec2} from '../models/scene';
import {Entity, EntitySnapshot} from '../models/entity';
import {SpellList, Spell} from '../models/spell';
import {SpellCost,ProjectileWithScript,AOEWithScript,SpellEffectOnHit, SpellEffect} from '../spells/spec.ts';

function direction_and_speed_to_vec(direction: number|string, speed: number): Vec2 {
    // TODO
    return {
        x: 0,
        y: 2,
    };
}

@Injectable()
export class SpellEngine {
    private lookup_table: {
        spell: Spell;
        // XXX: Better way to know which projectile in the spell?
        on_hit: SpellEffectOnHit;
        caster: EntitySnapshot;
    }[] = [];

    constructor(private scene: Scene, private spell_list: SpellList) {}

    cast(caster: Entity) {
        let to_cast = this.spell_list.selected_spell;
        let cost: number;
        if (typeof to_cast.cost == "number") {
            cost = <number> to_cast.cost;
        } else {
            let cost_func = <SpellCost> to_cast.cost;
            cost = cost_func(caster);
        }
        if (caster.mana >= cost) {
            caster.mana -= cost;
            // TODO: Switch to on_start_cast, and start timer to on_end_cast
            this.castSpellEffects(caster.clone(), to_cast, to_cast.on_end_cast);
        } else {
            console.log("No mana!");
        }
    }

    onHit(projectile: Projectile, target: Entity): Delta[] {
        let id = projectile.id;
        let spell = this.lookup_table[id];
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
            // TODO: Do better, or the array will only grow
            delete this.lookup_table[id];
        } else {
            console.log("Error: no effects in the lookup table");
        }

        return null;
    }

    private castSpellEffects(caster: EntitySnapshot, spell: Spell, effects: SpellEffect[]) {
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
            this.spawnProjectiles(caster, spell, out.$lycan.new_projectiles);
            if (interrupt) { break; }
        }
    }

    private spawnProjectiles(caster: EntitySnapshot, spell: Spell, projectiles: ProjectileWithScript[]) {
        for (let projectile of projectiles) {
            console.log("spawnProjectiles: x " + caster.x + " y " + caster.y);
            let p = {
                x: caster.x,
                y: caster.y,
                speed: direction_and_speed_to_vec(projectile.direction, projectile.speed),
            };
            let id = this.scene.spawn_projectile(p);
            this.lookup_table[id] = {
                caster: caster,
                on_hit: projectile.on_hit,
                spell: spell,
            };
        }
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
