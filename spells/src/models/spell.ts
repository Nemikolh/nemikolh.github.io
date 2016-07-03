import {Injectable} from '@angular/core';

import {SpellSpec,SpellCost,ProjectileCtor,AOECtor,SpellEffect,
    SpellEffectFailure} from '../spells/spec';
import {ProjectileWithScript, AOEWithScript} from '../spells/spec';
import {SpellSpecList} from '../spells/all/index.ts'


/// This class parse a SpellSpec and converts it
/// into an internal Spell object that can be used
/// by the game engine.
export class Spell {
    // Meta
    name: string;
    uuid: string;
    description: string;
    // Properties
    cost: number | SpellCost;
    definitions: {
        projectile: { [projectile_name: string]: ProjectileCtor };
        aoe: { [aoe_name: string]: AOECtor };
    };
    on_start_cast: SpellEffect[];
    on_end_cast: SpellEffect[];
    on_cast_failure: SpellEffectFailure[];

    constructor(spell: SpellSpec) {
        // XXX: What happens if any of those 3 are undefined?
        this.name = spell.name;
        this.uuid = spell.uuid;
        this.description = spell.description;

        this.cost = spell.cost;
        let projectiles: { [name: string]: ProjectileCtor } = {};
        for (let name in spell.definitions.projectile) {
            projectiles[name] = (inherit_from) => {
                let new_spell = spell.definitions.projectile[name];
                if (inherit_from) {
                    new_spell.range = inherit_from.range;
                }
                return new_spell;
            }
        }
        this.definitions = {
            projectile: projectiles,
            aoe: {},    // TODO
        };
        this.on_start_cast = spell.on_start_cast;
        this.on_end_cast = spell.on_end_cast;
        this.on_cast_failure = spell.on_cast_failure;
    }
}

/// Concrete projectile used by the engine stack.
export class Projectile {

    // Current stats
    direction: number;
    speed: number;
    range: number;
}

@Injectable()
export class SpellList {

    spells: Spell[] = [];
    selected_spell: Spell;

    constructor(spellList: SpellSpecList) {
      for (let spell of spellList.spells) {
        this.spells.push(new Spell(spell));
      }
      this.selected_spell = this.spells[0];
    }
}
