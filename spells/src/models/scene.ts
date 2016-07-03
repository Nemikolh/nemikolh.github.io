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
    private next_id: number = 2;
    projectiles: Projectile[] = [];
    
    aoes: AOE[] = [];
    entities: Entity[] = [entity({
        x: 0,
        y: -124,
        w: 16,
        h: 40,
        speed: ZeroVec2,
        id: 0,
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
        id: 1,
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

    // TODO: Complete
    spawn_projectile(projectile: Vec2 & HasSpeed): number {
        let new_id = this.next_id++;
        let new_projectile = {
            x: projectile.x,
            y: projectile.y,
            speed: projectile.speed,
            w: 8,
            h: 8,
            id: new_id,
        };
        this.projectiles.push(new_projectile);
        return new_id;
    }
}
