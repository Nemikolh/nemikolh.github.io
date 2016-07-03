import {Injectable} from '@angular/core';

import {SpellSpec} from '../spells/spec';
import {ProjectileWithScript, AOEWithScript} from '../spells/spec';
import {SpellSpecList} from '../spells/all/index.ts'


/// This class parse a SpellSpec and converts it
/// into an internal Spell object that can be used
/// by the game engine.
export class Spell {

    constructor(spell: SpellSpec) {

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
