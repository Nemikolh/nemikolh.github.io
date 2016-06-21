
export interface Spell {
  // Meta
  name?: string;
  uuid?: string;
  description?: string;
  // Properties
  cost: number;
  definitions: {
    [spell_name: string]: SpellDef
  };
  on_start_cast: SpellEffect[];
  on_end_cast: SpellEffect[];
  on_cast_failure: SpellEffectFailure[];
}

export type SpellDef = (Projectile & {
  on_hit: any;
}) | (AOE & {
  // TODO: AOE effects
});

export interface Projectile {
  direction: string | number;
  speed: number;
  range: number;
  hitbox: Shape;
}

export interface AOE {
  shape: Shape;
  position: Position;
}

/// =========================================================
///                 Aariba Script part
///

export interface SpellEffect {
  (in_: {
    $caster: EntityIn;
    $interrupt: Interrupt;
    $spell: SpellCtor;
    $lycan: LycanIn;
  }, out: {
    $caster: EntityOut;
    $lycan: LycanOut;
  }): void;
}

export interface SpellEffectFailure {
  (in_: any, out: any): void;
}

export interface Interrupt { (): void; }

export type SpellInstance = AOE | Projectile;

export interface SpellCtor {
  [spell_name: string]: SpellInstance;
}

/// =========================================================
///                 Entity | EntitySnapshot
///

export interface CharStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  precision: number;
  wisdom: number;
  level: number;
}

export type EntityIn = CharStats & { current: CharStats };
export type EntityOut = CharStats;

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
