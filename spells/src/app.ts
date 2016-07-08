import {Component, ViewChild} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Logger} from './models/logger';
import {EntityStats} from './components/entity-stats';
import {LogPanel} from './components/log-panel';
import {SceneProvider, Scene} from './models/scene';
import {SceneComp} from './renderer/scene';
import {SpellSpecList} from './spells/all';
import {GameEngine} from './game/engine';

let appTemplate = require<string>('./app.html');
let appCss = require<any>('./app.scss');

@Component({
    selector: 'app',
    templateUrl: appTemplate,
    styles: [appCss.toString()],
    directives: [SceneComp, CORE_DIRECTIVES, EntityStats, LogPanel]
})
export class App {

    dropdownIsOpen: boolean = false;

    @ViewChild(LogPanel)
    private log_panel: LogPanel;

    constructor(
        private game: GameEngine,
        private logger: Logger,
        private spellList: SpellSpecList,
        private scene: Scene,
        private sceneProvider: SceneProvider
    ) {}

    isStop() {
        return this.game.hasStarted();
    }

    hasNoLog(): boolean {
        return !this.log_panel || !this.log_panel.hasLog();
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

    toggleLog() {
        this.log_panel.toggleCollapse();
    }

    resetScene() {
        this.sceneProvider.resetScene();
    }

    castSpell() {
        this.game.castSpell();
    }
}
