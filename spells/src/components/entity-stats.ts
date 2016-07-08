import {Component, Input} from '@angular/core';
import {Entity} from '../models/entity';

let template = require<string>('./entity-stats.html');

@Component({
    selector: 'entity-stats',
    templateUrl: template,
})
export class EntityStats {

    @Input()
    entity: Entity;
}
