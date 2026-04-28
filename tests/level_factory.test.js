// Tests for LevelFactory

const { LevelFactory, GRID_COLS, GRID_ROWS } = require('../src/config/level_factory.js');

describe('LevelFactory.scaleX', () => {
    test('col 0 always maps to pixel 0', () => {
        expect(LevelFactory.scaleX(0, 800)).toBe(0);
    });

    test('col GRID_COLS maps to the full canvas width', () => {
        expect(LevelFactory.scaleX(GRID_COLS, 800)).toBe(800);
    });

    test('col 16 (halfway) maps to half the canvas width', () => {
        expect(LevelFactory.scaleX(16, 800)).toBe(400);
    });

    test('result scales linearly with canvas width', () => {
        expect(LevelFactory.scaleX(8, 640)).toBe(160); // 8/32 * 640
    });
});

describe('LevelFactory.scaleY', () => {
    test('row 0 always maps to pixel 0', () => {
        expect(LevelFactory.scaleY(0, 600)).toBe(0);
    });

    test('row GRID_ROWS maps to the full canvas height', () => {
        expect(LevelFactory.scaleY(GRID_ROWS, 600)).toBe(600);
    });

    test('row 9 (halfway) maps to half the canvas height', () => {
        expect(LevelFactory.scaleY(9, 600)).toBe(300);
    });

    test('result scales linearly with canvas height', () => {
        expect(LevelFactory.scaleY(6, 720)).toBe(240); // 6/18 * 720
    });
});

describe('LevelFactory.buildWalls', () => {
    const W = 640;
    const H = 360;

    test('a 1-cell-wide platform at grid x0=0,x1=0 has pixel width of one grid cell', () => {
        const walls = LevelFactory.buildWalls([{ x0: 0, y0: 0, x1: 0, y1: 0, spawnable: false }], W, H);
        // width = scaleX(x1 + 1 - x0, W) = scaleX(1, 640) = 20
        expect(walls[0].width).toBe(Math.round(LevelFactory.scaleX(1, W)));
    });

    test('left_x of a wall starting at grid col 4 is the correct pixel offset', () => {
        const walls = LevelFactory.buildWalls([{ x0: 4, y0: 0, x1: 8, y1: 0, spawnable: false }], W, H);
        expect(walls[0].left_x).toBe(Math.round(LevelFactory.scaleX(4, W)));
    });

    test('top_y of a wall starting at grid row 2 is the correct pixel offset', () => {
        const walls = LevelFactory.buildWalls([{ x0: 0, y0: 2, x1: 0, y1: 4, spawnable: false }], W, H);
        expect(walls[0].top_y).toBe(Math.round(LevelFactory.scaleY(2, H)));
    });

    test('spawnable flag is preserved on the wall output', () => {
        const walls = LevelFactory.buildWalls([{ x0: 0, y0: 0, x1: 1, y1: 1, spawnable: true }], W, H);
        expect(walls[0].spawnable).toBe(true);
    });

    test('y0 grid coordinate is preserved on the wall output (used for bottom-boundary detection)', () => {
        const walls = LevelFactory.buildWalls([{ x0: 0, y0: 17, x1: 13, y1: 17, spawnable: false }], W, H);
        expect(walls[0].y0).toBe(17);
    });

    test('a multi-cell platform has pixel width proportional to its cell span', () => {
        // 4 columns wide (x0=2, x1=5 → span = 5+1-2 = 4 cells)
        const walls = LevelFactory.buildWalls([{ x0: 2, y0: 0, x1: 5, y1: 0, spawnable: false }], W, H);
        expect(walls[0].width).toBe(Math.round(LevelFactory.scaleX(4, W)));
    });

    test('converts all platforms in one call', () => {
        const platforms = [
            { x0: 0, y0: 0, x1: 5, y1: 0, spawnable: false },
            { x0: 10, y0: 5, x1: 15, y1: 5, spawnable: true },
        ];
        const walls = LevelFactory.buildWalls(platforms, W, H);
        expect(walls).toHaveLength(2);
    });
});

describe('LevelFactory.build', () => {
    const baseTemplate = {
        player: { x: 4, y: 14 },
        platforms: [{ x0: 0, y0: 17, x1: 31, y1: 17, spawnable: false }],
    };

    beforeEach(() => {
        global.width = 640;
        global.height = 360;
        global.defaults = {
            physics: {
                gravity: 1, playerSpeed: 1, playerAcceleration: 1,
                enemySpeed: 1, maxEnemySpeed: 1, jumpSpeed: 1,
                terminalVelocity: 1, floatingEnemyAccel: 1,
                floatingEnemyBounce: 1, minBloodSpeed: 1,
                maxBloodSpeed: 1, projectileKnockback: 1,
            },
            difficulty: {
                normal: { physics: {}, playerHealth: 100, enemyHealth: 50, largeEnemyHealth: 200 },
                hard:   { physics: { gravity: 2 }, playerHealth: 75, enemyHealth: 75, largeEnemyHealth: 300 },
            },
        };
    });

    afterEach(() => {
        delete global.width;
        delete global.height;
        delete global.defaults;
    });

    test('returns correct health values for normal difficulty', () => {
        const level = LevelFactory.build(baseTemplate, 'normal');
        expect(level.health.player).toBe(100);
        expect(level.health.enemy).toBe(50);
        expect(level.health.largeEnemy).toBe(200);
    });

    // Branch: default parameter — calling build() with no difficultyKey uses "normal"
    test('defaults to normal difficulty when difficultyKey is omitted', () => {
        const level = LevelFactory.build(baseTemplate);
        expect(level.health.player).toBe(100);
    });

    // Branch 1 (false side of ||): unknown difficultyKey falls back to defaults.difficulty.normal
    test('falls back to normal difficulty when difficultyKey is unrecognised', () => {
        const level = LevelFactory.build(baseTemplate, 'unknown');
        expect(level.health.player).toBe(100);
    });

    test('uses hard difficulty settings when difficultyKey is "hard"', () => {
        const level = LevelFactory.build(baseTemplate, 'hard');
        expect(level.health.player).toBe(75);
    });

    // Branch 2 (true side of ||): template.physics is provided and merges into physics
    test('template.physics overrides default physics when provided', () => {
        const templateWithPhysics = { ...baseTemplate, physics: { gravity: 5 } };
        const level = LevelFactory.build(templateWithPhysics, 'normal');
        expect(level.physics.gravity).toBe(LevelFactory.scaleY(5, 360));
    });

    // Branch 2 (false side of ||): template.physics is absent, uses {} so defaults are unchanged
    test('default physics are used when template.physics is not provided', () => {
        const level = LevelFactory.build(baseTemplate, 'normal');
        expect(level.physics.gravity).toBe(LevelFactory.scaleY(1, 360));
    });

    test('player position is scaled from grid coordinates', () => {
        const level = LevelFactory.build(baseTemplate, 'normal');
        expect(level.player.center_x).toBe(LevelFactory.scaleX(4.5, 640));
        expect(level.player.center_y).toBe(LevelFactory.scaleY(14.5, 360));
    });

    test('walls array matches the template platforms', () => {
        const level = LevelFactory.build(baseTemplate, 'normal');
        expect(level.walls).toHaveLength(1);
    });
});
