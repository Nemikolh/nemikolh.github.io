import {Injectable} from '@angular/core';
import {SpellSpec, SpellCost, ProjectileCtor} from '../spells/spec';
import {AOECtor, SpellEffect, SpellEffectFailure} from '../spells/spec';
import {ProjectileDef, AOEDef} from '../spells/spec';
import {SpellSpecList} from '../spells/all';
import * as _ from 'lodash';


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
                let new_spell = this.buildProjectileFromDef(
                    spell.definitions.projectile[name]
                );
                if (inherit_from) {
                    if (inherit_from)
                    new_spell.range = inherit_from.range;
                    new_spell.speed = inherit_from.speed;
                }
                return new_spell;
            };
        }
        this.definitions = {
            projectile: projectiles,
            aoe: {},    // TODO
        };
        this.on_start_cast = spell.on_start_cast;
        this.on_end_cast = spell.on_end_cast;
        this.on_cast_failure = spell.on_cast_failure;
    }

    private buildProjectileFromDef(proj_def: ProjectileDef) {
        return new Projectile(
            proj_def.direction,
            proj_def.speed
        )
    }
}

/// Concrete projectile used by the engine stack.
export class Projectile {

    // Current stats
    constructor(
        public direction: number,
        public speed: number,
        public range: number
    ) {}
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
