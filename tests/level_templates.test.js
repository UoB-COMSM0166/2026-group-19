// White-box tests for LevelTemplates


const { LevelTemplates } = require('../src/config/level_templates.js');

const GRID_COLS = 32;
const GRID_ROWS = 18;
const levelIds = Object.keys(LevelTemplates).map(Number);

//top-level

describe('LevelTemplates — top-level structure', () => {
    test('at least one level is defined', () => {
        expect(levelIds.length).toBeGreaterThan(0);
    });

    test.each(levelIds)('level %i has a player spawn point', (id) => {
        expect(LevelTemplates[id]).toHaveProperty('player');
    });

    test.each(levelIds)('level %i has a platforms array', (id) => {
        expect(Array.isArray(LevelTemplates[id].platforms)).toBe(true);
    });

    test.each(levelIds)('level %i has at least one platform', (id) => {
        expect(LevelTemplates[id].platforms.length).toBeGreaterThan(0);
    });
});

//player spawn coordinates

describe('LevelTemplates — player spawn coordinates within grid bounds', () => {
    test.each(levelIds)('level %i player.x is within [0, GRID_COLS)', (id) => {
        const { x } = LevelTemplates[id].player;
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThan(GRID_COLS);
    });

    test.each(levelIds)('level %i player.y is within [0, GRID_ROWS)', (id) => {
        const { y } = LevelTemplates[id].player;
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThan(GRID_ROWS);
    });
});


describe('LevelTemplates — platform geometry', () => {
    test.each(levelIds)('level %i: every platform has x0, y0, x1, y1, spawnable', (id) => {
        for (const p of LevelTemplates[id].platforms) {
            expect(p).toHaveProperty('x0');
            expect(p).toHaveProperty('y0');
            expect(p).toHaveProperty('x1');
            expect(p).toHaveProperty('y1');
            expect(p).toHaveProperty('spawnable');
        }
    });

    test.each(levelIds)('level %i: x1 >= x0 for all platforms', (id) => {
        for (const p of LevelTemplates[id].platforms) {
            expect(p.x1).toBeGreaterThanOrEqual(p.x0);
        }
    });

    test.each(levelIds)('level %i: y1 >= y0 for all platforms', (id) => {
        for (const p of LevelTemplates[id].platforms) {
            expect(p.y1).toBeGreaterThanOrEqual(p.y0);
        }
    });

    test.each(levelIds)('level %i: all platform coordinates are within grid bounds', (id) => {
        for (const p of LevelTemplates[id].platforms) {
            expect(p.x0).toBeGreaterThanOrEqual(0);
            expect(p.x1).toBeLessThanOrEqual(GRID_COLS);
            expect(p.y1).toBeLessThanOrEqual(GRID_ROWS);
        }
    });

    test.each(levelIds)('level %i: spawnable is a boolean', (id) => {
        for (const p of LevelTemplates[id].platforms) {
            expect(typeof p.spawnable).toBe('boolean');
        }
    });
});
