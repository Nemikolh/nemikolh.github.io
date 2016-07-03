import {Injectable} from '@angular/core';

@Injectable()
export class Logger {

    private _last_log: string;

    get last_log() {
        return this._last_log;
    }

    log(msg: string) {
        this._last_log = msg;
    }
}
