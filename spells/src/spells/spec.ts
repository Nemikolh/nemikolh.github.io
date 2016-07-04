
export interface SpellSpec {
    // Meta
    name?: string;
    uuid?: string;
    description?: string;
    // Properties
    cost: number | SpellCost;
    definitions: SpellDef;
    on_start_cast: SpellEffect[];
    on_end_cast: SpellEffect[];
    on_cast_failure: SpellEffectFailure[];
}

/// =========================================================
///                 Projectiles and AOEs
///

export interface SpellDef {
    projectile: { [projectile_name: string]: ProjectileWithScript };
    aoe: { [aoe_name: string]: AOEWithScript };
}

export interface ProjectileDef {
    direction: number;
    // In tiles / seconds
    speed: number;
    // In tiles
    range: number;
    hitbox: Shape;
}

export interface ProjectileInternal {}

// Kept in sync with previous (plus minor differences):
// Give the possibility to define only partially some properties
export interface ProjectilePartialDef {
    direction?: number;
    // In tiles / seconds
    speed?: number;
    // In tiles
    range?: number;
    hitbox?: Shape;
}

export interface ProjectileWithScript extends ProjectileDef {
    on_hit: SpellEffectOnHit;
}

export interface AOEDef {
    hitbox: Shape;
    position: Position;
}

export interface AOEPartialDef {
    hitbox?: Shape;
    position?: Position;
}

export interface AOEWithScript extends AOEDef {
    // TODO
}

export interface AOEInternal {}

/// =========================================================
///                 Aariba Script part
///

export interface SpellCost {
    ($caster: EntityIn): number;
}

export interface SpellEffect {
    (in_: {
        $caster: EntityIn;
        $spell: SpellIn;
        $lycan: LycanIn;
    }, out: {
        $caster: EntityOut;
        $lycan: LycanOut;
        $interrupt: Interrupt;
    }): void;
}

export interface SpellEffectOnHit {
    (in_: {
        $caster: EntitySnapshotIn;
        $target: EntityIn;
        $self: ProjectilePartialDef;
        $spell: SpellIn;
        $lycan: LycanIn;
    }, out: {
        $caster: EntitySnapshotOut;
        $target: EntityOut;
        $lycan: LycanOut;
    }): void;
}

export interface SpellEffectOnEndRange {
    (in_: {
        $caster: EntitySnapshotIn;
        $spells: SpellIn;
        $self: ProjectilePartialDef;
        $lycan: LycanIn;
    }, out: {
      $caster: EntitySnapshotOut;
      $lycan: LycanOut;
    }): void;
}
export interface SpellEffectFailure {
    (in_: any, out: any): void;
}

export interface Interrupt { (): void; }

export interface SpellIn {
    projectile: { [projectile_name: string]: ProjectileCtor };
    aoe: { [aoe_name: string]: AOECtor };
}

export interface ProjectileCtor {
    // Please do not change this:
    // It is to remember that this type is partially hidden
    // to the script
    (inherit_from?: ProjectilePartialDef | ProjectileInternal): ProjectileInternal;
}

export interface AOECtor {
    // Please do not change this:
    // It is to remember that this type is partially hidden
    // to the script
    (inherit_from?: AOEPartialDef | AOEInternal): AOEInternal;
}

/// =========================================================
///                 Entity | EntitySnapshot
///

export interface CharStats {
    // Static stats
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    precision: number;
    wisdom: number;
    level: number;
    // Dynamic stats
    health: number;
}

export interface EntityIn extends CharStats {
    effects: any[];
}

export interface EntityOut {
    damages: number;
    effects: (any) => void;
}

// The fields of EntitySnapshotIn are the same as EntityIn, but
// at a previous point in time
// Current gives access to the current stats of the caster, if
// he is still alive / hasn't left the map
export interface EntitySnapshotIn extends EntityIn {
    current?: EntityIn;
}

// EntitySnapshot is read-only, except for the `current` field
// which can be used to act on the caster, if he is still alive
// and hasn't left the map
export interface EntitySnapshotOut {
    current?: EntityOut;
}

/// =========================================================
///                 Lycan API
///

export interface Lycan {
    // Nothing at the moment.
}

export type LycanIn = Lycan & {
    // TODO:
    effects: any[];
};
export type LycanOut = Lycan & {
    spawn: (aoe_or_proj: ProjectileInternal | AOEInternal) => void;
};

/// =========================================================
///                 Various props
///

export interface Position {
    x: number;
    y: number;
}

export interface Disc {
    disc: { radius: number };
}

export interface Square {
    square: { side: number };
}

export type Shape = Disc | Square;
