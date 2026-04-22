//White-box tests for ECS


const { ECS } = require('../src/ecs/ecs.js');

// Minimal stub component classes — named so assertions read clearly
class Health { constructor(v) { this.value = v; } }
class Position { constructor(x, y) { this.x = x; this.y = y; } }
class Enemy {}

//createEntity 

describe('ECS.createEntity', () => {
    test('first id is 0', () => {
        const ecs = new ECS();
        expect(ecs.createEntity()).toBe(0);
    });

    test('ids increment by 1 each call', () => {
        const ecs = new ECS();
        expect(ecs.createEntity()).toBe(0);
        expect(ecs.createEntity()).toBe(1);
        expect(ecs.createEntity()).toBe(2);
    });

    test('nextEntityId tracks the next id to be issued', () => {
        const ecs = new ECS();
        ecs.createEntity();
        ecs.createEntity();
        // nextEntityId is the *next* id — it should be 2 after two calls
        expect(ecs.nextEntityId).toBe(2);
    });
});

//addComponent / getComponent

describe('ECS.addComponent / getComponent', () => {
    test('getComponent returns the exact instance that was added', () => {
        const ecs = new ECS();
        const id = ecs.createEntity();
        const hp = new Health(10);
        ecs.addComponent(id, hp);
        expect(ecs.getComponent(id, Health)).toBe(hp);
    });

    test('adding a component creates a new class entry in the internal Map', () => {
        const ecs = new ECS();
        expect(ecs.components.has(Health)).toBe(false);
        const id = ecs.createEntity();
        ecs.addComponent(id, new Health(5));
        expect(ecs.components.has(Health)).toBe(true);
    });

    test('entity id is stored as the key inside the component class Map', () => {
        const ecs = new ECS();
        const id = ecs.createEntity();
        ecs.addComponent(id, new Health(3));
        expect(ecs.components.get(Health).has(id)).toBe(true);
    });

    test('getComponent returns null for a component the entity does not have', () => {
        const ecs = new ECS();
        const id = ecs.createEntity();
        expect(ecs.getComponent(id, Position)).toBeNull();
    });

    test('different entities store independent components of the same class', () => {
        const ecs = new ECS();
        const a = ecs.createEntity();
        const b = ecs.createEntity();
        ecs.addComponent(a, new Health(5));
        ecs.addComponent(b, new Health(99));
        expect(ecs.getComponent(a, Health).value).toBe(5);
        expect(ecs.getComponent(b, Health).value).toBe(99);
    });

    test('replacing a component overwrites the previous instance', () => {
        const ecs = new ECS();
        const id = ecs.createEntity();
        ecs.addComponent(id, new Health(1));
        const updated = new Health(50);
        ecs.addComponent(id, updated);
        expect(ecs.getComponent(id, Health)).toBe(updated);
    });
});

//removeComponent

describe('ECS.removeComponent', () => {
    test('component is no longer retrievable after removal', () => {
        const ecs = new ECS();
        const id = ecs.createEntity();
        ecs.addComponent(id, new Health(10));
        ecs.removeComponent(id, Health);
        expect(ecs.getComponent(id, Health)).toBeUndefined();
    });

    test('removing a non-existent component does not throw', () => {
        const ecs = new ECS();
        const id = ecs.createEntity();
        expect(() => ecs.removeComponent(id, Health)).not.toThrow();
    });
});

//removeEntity

describe('ECS.removeEntity', () => {
    test('removes the entity from every component map it appears in', () => {
        const ecs = new ECS();
        const id = ecs.createEntity();
        ecs.addComponent(id, new Health(5));
        ecs.addComponent(id, new Position(0, 0));
        ecs.addComponent(id, new Enemy());

        ecs.removeEntity(id);

        expect(ecs.components.get(Health).has(id)).toBe(false);
        expect(ecs.components.get(Position).has(id)).toBe(false);
        expect(ecs.components.get(Enemy).has(id)).toBe(false);
    });

    test('other entities are unaffected when one is removed', () => {
        const ecs = new ECS();
        const a = ecs.createEntity();
        const b = ecs.createEntity();
        ecs.addComponent(a, new Health(1));
        ecs.addComponent(b, new Health(2));

        ecs.removeEntity(a);

        expect(ecs.getComponent(b, Health).value).toBe(2);
    });
});

//getEntitiesWith

describe('ECS.getEntitiesWith', () => {
    test('returns empty array when no components have been registered', () => {
        const ecs = new ECS();
        expect(ecs.getEntitiesWith(Health)).toEqual([]);
    });

    test('returns empty array when called with no arguments', () => {
        const ecs = new ECS();
        ecs.createEntity();
        expect(ecs.getEntitiesWith()).toEqual([]);
    });

    test('returns only entities that have ALL requested components (intersection)', () => {
        const ecs = new ECS();
        const onlyHealth = ecs.createEntity();
        const both       = ecs.createEntity();

        ecs.addComponent(onlyHealth, new Health(1));
        ecs.addComponent(both,       new Health(2));
        ecs.addComponent(both,       new Enemy());

        const result = ecs.getEntitiesWith(Health, Enemy);
        expect(result).toContain(both);
        expect(result).not.toContain(onlyHealth);
    });

    test('returns all entities that have a single requested component', () => {
        const ecs = new ECS();
        const a = ecs.createEntity();
        const b = ecs.createEntity();
        ecs.addComponent(a, new Health(1));
        ecs.addComponent(b, new Health(2));

        expect(ecs.getEntitiesWith(Health)).toEqual(expect.arrayContaining([a, b]));
    });

    test('does not return entities whose component was removed', () => {
        const ecs = new ECS();
        const id = ecs.createEntity();
        ecs.addComponent(id, new Health(5));
        ecs.removeComponent(id, Health);
        expect(ecs.getEntitiesWith(Health)).not.toContain(id);
    });
});

//clear

describe('ECS.clear', () => {
    test('resets nextEntityId to 0', () => {
        const ecs = new ECS();
        ecs.createEntity();
        ecs.createEntity();
        ecs.clear();
        expect(ecs.nextEntityId).toBe(0);
    });

    test('empties the components Map so no component data remains', () => {
        const ecs = new ECS();
        const id = ecs.createEntity();
        ecs.addComponent(id, new Health(5));
        ecs.clear();
        expect(ecs.components.size).toBe(0);
    });

    test('ids issued after clear restart from 0', () => {
        const ecs = new ECS();
        ecs.createEntity();
        ecs.createEntity();
        ecs.clear();
        expect(ecs.createEntity()).toBe(0);
    });
});
