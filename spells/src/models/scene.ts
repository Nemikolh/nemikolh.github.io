import {Injectable} from '@angular/core';
import {Projectile, AOE} from './spell';
import {entity, Entity} from './entity';

export interface Vec2 {
    x: number;
    y: number;
}

export interface HasSpeed {
    speed: Vec2;
}

export interface BoundingBox {
    w: number;
    h: number;
}

export const ZeroVec2: Vec2 = {x: 0, y: 0};

@Injectable()
export class Scene {
    projectiles: Projectile[] = [];

    aoes: AOE[] = [];
    entities: Entity[] = [entity({
        x: 0,
        y: -124,
        w: 16,
        h: 40,
        speed: ZeroVec2,
        health: 100,
        mana: 100,
        strength: 5,
        wisdom: 5,
        constitution: 5,
        dexterity: 5,
        intelligence: 5,
        precision: 1,
        level: 1,
        effects: [],
    }), entity({
        x: 0,
        y: 0,
        w: 16,
        h: 40,
        speed: ZeroVec2,
        health: 100,
        mana: 100,
        strength: 3,
        wisdom: 3,
        constitution: 3,
        dexterity: 10,
        intelligence: 4,
        precision: 2,
        level: 2,
        effects: [],
    })
    ];
}
