import {Injectable} from '@angular/core';
import {Delta} from '../game/delta';
import {Logger} from '../models/logger';
import {Scene} from '../models/scene';
import {Projectile, Spell} from '../models/spell';
import {Entity, EntitySnapshot} from '../models/entity';
import {SpellSpecList} from '../spells/all';
import {SpellEffect, SpellCost} from '../spells/spec';

@Injectable()
export class SpellEngine {

    constructor(
        private logger: Logger,
        private scene: Scene,
        private spell_list: SpellSpecList
    ) {}

    cast(caster: Entity): Delta[] {
        let to_cast = new Spell(this.spell_list.selected_spell, caster);
        let cost: number;
        // No need to add any cast, TypeScript do control flow typing
        // and thus now what need to be casted to what
        if (typeof to_cast.cost == 'number') {
            cost = to_cast.cost as number;
        } else {
            cost = (to_cast.cost as SpellCost)(caster);
        }
        if (caster.mana >= cost) {
            caster.mana -= cost;
            this.logger.log(`Casting spell! ${to_cast.name}`);
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
        let spell = projectile.spell;
        let deltas: Delta[] = [];
        let lycan = new Lycan([...projectile.ignore_those, target]);
        let in_ = {
            $caster: spell.caster,
            $target: target,
            $spell: spell.definitions,
            $lycan: lycan,
            $self: projectile as any, // FIXME
        };
        let out = {
            $caster: { current: new EntityOut() },
            $target: new EntityOut(),
            $lycan: lycan,
        };
        projectile.on_hit(in_, out);
        out.$target.finalize(target);
        out.$caster.current.finalize(spell.caster);
        // Collect all projectiles
        deltas.push(...lycan.new_projectiles.map(proj => ({
            spawn_projectile: proj
        })));
        this.logger.log(`Projectile ${spell.name} has hitten ${target.name}`);
        return deltas;
    }

    onEndRange(projectile: Projectile) {
        let spell = projectile.spell;
        let lycan = new Lycan(projectile.ignore_those);
        let in_ = {
            $caster: spell.caster,
            $spell: spell.definitions,
            $lycan: lycan,
            $self: projectile as any, // FIXME
        };
        let out = {
            $caster: { current: new EntityOut() },
            $lycan: lycan,
        };
        this.logger.log(`Projectile ${spell.name} has reached the end of its range`);
        projectile.on_end_range(in_, out);
    }

    private castSpellEffects(
        caster: EntitySnapshot,
        spell: Spell,
        effects: SpellEffect[]
    ): Delta[] {
        let deltas: Delta[] = [];
        for (let effect of effects) {
            let interrupt = false;
            let lycan = new Lycan([caster.current]);
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
            caster.health -= out.$caster.damages;
            deltas.push(...lycan.new_projectiles.map(proj => ({
                spawn_projectile: proj
            })));
            if (interrupt) { break; }
        }
        return deltas;
    }
}

class Lycan {
    effects: any[] = [];
    new_projectiles: Projectile[] = [];

    constructor(private ignore_those: Entity[]) {}

    spawn(proj: Projectile) {
        proj.ignore_those.push(...this.ignore_those);
        this.new_projectiles.push(proj);
    }
}

class EntityOut {
    damages: number = 0;

    effects(e: any) {
        // TODO
    }

    finalize(e: Entity) {
        e.health -= this.damages;
    }
}
