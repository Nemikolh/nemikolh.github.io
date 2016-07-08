import {Injectable} from '@angular/core';
import {SpellSpec} from '../spec';

import {fireball} from './fireball';
import {sparkOfApoc} from './spark';
import {headshot} from './headshot';


@Injectable()
export class SpellSpecList {
  spells: SpellSpec[] = [
      fireball,
      sparkOfApoc,
      headshot
  ];

  selected_spell: SpellSpec;

  constructor() {
      this.selected_spell = this.spells[1];
  }
}
