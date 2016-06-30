
export interface SpellSpec {
  // Meta
  name?: string;
  uuid?: string;
  description?: string;
  // Properties
  cost: number | SpellCost;
  definitions: {
    [spell_name: string]: SpellDef
  };
  on_start_cast: SpellEffect[];
  on_end_cast: SpellEffect[];
  on_cast_failure: SpellEffectFailure[];
}

/// =========================================================
///                 Projectiles and AOEs
///

export type SpellDef = ProjectileWithScript | AOEWithScript;

export interface Projectile {
    direction: string | number;
    // In tiles / seconds
    speed: number;
    // In tiles
    range: number;
    hitbox: Shape;
}

export interface ProjectileWithScript extends Projectile {
    on_hit: SpellEffectOnHit;
}

export interface AOE {
    hitbox: Shape;
    position: Position;
}

export interface AOEWithScript extends AOE {
    // TODO
}

/// =========================================================
///                 Aariba Script part
///

export interface SpellCost {
    ($caster: EntityIn): number;
}

export interface SpellEffect {
    (in_: {
        $caster: EntityIn;
        $interrupt: Interrupt;
        $spells: {
            [spell_name: string]: SpellCtor
        };
        $lycan: LycanIn;
    }, out: {
        $caster: EntityOut;
        $lycan: LycanOut;
    }): void;
}

export interface SpellEffectOnHit {
    (in_: {
        $caster: EntityIn;
        $target: EntityIn;
        $self: Projectile;
        $spells: {
            [spell_name: string]: SpellCtor
        };
        $lycan: LycanIn;
    }, out: {
        $caster: EntityOut;
        $target: EntityOut;
        $lycan: LycanOut;
    }): void;
}

export interface SpellEffectFailure {
  (in_: any, out: any): void;
}

export interface Interrupt { (): void; }

export interface SpellCtor {
   (inherit_from: AOE | Projectile): AOE | Projectile;
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
    // Dynmaic stats
    health: number;
}

export type EntityIn = CharStats & { current?: CharStats };
export type EntityOut = CharStats & {
    damages: number;
};

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
  spawn: (aoe_or_proj: Projectile | AOE) => void;
};

/// =========================================================
///                 Various props
///

export interface Position {
  x: number;
  y: number;
}

export type Shape = {
  disc: { radius: number }
} | {
  square: { side: number }
}
