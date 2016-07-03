
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
    $self: Projectile;
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
    $self: Projectile;
    $lycan: LycanIn;
  }, out_: {
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
  // If present, inherits from the following properties
  // * range
  // XXX: Local storage probably
  (inherit_from?: Projectile): ProjectileWithScript;
}

export interface AOECtor {
  // If present, inherits from ... what?
  (inherit_from?: AOE): AOEWithScript;
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
  damages: (number) => void;
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
  spawn: (aoe_or_proj: ProjectileWithScript | AOEWithScript) => void;
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
