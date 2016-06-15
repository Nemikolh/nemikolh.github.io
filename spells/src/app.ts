import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

let appTemplate = require<string>('./app.html');
let appCss = require<any>('./app.scss');

@Component({
  selector: 'app',
  templateUrl: appTemplate,
  styles: [appCss.toString()],
  directives: [CORE_DIRECTIVES]
})
export class App {
  name: string = "World";
}
