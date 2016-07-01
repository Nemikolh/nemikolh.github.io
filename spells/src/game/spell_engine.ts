import {Injectable} from '@angular/core';
import {Delta} from '../game/delta';
import {Scene, Projectile} from '../models/scene';
import {Entity} from '../models/entity';
import {SpellList, Spell} from '../models/spell';


@Injectable()
export class SpellEngine {

    private active_spells: Spell[];

    constructor(private scene: Scene, private spell_list: SpellList) {}

    cast(spell_name: string) {
        this.spell_list.spells.filter
    }

    onHit(caster: Entity, projectile: Projectile, entity: Entity): Delta[] {
        return null;
    }
}
