import {Injectable} from '@angular/core';
import {SpellSpec} from '../spec';

import {fireball} from './fireball';

@Injectable()
export class SpellSpecService {
  getSpells() {
    return [
      fireball
    ];
  }
}

@Injectable()
export class SpellSpecList {
  spells: SpellSpec[];

  constructor(spellService: SpellSpecService) {
    this.spells = spellService.getSpells();
  }
}
