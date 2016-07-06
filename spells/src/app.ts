import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Logger} from './models/logger';
import {SceneComp} from './renderer/scene';
import {SpellSpecList} from './spells/all';
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

    dropdownIsOpen: boolean = false;

    constructor(
        private game: GameEngine,
        private logger: Logger,
        private spellList: SpellSpecList
    ) {}

    isStop() {
        return this.game.hasStarted();
    }

    logEntry(): string {
        return this.logger.last_log;
    }

    toggleDropDown() {
        this.dropdownIsOpen = !this.dropdownIsOpen;
    }

    selectSpell(spell) {
        this.spellList.selected_spell = spell;
        this.toggleDropDown();
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
