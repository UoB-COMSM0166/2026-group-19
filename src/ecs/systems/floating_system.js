/**
 * Controls the movement of floating enemies, steering them toward the player
 * when within range and reverting to passive drift when out of range.
 */
class FloatingSystem extends System {
    constructor(ecs) {
        super(ecs);
        this.physics = defaults.physics;
    }

    applyPhysics(physics) {
        this.physics = physics;
    }

    /**
     * For each floating enemy, applies directional acceleration toward the player when
     * within half the screen height. When a previously in-range enemy moves out of range,
     * acceleration is cleared and a random horizontal drift velocity is assigned.
     */
    update(dt) {
        const player_ids = this.ecs.getEntitiesWith(Player, Position);

        // Only supports a single player; behaviour is undefined with multiple players.
        if (player_ids.length !== 1) return;
        const playerPos = this.ecs.getComponent(player_ids[0], Position);

        const floatingEnemyIds = this.ecs.getEntitiesWith(Floating, Enemy, Acceleration, Position, Velocity);
        for (let enemyId of floatingEnemyIds) {
            const enemyPos = this.ecs.getComponent(enemyId, Position);
            const enemyVel = this.ecs.getComponent(enemyId, Velocity);
            const enemyAcc = this.ecs.getComponent(enemyId, Acceleration);
            const float = this.ecs.getComponent(enemyId, Floating);

            const dx = playerPos.x - enemyPos.x;
            const dy = playerPos.y - enemyPos.y;
            const dist = Math.hypot(dx, dy);
            if (dist === 0) continue;

            if (dist <= window.innerHeight / 2) {
                enemyAcc.ax = (dx / dist) * this.physics.floatingEnemyAccel;
                enemyAcc.ay = (dy / dist) * this.physics.floatingEnemyAccel;
                float.wasInRange = true;
            }
            else if (float.wasInRange) {
                enemyAcc.ax = 0;
                enemyAcc.ay = this.physics.gravity / 5;
                enemyVel.vx = this.physics.enemySpeed * (Math.random() < 0.5 ? -1 : 1)
                float.wasInRange = false;
            }
        }
    }
}