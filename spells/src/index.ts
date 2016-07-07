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
import {Scene, SceneProvider} from './models/scene';
import {SpellSpecList} from './spells/all';
import {Logger} from './models/logger';

bootstrap(App, [
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    SceneProvider,
    provide(Scene, {
        useFactory: (prov) => prov.getSceneProxy(),
        deps: [SceneProvider]}
    ),
    GameEngine,
    SpellEngine,
    SpellSpecList,
    Logger
]);
