import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Logger} from './models/logger';
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

    constructor(private game: GameEngine, private logger: Logger) {}

    isStop() {
        return this.game.hasStarted();
    }

    logEntry(): string {
        return this.logger.last_log;
    }

    togglePhysics() {
        if (this.game.hasStarted()) {
            this.game.stop();
        } else {
            this.game.start();
        }
    }

    castSpell() {
        this.game.castSpell();
    }
}
