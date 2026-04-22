// White-box tests for Position component


const { Position } = require('../src/ecs/components/physics/position.js');

describe('Position constructor', () => {
    test('stores x, y, width, height exactly as given', () => {
        const p = new Position(10, 20, 4, 6);
        expect(p.x).toBe(10);
        expect(p.y).toBe(20);
        expect(p.width).toBe(4);
        expect(p.height).toBe(6);
    });
});

describe('Position.getBoundingBox — centre-to-AABB conversion', () => {
    test('left_x is x minus half the width', () => {
        const p = new Position(10, 0, 4, 0);
        expect(p.getBoundingBox().left_x).toBe(8); // 10 - 4/2
    });

    test('top_y is y minus half the height', () => {
        const p = new Position(0, 20, 0, 6);
        expect(p.getBoundingBox().top_y).toBe(17); // 20 - 6/2
    });

    test('bounding box width matches position width', () => {
        const p = new Position(0, 0, 12, 8);
        expect(p.getBoundingBox().w).toBe(12);
    });

    test('bounding box height matches position height', () => {
        const p = new Position(0, 0, 12, 8);
        expect(p.getBoundingBox().h).toBe(8);
    });

    test('entity at origin with size 2×2 has bounding box at (-1, -1)', () => {
        const p = new Position(0, 0, 2, 2);
        const bb = p.getBoundingBox();
        expect(bb.left_x).toBe(-1);
        expect(bb.top_y).toBe(-1);
    });

    test('non-square entity: left_x and top_y are independent', () => {
        const p = new Position(100, 50, 20, 10);
        const bb = p.getBoundingBox();
        expect(bb.left_x).toBe(90);  // 100 - 20/2
        expect(bb.top_y).toBe(45);   // 50  - 10/2
    });

    test('odd dimensions: fractional centre is preserved', () => {
        const p = new Position(5, 5, 3, 3);
        const bb = p.getBoundingBox();
        expect(bb.left_x).toBe(3.5); // 5 - 1.5
        expect(bb.top_y).toBe(3.5);
    });
});
