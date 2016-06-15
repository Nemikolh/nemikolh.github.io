import {enableProdMode} from '@angular/core';

if (IS_PRODUCTION) {
  enableProdMode();
}

import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {App} from './app';

bootstrap(App, [
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);
