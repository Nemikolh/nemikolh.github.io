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

/// If the scene needs to be modified,
/// this data structure needs to be updated as well.
interface SceneData {
    projectiles: Projectile[];
    aoes: AOE[];
    entities: Entity[];
}

@Injectable()
export class Scene implements SceneData {
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
    }, 'Bob'), entity({
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
    }, 'Alice')
    ];
}

@Injectable()
export class SceneProvider {

    // Indirection needed to make TypeScript 1.8 privacy checker
    // happy. No longer needed in TypeScript 2.0
    private scene: { scene: Scene } = { scene: new Scene() };

    getSceneProxy(): SceneData {
        let provider = this.scene;
        class SceneProxy implements SceneData {
            get projectiles(): Projectile[] {
                return provider.scene.projectiles;
            }
            set projectiles(new_val: Projectile[]) {
                provider.scene.projectiles = new_val;
            }

            get aoes(): AOE[] {
                return provider.scene.aoes;
            }
            set aoes(new_val: AOE[]) {
                provider.scene.aoes = new_val;
            }

            get entities(): Entity[] {
                return provider.scene.entities;
            }
            set entities(new_val: Entity[]) {
                provider.scene.entities = new_val;
            }
        }

        return new SceneProxy();
    }

    resetScene() {
        this.scene.scene = new Scene();
    }
}
