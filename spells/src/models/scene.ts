import {Injectable} from '@angular/core';

interface Vec2 {
    x: number;
    y: number;
}

interface HasSpeed {
    speed: Vec2;
}

interface Shape {
    w: number;
    h: number;
}

export const ZeroVec2: Vec2 = {x: 0, y: 0};

export type Projectile = Vec2 & HasSpeed;
export type AOE = Vec2 & Shape;
export type Entity = Vec2 & HasSpeed;

@Injectable()
export class Scene {
    projectiles: Projectile[] = [{
        x: 0, y: -100,
        speed: {x: 0, y: 20}
    }, {
        x: 100, y: 100,
        speed: ZeroVec2
    }];
    aoes: AOE[] = [];
    entities: Entity[] = [{
        x: -8,
        y: 0,
        speed: ZeroVec2
    }];
}
