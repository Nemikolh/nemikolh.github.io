import {CharStats} from '../spells/spec';
import {Vec2, HasSpeed, BoundingBox} from './scene';
import * as _ from 'lodash';

interface EntityProps extends Vec2, HasSpeed, CharStats, BoundingBox {
    health: number;
    mana: number;
    effects: any[];
}

export class Entity implements EntityProps {
    x: number = 0;
    y: number = 0;
    speed: Vec2 = {x: 0, y: 0};
    health: number;
    mana: number;
    strength: number = 5;
    wisdom: number = 5;
    constitution: number = 5;
    dexterity: number = 5;
    intelligence: number = 5;
    precision: number = 5;
    level: number = 1;
    w: number = 16;
    h: number = 40;
    effects: any[] = [];

    constructor(public name: string) {}

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

export function entity(props: EntityProps, name: string): Entity {
    let e = new Entity(name);
    copy_into(props, e);
    return e;
}

/// TODO: could be replace with a simple _.cloneDeep?
function copy_into(in_: EntityProps, out: EntityProps) {
    out.x = in_.x;
    out.y = in_.y;
    out.health = in_.health;
    out.mana = in_.mana;
    out.speed = _.cloneDeep(in_.speed);
    out.strength = in_.strength;
    out.wisdom = in_.wisdom;
    out.constitution = in_.constitution;
    out.dexterity = in_.dexterity;
    out.intelligence = in_.intelligence;
    out.precision = in_.precision;
    out.level = in_.level;
    out.w = in_.w;
    out.h = in_.h;
    out.effects = in_.effects;
    return out;
}
