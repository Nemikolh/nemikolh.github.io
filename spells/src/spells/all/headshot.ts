import {SpellSpec} from '../spec';

export const headshot: SpellSpec = {
    name: 'Headshot',
    uuid: '3',
    description: `Instantly kill your target`,
    cost: 20,
    definitions: {
        projectile: {
            'headshot': {
                direction: Math.PI / 2,
                speed: 1.5,
                range: 8,
                hitbox: {
                    disc: { radius: 0.5 }
                },
                on_hit: (in_, out) => {
                    out.$target.damages += in_.$target.health;
                },
                on_end_range: () => {}
            },
        },
        aoe: {}
    },
    on_end_cast: [
        (in_, out) => {
            // TODO: Better way of referencing directly something in definitions?
            out.$lycan.spawn(in_.$spells.projectile['headshot']());
        }
    ],
    on_start_cast: [],
    on_cast_failure: []
};
