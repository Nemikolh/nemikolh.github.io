import {Injectable} from '@angular/core';

@Injectable()
export class Logger {

    last_log: string = '';
    full_log: string = '';

    log(msg: string) {
        this.last_log = msg;
        this.full_log += `${msg}\n`;
    }
}
