import {SpellSpec} from '../spec';

export const fireball: SpellSpec = {
    name: 'Fireball light',
    uuid: '1',
    description: `Launch a fireball in a specific direction
                  that hits everything it touch`,
    cost: ($caster) => $caster.intelligence * 2 + 10,
    definitions: {
        'fireball': {
            direction: 0,
            speed: 1.5,
            range: 8,
            hitbox: {
                disc: { radius: 0.5 }
            },
            on_hit: (in_, out) => {
                out.$target.damages -= in_.$caster.intelligence * 1.5 + 3;
                out.$lycan.spawn(in_.$spells['fireball'](in_.$self));
            }
        }
    },
    on_end_cast: [],
    on_start_cast: [],
    on_cast_failure: []
};
