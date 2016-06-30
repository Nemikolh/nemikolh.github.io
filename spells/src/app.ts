import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {SceneComp} from './renderer/scene';
import {GameEngine} from './game/engine';

let appTemplate = require<string>('./app.html');
let appCss = require<any>('./app.scss');

@Component({
  selector: 'app',
  templateUrl: appTemplate,
  styles: [appCss.toString()],
  directives: [SceneComp, CORE_DIRECTIVES]
})
export class App {

    constructor(private game: GameEngine) {}

    isStop() {
        return this.game.hasStarted();
    }

    togglePhysics() {
        if (this.game.hasStarted()) {
            this.game.stop();
        } else {
            this.game.start();
        }
    }
}
