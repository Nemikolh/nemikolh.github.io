import {SpellSpec} from '../spec';

export const sparkOfApoc: SpellSpec = {
    name: 'Spark of apocalypse',
    uuid: '2',
    description: `A tiny spark can make a really big fire.
                  Sometimes it trigger the unexpected`,
    cost: 100,
    definitions: {
        projectile: {
            'spark': {
                direction: Math.PI / 2,
                speed: 2.5,
                range: 5,
                hitbox: {
                    disc: { radius: 0.25 }
                },
                on_hit: (in_, out) => {
                    out.$lycan.spawn(in_.$spells.projectile['spark'](in_.$self));
                },
                on_end_range: (in_, out) => {
                    let seed = Math.random() * Math.PI * 2;

                    for (let i = 0; i < 10; i+=2) {
                        out.$lycan.spawn(in_.$spells.projectile['apocalypse']({
                            direction: seed + Math.PI * 2 * i / 10,
                            speed: 2,
                            range: 4,
                            hitbox: { disc: { radius:0.5 } },
                        }, in_.$self));
                        out.$lycan.spawn(in_.$spells.projectile['apocalypse']({
                            direction: seed + Math.PI * 2 * i / 10,
                            speed: 2.5,
                            range: 5,
                            hitbox: { disc: { radius:0.5 } },
                        }, in_.$self));
                    }
                }
            },
            'apocalypse': {
                direction: 0,
                speed: 2,
                range: 4,
                hitbox: {
                    disc: { radius: 0.5 }
                },
                on_hit: (in_, out) => {
                    out.$target.damages -= in_.$caster.intelligence * 1.5 + 3;
                    let seed = Math.random() * Math.PI * 2;
                    out.$lycan.spawn(in_.$spells.projectile['apocalypse']({
                        direction: seed + Math.PI / 2,
                        speed: 2,
                        range: 4,
                        hitbox: { disc: { radius: 0.1875 } },
                    }, in_.$self));
                    out.$lycan.spawn(in_.$spells.projectile['apocalypse']({
                        direction: seed + Math.PI,
                        speed: 2,
                        range: 5,
                        hitbox: { disc: { radius: 0.1875 } },
                    }, in_.$self));
                },
                on_end_range: () => {}
            }
        },
        aoe: {}
    },
    on_end_cast: [
        (in_, out) => {
            // TODO: Better way of referencing directly something in definitions?
            out.$lycan.spawn(in_.$spells.projectile['spark']());
        }
    ],
    on_start_cast: [],
    on_cast_failure: []
};
