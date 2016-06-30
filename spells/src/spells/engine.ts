import {Injectable} from '@angular/core';
import {Scene, Entity, Projectile} from '../models/scene';
import {SpellList} from '../models/spell_list';
import {Spell} from './spec';


@Injectable()
export class SpellEngine {

    private active_spells: Spell[];

    constructor(private scene: Scene, private spell_list: SpellList) {}

    cast(spell: Spell) {

    }

    onHit(caster: Entity, projectile: Projectile, entity: Entity) {

    }
}
