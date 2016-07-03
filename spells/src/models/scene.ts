import {Injectable} from '@angular/core';
import {entity, Entity} from './entity';

export interface Vec2 {
    x: number;
    y: number;
}

export interface HasId {
    id: number;
}

export interface HasSpeed {
    speed: Vec2;
}

export interface Shape {
    w: number;
    h: number;
}

export const ZeroVec2: Vec2 = {x: 0, y: 0};

export type Projectile = Vec2 & HasSpeed & HasId & Shape;
export type AOE = Vec2 & Shape & HasId;

@Injectable()
export class Scene {
    projectiles: Projectile[] = [{
        x: 0, y: -100,
        speed: {x: 0, y: 2},
        w: 8,
        h: 8,
        id: 0
    }, {
        x: 100, y: 100,
        speed: ZeroVec2,
        w: 8,
        h: 8,
        id: 1
    }];
    aoes: AOE[] = [];
    entities: Entity[] = [entity({
        x: 0,
        y: -124,
        w: 16,
        h: 40,
        speed: ZeroVec2,
        id: 0,
        health: 100,
        strength: 5,
        wisdom: 5,
        constitution: 5,
        dexterity: 5,
        intelligence: 5,
        precision: 1,
        level: 1,
    })];
}
