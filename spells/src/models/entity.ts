import {CharStats} from '../spells/spec';
import {Vec2, HasId, HasSpeed} from './scene';
import * as _ from 'lodash';

interface EntityProps extends Vec2, HasId, HasSpeed, CharStats {
    health: number;
}

export class Entity implements EntityProps {
    x: number = 0;
    y: number = 0;
    speed: Vec2 = {x: 0, y: 0};
    health: number;
    strength: number = 5;
    wisdom: number = 5;
    constitution: number = 5;
    dexterity: number = 5;
    intelligence: number = 5;
    precision: number = 5;
    level: number = 1;

    constructor(public id: number) {}

    clone(): EntitySnapshot {
        let a: EntitySnapshot = {
            current: this
        } as any;
        copy_into(this, a);
        return a;
    }
}

export interface EntitySnapshot extends EntityProps {
    current?: Entity;
}

export function entity(props: EntityProps): Entity {
    let e = new Entity(props.id);
    copy_into(props, e);
    return e;
}

/// TODO: could be replace with a simple _.cloneDeep?
function copy_into(in_: EntityProps, out: EntityProps) {
    out.id = in_.id;
    out.x = in_.x;
    out.y = in_.y;
    out.health = in_.health;
    out.speed = _.cloneDeep(in_.speed);
    out.strength = in_.strength;
    out.wisdom = in_.wisdom;
    out.constitution = in_.constitution;
    out.dexterity = in_.dexterity;
    out.intelligence = in_.intelligence;
    out.precision = in_.precision;
    out.level = in_.level;
    return out;
}
