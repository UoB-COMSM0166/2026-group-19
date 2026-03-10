// src/config/level.js

const LevelData = {
    1: (() => {
        const W = window.innerWidth;
        const H = window.innerHeight;
        const T = 20; // wall thickness
        const holeWidth = W * 0.1; // 10% width for the door
        const holeStart = (W - holeWidth) / 2;

        return {
            player: {
                "pos": { center_x: W * 0.56, center_y: H * 0.08, width: 20, height: 20 },
                "size": { width: 20, height: 20 },
                "physics": {
                    GRAVITY: 0.5,
                    TERMINAL_VELOCITY: 25,
                    PLAYER_SPEED: 4,
                    JUMP_SPEED: 13,
                    SPAWN_RATE: 120,
                }
            },
            enemies: {
                "pos": [
                    { center_x: W * 0.5, center_y: H * 0.08, width: 20, height: 20 },
                    { center_x: W * 0.44, center_y: H * 0.08, width: 30, height: 30 }
                ],
                "size": { width: 20, height: 20 },
                "physics": {
                    GRAVITY: 0.5,
                    TERMINAL_VELOCITY: 25,
                    PLAYER_SPEED: 4,
                    ENEMY_SPEED: 4,
                    JUMP_SPEED: 13,
                    SPAWN_RATE: 120,
                }
            },
            walls: {
                "pos": [
                    // Outer boundaries with doors
                    { left_x: 0, top_y: H - T, width: holeStart, height: T }, // Bottom left
                    { left_x: holeStart + holeWidth, top_y: H - T, width: W - (holeStart + holeWidth), height: T }, // Bottom right
                    { left_x: 0, top_y: 0, width: holeStart, height: T }, // Top left
                    { left_x: holeStart + holeWidth, top_y: 0, width: W - (holeStart + holeWidth), height: T }, // Top right
                    { left_x: 0, top_y: 0, width: T, height: H }, // Left
                    { left_x: W - T, top_y: 0, width: T, height: H }, // Right

                    // Platforms
                    { left_x: W * 0.25, top_y: H * 0.25, width: W * 0.5, height: T, spawnable: true },
                    { left_x: W * 0.25, top_y: H * 0.75, width: W * 0.5, height: T, spawnable: true },
                    { left_x: 0, top_y: H * 0.5, width: W * 0.25, height: T, spawnable: true },
                    { left_x: W * 0.75, top_y: H * 0.5, width: W * 0.25, height: T, spawnable: true }
                ]
            },
            boxes: {
                "pos": { left_x: W * 0.77, top_y: H * 0.46, width: 20, height: 20 },
                "size": { width: 20, height: 20 }
            }
        };
    })(),

    2: (() => {
        const W = window.innerWidth;
        const H = window.innerHeight;
        const T = 20;
        const holeWidth = W * 0.1;
        const holeStart = (W - holeWidth) / 2;

        return {
            player: {
                "pos": { center_x: W * 0.56, center_y: H * 0.08, width: 20, height: 20 },
                "size": { width: 20, height: 20 },
                "physics": {
                    GRAVITY: 0.5,
                    TERMINAL_VELOCITY: 25,
                    PLAYER_SPEED: 4,
                    JUMP_SPEED: 13,
                    SPAWN_RATE: 120,
                }
            },
            enemies: {
                "pos": [
                    { center_x: W * 0.5, center_y: H * 0.08, width: 20, height: 20 },
                    { center_x: W * 0.44, center_y: H * 0.08, width: 30, height: 30 }
                ],
                "size": { width: 20, height: 20 },
                "physics": {
                    GRAVITY: 0.5,
                    TERMINAL_VELOCITY: 25,
                    PLAYER_SPEED: 4,
                    ENEMY_SPEED: 10,
                    JUMP_SPEED: 13,
                    SPAWN_RATE: 20,
                }
            },
            walls: {
                "pos": [
                    // Outer boundaries
                    { left_x: 0, top_y: H - T, width: holeStart, height: T },
                    { left_x: holeStart + holeWidth, top_y: H - T, width: W - (holeStart + holeWidth), height: T },
                    { left_x: 0, top_y: 0, width: holeStart, height: T },
                    { left_x: holeStart + holeWidth, top_y: 0, width: W - (holeStart + holeWidth), height: T },
                    { left_x: 0, top_y: 0, width: T, height: H },
                    { left_x: W - T, top_y: 0, width: T, height: H },

                    // "Zig-Zag Funnel" layout
                    { left_x: W * 0.44, top_y: H * 0.2, width: W * 0.12, height: T, spawnable: true },
                    { left_x: W * 0.12, top_y: H * 0.36, width: W * 0.25, height: T, spawnable: true },
                    { left_x: W * 0.62, top_y: H * 0.36, width: W * 0.25, height: T, spawnable: true },
                    { left_x: W * 0.31, top_y: H * 0.56, width: W * 0.38, height: T, spawnable: true },
                    { left_x: 20, top_y: H * 0.76, width: W * 0.25, height: T, spawnable: true },
                    { left_x: W * 0.72, top_y: H * 0.76, width: W * 0.25, height: T, spawnable: true }
                ]
            },
            boxes: {
                "pos": { left_x: W * 0.5, top_y: H * 0.5, width: 20, height: 20 },
                "size": { width: 20, height: 20 }
            }
        };
    })(),

    3: (() => {
        const W = window.innerWidth;
        const H = window.innerHeight;
        const T = 20;
        const holeWidth = W * 0.2;
        const holeStart = (W - holeWidth) / 2;

        return {
            player: {
                "pos": { center_x: W * 0.1, center_y: H * 0.85, width: 20, height: 20 },
                "size": { width: 20, height: 20 },
                "physics": {
                    GRAVITY: 0.5,
                    TERMINAL_VELOCITY: 25,
                    PLAYER_SPEED: 4,
                    JUMP_SPEED: 13,
                    SPAWN_RATE: 120,
                }
            },
            enemies: {
                "pos": [
                    { center_x: W * 0.35, center_y: H * 0.75, width: 20, height: 20 },
                    { center_x: W * 0.55, center_y: H * 0.55, width: 30, height: 30 }
                ],
                "size": { width: 20, height: 20 },
                "physics": {
                    GRAVITY: 0.5,
                    TERMINAL_VELOCITY: 25,
                    PLAYER_SPEED: 4,
                    ENEMY_SPEED: 10,
                    JUMP_SPEED: 13,
                    SPAWN_RATE: 20,
                }
            },
            walls: {
                "pos": [
                    { left_x: 0, top_y: H - T, width: W, height: T },
                    { left_x: 0, top_y: 0, width: holeStart, height: T },
                    { left_x: holeStart + holeWidth, top_y: 0, width: W - (holeStart + holeWidth), height: T },
                    { left_x: 0, top_y: 0, width: T, height: H },
                    { left_x: W - T, top_y: 0, width: T, height: H },
                    { left_x: W * 0.05, top_y: H * 0.75, width: W * 0.22, height: T, spawnable: true },
                    { left_x: W * 0.30, top_y: H * 0.68, width: W * 0.20, height: T, spawnable: true },
                    { left_x: W * 0.55, top_y: H * 0.52, width: W * 0.20, height: T, spawnable: true },
                    { left_x: W * 0.72, top_y: H * 0.40, width: W * 0.18, height: T, spawnable: true },
                    { left_x: W * 0.40, top_y: H * 0.82, width: W * 0.18, height: T, spawnable: true },
                    { left_x: W * 0.18, top_y: H * 0.20, width: W * 0.22, height: T, spawnable: false }
                ]
            },
            boxes: {
                "pos": [
                    { left_x: W * 0.32, top_y: H * 0.66, width: 20, height: 20 },
                    { left_x: W * 0.58, top_y: H * 0.50, width: 20, height: 20 },
                    { left_x: W * 0.78, top_y: H * 0.38, width: 20, height: 20 }
                ],
                "size": { width: 20, height: 20 }
            }
        };
    })()
};