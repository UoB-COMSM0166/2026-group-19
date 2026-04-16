const defaults = {
    physics: {
        gravity: 0.035,
        playerSpeed: 0.2,
        playerAcceleration: 0.04,
        jumpSpeed: 0.65,
        enemySpeedMultiplier: 2,
        terminalVelocity: 0.35,
        playerDampingMultiplier: 0.70,
        floatingEnemyAccel: 0.002,
        floatingEnemyBounce: 0.15,
        spawnWeights: {
            normal: 0.4,
            large: 0.3,
            floating: 0.3
        },
        dropletsPerDeath: 12,
        minBloodSpeed: 0.2,
        maxBloodSpeed: 0.6,
        projectileKnockback: 0.35
    },
    sizes: {
        player:     { width: 0.8, height: 0.8 },
        enemy:      { width: 0.8, height: 0.8 },
        largeEnemy: { width: 1.2, height: 1.2 },
        box:        { width: 0.7, height: 0.7 },
        blood:      { width: 0.2, height: 0.2 }
    },
    hurtTime: 280,
    spawnStartDelay: 3 * 60,
    difficulty: {
        normal: {
            physics: {
                spawnRate: 240,
                enemySpeed: 0.07,
                maxEnemySpeed: 0.14
            },
            playerHealth: 5,
            enemyHealth: 1,
            largeEnemyHealth: 3
        },
        hard: {
            physics: {
                spawnRate: 180,
                enemySpeed: 0.1,
                maxEnemySpeed: 0.2,
            },
            playerHealth: 3,
            enemyHealth: 2,
            largeEnemyHealth: 5
        }
    },
    controls: {
        arrows: {
            left: 37,  // LEFT_ARROW
            right: 39, // RIGHT_ARROW
            up: 38,    // UP_ARROW
            shoot: 32  // SPACE
        },
        wasd: {
            left: 65,  // A
            right: 68, // D
            up: 87,    // W
            shoot: 13  // ENTER
        }
    }
};
