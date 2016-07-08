import {Component} from '@angular/core';
import {Logger} from '../models/logger';

let template = require<string>('./log-panel.html');

@Component({
    selector: 'log-panel',
    templateUrl: template
})
export class LogPanel {

    is_collapsing: boolean = false;
    is_collapsed: boolean = true;
    height: string = '0px';

    private timer_id: number;

    constructor(private logger: Logger) {}

    lastLogEntry(): string {
        return this.logger.last_log;
    }

    fullLog(): string {
        return this.logger.full_log;
    }

    hasLog() {
        return this.logger.last_log !== '';
    }

    toggleCollapse() {
        if (this.logger.last_log === '') return;
        if (this.is_collapsing) return;
        clearTimeout(this.timer_id);
        this.is_collapsing = true;
        this.height = this.is_collapsed ? '100px': '0px';
        this.timer_id = setTimeout(() => {
            this.is_collapsing = false;
            this.is_collapsed = !this.is_collapsed;
        }, 500);
    }
}
