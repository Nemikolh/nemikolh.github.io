import {Projectile} from '../spells/spec';

// I wish we had rust enums...
// Only one of the following property will be there.
export interface Delta {
  remove_projectile?: string;
  spawn_projectile?: Projectile;
}
