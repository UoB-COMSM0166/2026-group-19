class PathingSystem extends System {
   constructor(ecs) {
         super(ecs);
         this.floatingEnemyStrength = EnemyConfig[EnemyType.FLOATING].forceStrength; // adjust this to control speed of floating enemies
   }

   update() {
      // Find the player
      const players = this.ecs.getEntitiesWith(Player, Position);
      if (players.length === 0) return; // No player found

     const playerId = players[0];
     const playerPos = this.ecs.getComponent(playerId, Position);

     // Find floating enemies and update their force toward player
     const floatingEnemies = this.ecs.getEntitiesWith(Enemy, Position, Force);
     for (let enemyId of floatingEnemies) {
         const enemy = this.ecs.getComponent(enemyId, Enemy);
         if (enemy.type !== EnemyType.FLOATING) continue;
      // we only apply pathing to floating enemies
         const enemyPos = this.ecs.getComponent(enemyId, Position);
         const force = this.ecs.getComponent(enemyId, Force);

         // Calculate direction from enemy to player
         const dx = playerPos.x - enemyPos.x;
         const dy = playerPos.y - enemyPos.y;
            
         // Normalize and apply force (adjust strength as needed)
         const distance = Math.sqrt(dx * dx + dy * dy);

         if (distance > 0) {
            force.fx = (dx / distance) * this.floatingEnemyStrength;
            force.fy = (dy / distance) * this.floatingEnemyStrength;
         }
      }
   }
}
