
import {SpellSpec} from '../spells/spec';
import {ProjectileWithScript, AOEWithScript} from '../spells/spec';


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

export class SpellList {

    spells: Spell[] = [];
    selected_spell: Spell;
}
