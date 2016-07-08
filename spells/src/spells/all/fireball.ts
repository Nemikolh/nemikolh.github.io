import {SpellSpec} from '../spec';

export const fireball: SpellSpec = {
    name: 'Fireball light',
    uuid: '1',
    description: `Launch a fireball in a specific direction
                  that hits everything it touch and when destroyed
                  through 4 particles in 4 different directions that
                  don't do any damages`,
    cost: ($caster) => $caster.intelligence * 2 + 10,
    definitions: {
        projectile: {
            'fireball': {
                direction: Math.PI / 2,
                speed: 1.5,
                range: 8,
                hitbox: {
                    disc: { radius: 0.5 }
                },
                on_hit: (in_, out) => {
                    out.$target.damages += in_.$caster.intelligence * 1.5 + 3;
                    out.$lycan.spawn(in_.$spells.projectile['fireball'](in_.$self));
                },
                on_end_range: (in_, out) => {
                    let seed = Math.random() * Math.PI * 2;
                    out.$lycan.spawn(in_.$spells.projectile['particle']({
                        direction: seed + Math.PI / 2,
                        range: 2, // Shame that we have to specify that as well
                    }, in_.$self));
                    out.$lycan.spawn(in_.$spells.projectile['particle']({
                        direction: seed + Math.PI,
                        range: 2,
                    }, in_.$self));
                    out.$lycan.spawn(in_.$spells.projectile['particle']({
                        direction: seed + Math.PI + Math.PI / 2,
                        range: 2,
                    }, in_.$self));
                    out.$lycan.spawn(in_.$spells.projectile['particle']({
                        direction: seed + Math.PI * 2,
                        range: 2,
                    }, in_.$self));
                }
            },
            'particle': {
                direction: 0,
                speed: 2,
                range: 2,
                hitbox: {
                    disc: { radius: 0.25 }
                },
                on_hit: (in_, out) => {
                    out.$lycan.spawn(in_.$spells.projectile['particle'](in_.$self));
                },
                on_end_range: () => {}
            }
        },
        aoe: {}
    },
    on_end_cast: [
        (in_, out) => {
            // TODO: Better way of referencing directly something in definitions?
            out.$lycan.spawn(in_.$spells.projectile['fireball']());
        }
    ],
    on_start_cast: [],
    on_cast_failure: []
};
