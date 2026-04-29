/**
 * Core ECS (Entity Component System) manager.
 *
 * Entities are plain integer IDs. Components are data objects keyed by their
 * class. Systems hold behaviour and are updated each frame in registration order.
 *
 * Internal storage layout:
 *   components: Map<ComponentClass, Map<entityId, componentInstance>>
 *
 * Example:
 *   Position -> Map { 0 => Position {x:50, y:100}, 1 => Position {x:300, y:200} }
 *   Velocity -> Map { 0 => Velocity {vx:1, vy:0},  1 => Velocity {vx:-1, vy:0} }
 *   Player   -> Map { 0 => Player {} }
 *   Enemy    -> Map { 1 => Enemy {} }
 */
class ECS {
    constructor() {
        this.nextEntityId = 0;
        this.components = new Map();
        this.systems = null;
    }

    /**
     * Calls update(dt) on every registered system in order.
     */
    update(dt) {
        for (let system of this.systems) {
            system.update(dt);
        }
    }

    /**
     * Allocates a new unique entity ID.
     */
    createEntity() {
        return this.nextEntityId++;
    }

    /**
     * Removes all components belonging to the given entity, effectively destroying it.
     */
    removeEntity(entityID) {
        for (let compMap of this.components.values()) {
            compMap.delete(entityID);
        }
    }

    /**
     * Attaches a component to an entity. The component's class is used as the map key,
     * so only one component of each type can exist per entity.
     */
    addComponent(entityId, component) {
        const compClass = component.constructor;
        if (!this.components.has(compClass)) {
            this.components.set(compClass, new Map());
        }
        this.components.get(compClass).set(entityId, component);
    }

    /**
     * Removes a single component type from an entity. No-ops if the entity
     * does not have that component.
     */
    removeComponent(entityID, compClass) {
        const compMap = this.components.get(compClass);
        if (compMap) {
            compMap.delete(entityID);
        }
    }

    /**
     * Returns the component instance of the given class for an entity,
     * or null if the entity does not have that component.
     */
    getComponent(entityId, compClass) {
        const compMap = this.components.get(compClass);
        return compMap ? compMap.get(entityId) : null;
    }

    /**
     * Returns all entity IDs that have every one of the specified component classes.
     * Uses the first component's entity set as the candidate list, then filters
     * against the remaining classes.
     */
    getEntitiesWith(...compClasses) {
        const componentMaps = compClasses.map(compClass =>
            this.components.get(compClass) || new Map()
        );

        if (componentMaps.length === 0) return [];

        const candidateEntityIds = [...componentMaps[0].keys()];
        const matchingEntityIds = candidateEntityIds.filter(entityId =>
            componentMaps.every(map => map.has(entityId))
        );
        return matchingEntityIds;
    }

    /**
     * Returns the first registered system that is an instance of the given class.
     */
    getSystem(systemClass) {
        return this.systems.find(s => s instanceof systemClass);
    }

    /**
     * Resets all components and entity IDs to an empty state. Used when loading a new level.
     */
    clear() {
        this.components.clear();
        this.nextEntityId = 0;
    }
}

if (typeof module !== 'undefined') module.exports = { ECS };
