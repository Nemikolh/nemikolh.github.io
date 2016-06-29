import {enableProdMode} from '@angular/core';

if (IS_PRODUCTION) {
  enableProdMode();
}

import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {App} from './app';
import {PhysicsEngine} from './physics/engine';
import {Scene} from './models/scene';

bootstrap(App, [
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  Scene,
  PhysicsEngine
]);
