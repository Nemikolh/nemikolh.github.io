import {enableProdMode} from '@angular/core';

if (IS_PRODUCTION) {
  enableProdMode();
}

import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {App} from './app';
import {GameEngine} from './game/engine';
import {SpellEngine} from './game/spell_engine';
import {Scene} from './models/scene';
import {SpellList} from './models/spell';
import {SpellSpecList} from './spells/all';
import {Logger} from './models/logger';

bootstrap(App, [
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  Scene,
  GameEngine,
  SpellEngine,
  SpellList,
  SpellSpecList,
  Logger
]);
