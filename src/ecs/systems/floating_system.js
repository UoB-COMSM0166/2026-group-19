class FloatingSystem extends System {
    constructor(ecs) {
        super(ecs);
        this.physics = defaults.physics;
    }

    applyPhysics(physics) {
        this.physics = physics;
    }  

    update(dt) {
        const player_ids = this.ecs.getEntitiesWith(Player, Position);
        
        // Assuming only 1 player now, if we add more players in future this will have to change
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