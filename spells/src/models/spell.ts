import {SpellSpec, SpellCost, ProjectileCtor} from '../spells/spec';
import {AOECtor, SpellEffect, SpellEffectFailure} from '../spells/spec';
import {ProjectileDef} from '../spells/spec';
import {Shape, Square, Disc} from '../spells/spec';
import {SpellEffectOnHit} from '../spells/spec';
import {Vec2, HasSpeed, BoundingBox} from './scene';
import {Entity} from './entity';


/// This class parse a SpellSpec and converts it
/// into an internal Spell object that can be used
/// by the game engine.
export class Spell {
    // Short Meta (no need for everything)
    // won't be used anyway
    name: string;
    // Properties
    cost: number | SpellCost;
    definitions: {
        projectile: { [projectile_name: string]: ProjectileCtor };
        aoe: { [aoe_name: string]: AOECtor };
    };
    on_start_cast: SpellEffect[];
    on_end_cast: SpellEffect[];
    on_cast_failure: SpellEffectFailure[];

    constructor(spell: SpellSpec, public caster: Entity) {
        this.name = spell.name;

        this.cost = spell.cost;
        let projectiles: { [name: string]: ProjectileCtor } = {};
        for (let name in spell.definitions.projectile) {
            let projectile_def = spell.definitions.projectile[name];
            projectiles[name] = (inherit_from) => {
                let new_spell: Projectile;
                if (inherit_from) {
                    if (inherit_from instanceof Projectile) {
                        // Weird, we should not need that line...
                        let old_proj = inherit_from as Projectile;
                        new_spell.x = old_proj.x;
                        new_spell.range = old_proj.range;
                    }
                } else {
                    new_spell = this.buildProjectileFromDef(
                        this.caster,
                        spell.definitions.projectile[name]
                   );
                }
                new_spell.on_hit = projectile_def.on_hit;
                return new_spell;
            };
        }
        this.definitions = {
            projectile: projectiles,
            aoe: {},    // TODO
        };
        this.on_start_cast = spell.on_start_cast;
        this.on_end_cast = spell.on_end_cast;
        this.on_cast_failure = spell.on_cast_failure;
    }

    private dir_and_speed_to_vec(direction: number, speed: number): Vec2 {
        return {
            x: speed * 16 * Math.cos(direction),
            y: speed * 16 * Math.sin(direction),
        };
    }

    private sizebox(shape: Shape): { w: number, h:number } {
        if ((shape as Disc).disc) {
            let d = shape as Disc;
            return {
                w: d.disc.radius,
                h: d.disc.radius,
            };
        } else {
            let s = shape as Square;
            return {
                w: s.square.side,
                h: s.square.side,
            };
        }
    }

    private buildProjectileFromDef(caster: Entity, proj_def: ProjectileDef): Projectile {
        let speed = this.dir_and_speed_to_vec(proj_def.direction, proj_def.speed);
        let size = this.sizebox(proj_def.hitbox);
        return new Projectile(
            speed,
            caster.x,
            caster.y,
            proj_def.range,
            size.w,
            size.h,
            this
        );
    }
}

/// Concrete projectile used by the engine stack.
export class Projectile implements Vec2, HasSpeed, BoundingBox {

    // Current stats
    constructor(
        public speed: Vec2,
        public x: number,
        public y: number,
        public range: number,
        public w: number,
        public h: number,
        public spell: Spell
    ) {}

    on_hit: SpellEffectOnHit;
}

// TODO: Turn into a concrete class (similar to Projectile)
export type AOE = Vec2 & BoundingBox;
