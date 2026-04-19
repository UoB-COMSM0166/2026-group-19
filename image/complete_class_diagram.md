```mermaid
classDiagram
    %% ─────────────────────────────────────────────
    %% ECS CORE
    %% ─────────────────────────────────────────────
    class ECS {
        +nextEntityId
        +components : Map
        +systems : Array
        +createEntity()
        +removeEntity(entityId)
        +addComponent(entityId, component)
        +removeComponent(entityId, compClass)
        +getComponent(entityId, compClass)
        +getEntitiesWith(...compClasses)
        +getSystem(systemClass)
        +update(dt)
        +clear()
    }

    class System {
        <<abstract>>
        +ecs
        +update(dt)*
        +forEachCollision(pos, components, cb)
        +collides(a, b)
    }

    ECS "1" o-- "many" System : manages

    %% ─────────────────────────────────────────────
    %% SYSTEMS
    %% ─────────────────────────────────────────────
    class PhysicsSystem {
        +spawner
        +update(dt)
        +applyPhysics(physics)
        +resolveMovementCollisions(id, axis)
        +resolveWallPenetration(...)
    }
    class RenderSystem {
        +wallCache
        +update(dt)
        +buildWallCache(img)
        +drawAnimated(id, char, anim, pos, bb, weapSprite)
    }
    class InputSystem {
        +spawner
        +prev : Map
        +currentScheme
        +update(dt)
        +setControlScheme(schemeName)
    }
    class WeaponSystem {
        +spawner
        +update(dt)
        +processFireRequest(id, now)
        +getWeaponTip(id, pos, character)
        +spawnProjectiles(id, pos, weapon, char)
        +fireShotgun(pos, weapon, char, projectileData)
        +fireBasic(weapon, char, projectileData)
        +fireLaser(id, pos, weapon, char)
        +applyRecoil(vel, weapon, char)
    }
    class SpawningSystem {
        +factory : EntityFactory
        +queue
        +update(dt)
        +request(type, data)
    }
    class EnemySpawnSystem {
        +spawner
        +spawnTimer
        +update(dt)
        +getRandomEnemyType()
    }
    class BoxSpawnSystem {
        +spawner
        +update(dt)
        +getRandomPlatform()
        +getRandomPositionOnPlatform(bb, w)
    }
    class InteractionSystem {
        +spawner
        +update(dt)
        +handlePlayerEnemy(playerId)
        +handlePlayerBox(playerId)
        +handleProjectileEnemy(projectileId)
        +handleProjectileWall(projectileId)
        +spawnDeathDroplets(x, y)
    }
    class AnimationSystem {
        +update(dt)
        +selectAnimation(anim, vel, now)
        +advanceFrame(anim, dt)
    }
    class ProjectileSystem {
        +update(dt)
    }
    class FloatingSystem {
        +update(dt)
        +applyPhysics(physics)
    }

    System <|-- PhysicsSystem
    System <|-- RenderSystem
    System <|-- InputSystem
    System <|-- WeaponSystem
    System <|-- SpawningSystem
    System <|-- EnemySpawnSystem
    System <|-- BoxSpawnSystem
    System <|-- InteractionSystem
    System <|-- AnimationSystem
    System <|-- ProjectileSystem
    System <|-- FloatingSystem

    SpawningSystem --> EntityFactory : uses

    %% ─────────────────────────────────────────────
    %% ENTITY FACTORY
    %% ─────────────────────────────────────────────
    class EntityFactory {
        +ecs
        +characterSpriteSheet
        +wallTileImage
        +create(type, data)
        +createPlayer(data)
        +createEnemy(data)
        +createFloatingEnemy(data)
        +createWall(data)
        +createBox(data)
        +createProjectile(data)
        +applyPhysics(physics)
    }

    EntityFactory --> ECS : creates entities in

    %% ─────────────────────────────────────────────
    %% GAME COORDINATOR
    %% ─────────────────────────────────────────────
    class Game {
        +ecs : ECS
        +factory : EntityFactory
        +spawner : SpawningSystem
        +levelConfig
        +update()
        +loadLevel(levelNum, difficulty)
        +spawnLevelEntities(levelConfig)
        +renderOnly()
    }

    Game "1" *-- "1" ECS
    Game "1" *-- "1" EntityFactory
    Game "1" *-- "1" SpawningSystem

    %% ─────────────────────────────────────────────
    %% COMPONENTS — Physics
    %% ─────────────────────────────────────────────
    class Position {
        +x
        +y
        +width
        +height
        +getBoundingBox()
    }
    class Velocity {
        +vx
        +vy
    }
    class Acceleration {
        +ax
        +ay
    }

    %% ─────────────────────────────────────────────
    %% COMPONENTS — Character / Entity
    %% ─────────────────────────────────────────────
    class Character {
        +onGround
        +health
        +direction
        +jumpBufferTime
    }
    class Player {
        +score
    }
    class Enemy {
        +powerful
    }
    class Floating {
        +wasInRange
    }
    class BloodDroplet
    class FireRequest

    %% ─────────────────────────────────────────────
    %% COMPONENTS — Combat
    %% ─────────────────────────────────────────────
    class Weapon {
        +type
        +lastShotTime
        +fireRate
        +bulletDamage
        +bulletSpeed
        +bulletSize
        +recoilKick
        +maxRange
        +pellets
        +bounce
        +pierce
        +duration
        +beamLength
    }
    class Projectile {
        +damage
        +range
        +bounce
        +pierce
        +duration
        +spawnTime
        +lastHitEnemy
        +hitEnemies : Set
    }

    %% ─────────────────────────────────────────────
    %% COMPONENTS — Environment
    %% ─────────────────────────────────────────────
    class Wall
    class Box {
        +weapon
        +lastWeapon$
        +pickUp()
    }
    class SpawnablePlatform

    %% ─────────────────────────────────────────────
    %% COMPONENTS — Rendering
    %% ─────────────────────────────────────────────
    class WeaponSprite {
        +spriteSheet
        +frameWidth
        +frameHeight
    }
    class Renderable {
        +color
        +image
    }
    class Animation {
        +spriteSheet
        +frameWidth
        +frameHeight
        +columns
        +animations
        +current
        +frameIndex
        +timer
        +hurtUntil
        +setAnimation(type)
    }

    %% Factory creates component compositions
    EntityFactory ..> Position : creates
    EntityFactory ..> Velocity : creates
    EntityFactory ..> Acceleration : creates
    EntityFactory ..> Character : creates
    EntityFactory ..> Player : creates
    EntityFactory ..> Enemy : creates
    EntityFactory ..> Floating : creates
    EntityFactory ..> Weapon : creates
    EntityFactory ..> Projectile : creates
    EntityFactory ..> Wall : creates
    EntityFactory ..> Box : creates
    EntityFactory ..> SpawnablePlatform : creates
    EntityFactory ..> Renderable : creates
    EntityFactory ..> Animation : creates
    EntityFactory ..> WeaponSprite : creates

    %% ─────────────────────────────────────────────
    %% CONFIGURATION
    %% ─────────────────────────────────────────────
    class LevelFactory {
        <<static>>
        +scaleX(col, W)$
        +scaleY(row, H)$
        +build(template, difficultyKey)$
        +buildWalls(platforms, W, H)$
    }
    class DEFAULTS {
        <<config>>
        +physics
        +sizes
        +health
        +hurtTime
        +difficulty
        +controls
    }

    Game ..> LevelFactory : uses
    Game ..> DEFAULTS : uses

    %% ─────────────────────────────────────────────
    %% UI — Scene hierarchy
    %% ─────────────────────────────────────────────
    class Scene {
        <<abstract>>
        +setup()
        +update()
        +display()*
        +dispose()
        +handleMousePressed()
        +handleKeyPressed()
    }

    class SceneManager {
        +currentScene : Scene
        +switchScene(newScene)
        +pushScene(newScene)
        +resumeScene(existingScene)
        +update()
        +display()
        +handleMousePressed()
        +handleKeyPressed()
    }

    class PlayScene {
        +game : Game
        +levelToLoad
        +difficulty
        +scoreHUD : ScoreHUD
        +fpsCounter : drawFps
        +setup()
        +update()
        +display()
        +handleKeyPressed()
        +handleMousePressed()
        +dispose()
    }
    class MenuScene {
        +titleText : ShadowText
        +menuItems
        +difficultyOptions
        +difficultyIndex
        +fpsCounter : drawFps
        +display()
        +handleKeyPressed()
        +activateSelectedOption()
        +handleMousePressed()
        +dispose()
    }
    class PauseScene {
        +playScene : PlayScene
        +menuItems
        +display()
        +handleKeyPressed()
        +activateSelectedOption()
        +handleMousePressed()
    }
    class SettingsScene {
        +sceneToDisplayUnderneath : Scene
        +sceneToReturnTo : Scene
        +controlSchemes
        +controlIndex
        +volume
        +isMuted
        +display()
        +handleKeyPressed()
        +handleSelection()
        +handleMousePressed()
        +dispose()
    }
    class GameOverScene {
        +playScene : PlayScene
        +menuItems
        +display()
        +handleKeyPressed()
        +activateSelectedOption()
        +handleMousePressed()
    }
    class drawFps {
        +display()
    }

    Scene <|-- PlayScene
    Scene <|-- MenuScene
    Scene <|-- PauseScene
    Scene <|-- SettingsScene
    Scene <|-- GameOverScene
    Scene <|-- drawFps

    SceneManager "1" o-- "1" Scene : currentScene

    PlayScene *-- Game
    PlayScene *-- ScoreHUD
    PlayScene *-- drawFps
    MenuScene *-- ShadowText
    MenuScene *-- drawFps
    PauseScene --> PlayScene : overlays
    SettingsScene --> Scene : overlays
    GameOverScene --> PlayScene : overlays

    %% ─────────────────────────────────────────────
    %% UI — Components & Utilities
    %% ─────────────────────────────────────────────
    class ShadowText {
        +content
        +x
        +y
        +size
        +color
        +shadowColor
        +offset
        +setAlignment(h, v)
        +display()
    }
    class UIButton {
        +label
        +x
        +y
        +w
        +h
        +fontSize
        +isHovered
        +hasBackground
        +setBackground(bg, hoverBg, radius)
        +update()
        +display()
        +isClicked()
    }
    class ScoreHUD {
        +ecs : ECS
        +getScore()
        +getHealth()
        +display()
    }
    class bgShader {
        +vert
        +frag
        +display()
        +dispose()
    }
    class ScrollingPlayBg {
        +image
        +speedX
        +speedY
        +offsetX
        +offsetY
        +tileScale
        +resize(w, h)
        +update()
        +draw()
    }

    ScoreHUD --> ECS : reads from
    MenuScene *-- bgShader
    PlayScene *-- ScrollingPlayBg
```
