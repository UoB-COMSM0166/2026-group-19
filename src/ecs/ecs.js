class ECS {
    constructor() {
        // In ECS design pattern, entities are simply an id. 
        this.nextEntityId = 0;

        // Map<componentClass, Map<entityId, componentInstance>>
        // Example of components map:
        //   this.components = {
        //      Position -> Map { 0 => Position {x: 50, y: 100}, 1 => Position {x: 300, y: 200} },
        //      Velocity -> Map { 0 => Velocity {dx: 1, dy: 0}, 1 => Velocity {dx: -1, dy: 0} },
        //      Player   -> Map { 0 => Player {} },
        //      Enemy    -> Map { 1 => Enemy {} }
        //   }

        // Potential optimization: Replace this hashmap datastructure with fixed sparse arrays
        this.components = new Map();
        this.systems = null;
    }

    update() {
        for (let system of this.systems) {
            system.update();
        }
    }

    createEntity() {
        return this.nextEntityId++;
    }

    removeEntity(entityID) {
        for (let compMap of this.components.values()) {
            compMap.delete(entityID);
        }
    }

    addComponent(entityId, component) {
        /*
        Adds a component to an entity
        */

        //.constructor returns a reference to the constructor function or class used to create the object.
        const compClass = component.constructor;

        if (!this.components.has(compClass)) {
            this.components.set(compClass, new Map());
        }
        this.components.get(compClass).set(entityId, component);
    }

    getComponent(entityId, compClass) {
        /*
        If the compClass exists in components, return the component object corresponding to the entityId
        */
        const compMap = this.components.get(compClass);
        return compMap ? compMap.get(entityId) : null;
    }

    getEntitiesWith(...compClasses) {
        /*
        Returns an array of all entityIds with the specified component clases
        ...compClasses is a rest parameter, it allows any number of component classes when calling the function
        For example, getEntitiesWith(Position, Velocity). This gets converted into a parameter compClasses = [Position, Velocity]
        */

        // In js, a null value behaves as false
        const componentMaps = compClasses.map(compClass =>
            this.components.get(compClass) || new Map()
        );

        if (componentMaps.length === 0) {
            return [];
        }

        // Look at what entities the first matching compClass has, then check those entities to see if they have the other compClasses too
        const candidateEntityIds = [...componentMaps[0].keys()];
        const matchingEntityIds = candidateEntityIds.filter(entityId =>
            componentMaps.every(map => map.has(entityId))
        );

        // Return the entities that have all requested components
        return matchingEntityIds;
    }

    getSystem(systemClass) {
        return this.systems.find(s => s instanceof systemClass);
    }

    // Reset the ECS to an empty state (used when loading a new level)
    clear() {
        this.components.clear();
        this.nextEntityId = 0;
    }
}