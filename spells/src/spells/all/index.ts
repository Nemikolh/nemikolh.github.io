import {Injectable} from '@angular/core';
import {SpellSpec} from '../spec';

import {fireball} from './fireball';


@Injectable()
export class SpellSpecList {
  spells: SpellSpec[] = [
      fireball
  ];

  selected_spell: SpellSpec;

  constructor() {
      this.selected_spell = this.spells[0];
  }
}
