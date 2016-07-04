import {Projectile, AOE} from '../models/spell';

// I wish we had rust enums...
// Only one of the following property will be there.
export interface Delta {
  spawn_aoe?: AOE;
  spawn_projectile?: Projectile;
}
