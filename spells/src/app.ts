import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {SceneComp} from './renderer/scene';
import {PhysicsEngine} from './physics/engine';

let appTemplate = require<string>('./app.html');
let appCss = require<any>('./app.scss');

@Component({
  selector: 'app',
  templateUrl: appTemplate,
  styles: [appCss.toString()],
  directives: [SceneComp, CORE_DIRECTIVES, MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES]
})
export class App {

    constructor(private phyics: PhysicsEngine) {}

    isStop() {
        return this.phyics.hasStarted();
    }

    togglePhysics() {
        if (this.phyics.hasStarted()) {
            this.phyics.stop();
        } else {
            this.phyics.start();
        }
    }
}
