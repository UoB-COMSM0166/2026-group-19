![Banner](image/banner.png)

<center><strong>Outrun, outshoot, and outlast the growing chaos!</strong></center>

[CLICK HERE TO PLAY!](https://uob-comsm0166.github.io/2026-group-19/)

VIDEO. Include a demo video of your game here (you don't have to wait until the end, you can insert a work in progress video)

# Table of Contents
1. [Development Team](#1-development-team)
2. [Introduction](#2-introduction)
3. [Requirements](#3-requirements)
4. [Design](#4-design)
5. [Implementation](#5-implementation)
6. [Evaluation](#6-evaluation)
7. [Process](#7-process)
8. [Sustainability](#8-sustainability)
9. [Conclusion](#9-conclusion)
10. [Contribution Statement](#10-contribution-statement)
11. [AI Statement](#11-ai-statement)
12. [References](#12-references)



# 1. Development Team

![Group Photo](./image/group-photo-annotated.png)

*Figure 1: Group Photo*

| Name          | Email                 | Primary Roles                            |
| ------------- | --------------------- | -----------------------------------------|
| Alex Hoover   | lv25122@bristol.ac.uk | Backend, ECS Framework, Physics System   |
| Jui Cheng Ho  | ax25117@bristol.ac.uk |                                          |
| Wei Lun Chang | jb25862@bristol.ac.uk |                                          |
| Chi-Wei Feng  | yx25778@bristol.ac.uk |                                          |
| Johnny Fraser | qk18837@bristol.ac.uk |                                          |
| Oliver Parry  | nf25715@bristol.ac.uk | Frontend, Enemy Types, Entity Animations |


# 2. Introduction

"Crate Expectations" follows a protagonist who is the sole survivor of a plane crash, emerging in different harsh terrains surrounded by enemies. In order to survive, our hero must fight against the evil creatures while collecting as many boxes as possible.

Crate Expectations is based on "Super Crate Box", which is a fast-paced, 2D arcade shooting game, prioritizing picking up crates, and killing the enemies which get in the way. The scoring system is defined by picking up crates, which spawn randomly around the map; picking up crates results in the score counter incrementing. Crates also contain a random weapon within, each with their own unique attributes.

<p align="center">
  <img src="assets/intro.gif" width="300">
</p>
*Figure 2: Overview of Basic Gameplay*

Each level in Crate Expectations features a unique theme, each with a different twist.

- **Level 1: Cave**:  I hope you're not scared of the dark! This level features reduced visibility, adding to the difficulty of collecting boxes and seeing enemies. 
- **Level 2: Ice**: See if you can find your footing on this level, which features reduced friction on platforms, making movement harder and recoil more intense. 
- **Level 3: Space**: How did a plane crash in space?! We don't have all the answers, all we know is that this level has significantly reduced gravity.

<table width="100%">
  <tr>
    <td width="33.33%">
      <img src="assets/cave.gif" width="100%">
    </td>
    <td width="33.33%">
      <img src="assets/ice.gif" width="100%">
    </td>
    <td width="33.33%">
      <img src="assets/space.gif" width="100%">
    </td>
  </tr>
</table>
*Figures 3, 4, 5: Showcase of Different Level Themes*


How long will you survive the endless onslaught? Just remember, with Crate Expectations come Crate Responsibility (sequel coming soon).

# 3. Requirements
## Genre Ideation & Investigation

The first stage of our development process was to identify what type of game we wanted to make. To begin, we discussed what types of games we enjoyed engaging with, and ended up with a list of genres that we all felt had potential. We used dot-voting to rank our preferences, allowing three votes per person. This allowed us to avoid anchoring onto one person's opinion and acted as a natural risk assessment, resulting in the ‘Action-Arcade Platformer’ and ‘Launcher’ genres tied first place.

| Genre | Total Votes | Status |
| :--- | :---: | :--- |
| **Launcher** | 4 | **Selected for Further Investigation** |
| **Action-Arcade Platformer** | 4 | **Selected for Further Investigation** |
| **"Cozy" Sims / Farming Sims** | 3 | High Interest |
| **Roguelike (RPG)** | 3 | High Interest |
| **Puzzles** | 3 | High Interest |
| **Racing** | 2 | Low Interest |
| **Fighting / Action** | 2 | Low Interest |
| **Tower Defense** | 2 | Low Interest |
| **Survival / Crafting** | 1 | Dropped |
| ~~**Horror**~~ | - | Scratched |
| ~~**Exploration**~~ | - | Scratched |

Not wanting to pick a focus prematurely, we explored a range of games from each genre and, through another vote, selected Super Crate Box and Learn to Fly as the two that we would bring forward for user testing via a paper prototyping session.

By selecting the strongest archetype from each genre, we maximized the breadth of useful feedback we were able to get from our peers acting as surrogate stakeholders. This also allowed us to avoid asking leading questions and instead use comparative questions when eliciting users' preferences, in order to avoid confirmation bias.

<table>
  <tr>
    <td><img src="image/action-arcade2.jpg" style="height:180; width:auto;"/></td>
    <td><img src="image/launchers.jpg" style="height:180; width:auto;"/></td>
  </tr>
    <tr>
    <td>Our favourite games with 'Arcade/Action platformer' elements </td>
    <td>A range of beloved games from the 'Launcher' genre</td>
  </tr>
</table>
*Figures 6, 7: Game Inspiration*

## Paper Prototyping Sessions

<table>
  <tr>
    <td><img src="assets/crate_paper_prototype.gif" style="height:180; width:auto;"/></td>
    <td><img src="assets/pingu_prototype-cropped.gif" style="height:180; width:auto;"/></td>
      </tr>
 <tr>
    <td>Action-Arcade Platformer Prototype</td>
    <td>Pingu's Day Out Prototype</td>
</tr>
</table>
*Figures 8, 9: Paper Prototyping*

These Paper Prototyping sessions provided critical data that shaped our final product. Users enjoyed the Super Crate Box concept, noting that it had clearer objectives and more intuitive game mechanics. This feedback, combined with the team's assessment of the project's Technical Scalability, led us to pivot away from the Launcher genre.

A standout success from the testing was the 'Lights Out!' mechanic seen above. Initially only a throwaway prototype, its popularity during user testing led us to prioritise it as a strong Should-Have requirement. It evolved into the 'Dark Mine' area in our final game, adding atmospheric depth and a unique challenge to the Level 1 environment.

## Identification of Stakeholders

In order to visualise our stakeholder relationships and begin to formalise requirements, we created an onion model of Crate Expectations' stakeholders. This helped us to prioritize the needs of our core players and developers, while adhering to restrictions imposed by external platforms and regulators."

![Onion Model of Stakeholders](./image/OnionModel.jpg)

*Figure 10: Onion Model*

## Epics and User Stories

We categorized our requirements into a range of Epics to ensure all stakeholder needs from our Onion Model were addressed. Sections of two epics are displayed below as examples of this process.

<table>
  <thead>
    <tr>
      <th>Epic</th>
      <th>User Stories</th>
      <th>Acceptance Criteria</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4"><b>Core Combat & Arcade Physics</b></td>
      <td rowspan="2">As a Player, I want responsive gravity and platform collision, so that movement feels precise and fair.</td>
      <td>Given the player is in mid-air (not touching a platform), When the game loop updates, Then the player’s vertical velocity must increase by the gravity constant.</td>
    </tr>
    <tr>
      <td>Given the player is moving upward during a jump, When they collide with the underside of a platform, Then their vertical velocity must instantly reset to zero to prevent "clipping."</td>
    </tr>
    <tr>
      <td rowspan="2">As a Player, I want to collect crates that instantly swap my weapon, so that the gameplay remains dynamic and challenging.</td>
      <td>Given the player overlaps with a weapon crate, When the collision is detected, Then the crate must be removed from the canvas and the player’s current weapon must be updated.</td>
    </tr>
    <tr>
      <td>Given the player presses the ‘Shoot’ key, When the time since the last shot is less than that specific weapon’s coolDown value, Then no new projectile should be spawned.</td>
    </tr>
    <tr>
      <td rowspan="4"><b>Inclusive Design (Accessibility)</b></td>
      <td rowspan="2">As a Player with motor impairments, I want to choose different parts of the control scheme independently from each other, so that I can play comfortably.</td>
      <td>Given the player is in the settings menu, When they interact with the key configuration options, Then they must be able to choose between specific preset key mappings independently of each other.</td>
    </tr>
    <tr>
      <td>Given a specific control scheme has been selected and saved, When the player presses the designated keys in that scheme, Then the corresponding "Movement" or "Shoot" actions must trigger in-game.</td>
    </tr>
    <tr>
      <td rowspan="2">As a Player with hearing impairments, I want visual feedback for key game events, so that I don’t miss critical game-state changes.</td>
      <td>Given the player character takes damage, When the health reduction occurs, Then the player must flash red simultaneously with any audio cues.</td>
    </tr>
    <tr>
      <td>	Given the player collects a new weapon, When the crate is removed from the canvas, Then a text notification must appear in the UI.</td>
    </tr>
  </tbody>
</table>

## User Personas

In order for us to be able to empathise with our users, and consider how development changes would impact different groups, we also developed a range of distinct User Personas derived from our initial surrogate stakeholder feedback. 

This sped up development by allowing us to easily question what ‘Sam the Sensitive Hearing Gamer’ and other personas would think about a given change, and adjust accordingly. 


![User Personas](./image/user_personas.png)

*Figure 11: User Personas*

##  Project Prioritization - MoSCoW Analysis

In order to compare and prioritise our user stories, we used Moscow Analysis. We realised that this would allow us to complete the features with the highest 'value-to-effort' ratio possible before moving onto lower return tasks.

We used Planning Poker to estimate the difficulty of each user story, deciding to keep our difficulty estimation categories limited to 'low', 'medium', and 'high'. We had limited game development experience at this point, and wanted only a rough estimate that we could reach a consensus on.

Having already determined the value of each feature via our user testing and analysis, it was simple to assign each feature into the appropriate MoSCoW bucket. This process was vital in informing the order and focus of our sprints, and a subset of the decicions it helped us to make are displayed below.

| Feature | Effort | Value | MoSCoW Bucket | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Core Physics & Gravity** | High | Critical | Must Have | The game is unplayable without stable physics, thus this is required for even the MVP. |
| **Randomized Weapon Crates** | Medium | High | Must Have | This is the main hook of the game, and forms the fundamental gameplay loop .|
| **Light's out Envimonmental Effect** | Medium | High | Should Have | This was a highly favoured feature during user testing that adds a unique twist to the game. |
| **Multiple Control Schemes** | Medium | High | Should Have | Allows players with control related accessibility needs to optimise their play. |
| **Visual Hit-Flash Feedback** | Low | Medium | Should Have | Aids deaf players who cannot hear the 'hurt' sound effect to play easily. |
| **Pause Menu & State Control** | Low | Medium | Should Have | Important for user control and allowing breaks without losing progress. |
| **Local High Score Saving** | Medium | Medium | Could Have | This would encourage replayability but is not required for an early game iteration. |
| **Online Global Leaderboard** | High | Medium | Won't Have | Leads to high server-side complexity and data protection considerations, with limited interest from play testers. |

## Use Case Diagram

To illustrate system behaviour and user interaction, we developed a Use Case Diagram. This mapped out the different use cases prioritised in our MoSCoW analysis and was the final piece in visualising the complete user flows that would take place in Crate Expectations.

![Use Case Diagram](./image/use_case_diagram.jpg)

*Figure 12: Use Case Diagram*

# 4. Design

With a set of preliminary requirements established for our game, we next turned to designing its architecture. During the 2026 BrisHack hackathon, our team experimented with a traditional object-oriented design using deep inheritance hierarchies. In this approach, a typical class structure might resemble:

```
GameObject → MovingEntity → Character → Player
```

While this design works adequately for small projects, we found that it did not scale well. Managing deep inheritance trees quickly became difficult, and the structure made it harder to reason about the relationships between classes. Additionally, we encountered the “God Class” problem, where individual classes accumulated large amounts of logic within a single file, making the code harder to maintain and extend.

For the development of our actual game, we therefore sought a design pattern that prioritised composition over inheritance, separated entity behaviour from the entities themselves, and remained conceptually simple. Based on these goals, we chose to implement an Entity–Component–System (ECS) architecture for the backend of our game.

## Backend (Entity-Component-System)

Unlike the traditional object-oriented approach, where objects encapsulate both data and behaviour, ECS separates the game into three distinct and loosely coupled parts.

- <strong>Entities:</strong>
An entity is simply a unique integer identifier. By itself, an entity contains no data or behaviour.

- <strong>Components:</strong>
Components store data but contain no logic. For example, a position component may store an entity’s x and y coordinates. Components are typically represented as lightweight structures.

- <strong>Systems:</strong>
Systems contain the game’s logic. Each system queries the ECS “database” for entities that possess a specific combination of components, then applies the relevant behaviour to those entities.

The images below show this design pattern conceptually.

![ECS](image/ecs-basic-classes.png)

*Figure 13: ECS Conceptual Class Diagram*

![ECS](image/ecs.png)

*Figure 14: Entity Component Database within ECS Class*

This architecture provides several additional benefits. The ECS database can be organized so that components are stored contiguously in memory, improving cache locality and overall performance. Achieving this level of memory efficiency is far more difficult with traditional object-oriented designs. Furthermore, ECS makes it easy to add new functionality. Rather than modifying existing class hierarchies, new behaviour can be introduced by defining a new component and system, then attaching the component to relevant entities. This modular structure enables rapid development of new features without requiring significant refactoring of existing code. The complete backend class diagram can be seen below.

```mermaid
classDiagram

  %% ─────────────────────────────────────────────

  %% ECS CORE

  %% ─────────────────────────────────────────────

  class ECS {

​    +nextEntityId

​    +components : Map

​    +systems : Array

​    +createEntity()

​    +removeEntity(entityId)

​    +addComponent(entityId, component)

​    +removeComponent(entityId, compClass)

​    +getComponent(entityId, compClass)

​    +getEntitiesWith(...compClasses)

​    +getSystem(systemClass)

​    +update(dt)

​    +clear()

  }

  class System {

​    +ecs

​    +update(dt)*

​    +forEachCollision(pos, components, cb)

​    +collides(a, b)

  }

  ECS "1" o-- "many" System : manages

  %% ─────────────────────────────────────────────

  %% SYSTEMS

  %% ─────────────────────────────────────────────

  class PhysicsSystem {

​    +spawner

​    +physics

​    +update(dt)

​    +applyPhysics(physics)

​    +resolveMovementCollisions(id, axis)

​    +resolveWallPenetration(...)

  }

  class RenderSystem {

​    +wallCache

​    +update(dt)

​    +buildWallCache(img)

​    +drawAnimated(id, char, anim, pos, bb, weapSprite)

  }

  class InputSystem {

​    +spawner

​    +prev : Map

​    +physics

​    +currentScheme

​    +update(dt)

​    +applyPhysics(physics)

​    +setControlScheme(schemeName)

  }

  class WeaponSystem {

​    +spawner

​    +physics

​    +update(dt)

​    +applyPhysics(physics)

​    +processFireRequest(id, now)

​    +getWeaponTip(id, pos, character)

​    +spawnProjectiles(id, pos, weapon, char)

​    +fireShotgun(pos, weapon, char, projectileData)

​    +fireBasic(weapon, char, projectileData)

​    +applyRecoil(vel, weapon, char)

  }

  class SpawningSystem {

​    +factory : EntityFactory

​    +queue

​    +update(dt)

​    +request(type, data)

  }

  class EnemySpawnSystem {

​    +spawner

​    +spawnTimer

​    +startDelay

​    +health

​    +update(dt)

​    +applyPhysics(physics)

​    +applyHealth(health)

​    +resetSpawnState()

​    +getRandomEnemyType()

  }

  class BoxSpawnSystem {

​    +spawner

​    +update(dt)

​    +getRandomPlatform()

​    +getRandomPositionOnPlatform(bb, w)

  }

  class InteractionSystem {

​    +spawner

​    +physics

​    +update(dt)

​    +applyPhysics(physics)

​    +handlePlayerEnemy(playerId)

​    +handlePlayerBox(playerId)

​    +handleProjectileEnemy(projectileId)

​    +handleProjectileWall(projectileId)

​    +spawnDeathDroplets(x, y)

​    +handleDeath(enemyId, enemyPos)

  }

  class AnimationSystem {

​    +update(dt)

​    +selectAnimation(char, anim, vel, now, player)

​    +advanceFrame(anim, dt)

  }

  class ProjectileSystem {

​    +update(dt)

  }

  class FloatingSystem {

​    +physics

​    +update(dt)

​    +applyPhysics(physics)

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

​    +ecs

​    +physics

​    +bulletImage

​    +rocketImage

​    +characterSpriteSheet

​    +enemySpriteSheet

​    +enemyAngrySpriteSheet

​    +enemyLargeSpriteSheet

​    +enemyLargeAngrySpriteSheet

​    +enemyFloatingImage

​    +boxImage

​    +wallTileImage

​    +create(type, data)

​    +createPlayer(data)

​    +createEnemy(data)

​    +createFloatingEnemy(data)

​    +createWall(data)

​    +createBox(data)

​    +createProjectile(data)

​    +playerComponents(data)

​    +enemyComponents(data)

​    +centeredPosition(data)

​    +addAll(entity, components)

​    +applyPhysics(physics)

  }

  EntityFactory --> ECS : creates entities in

  %% ─────────────────────────────────────────────

  %% GAME COORDINATOR

  %% ─────────────────────────────────────────────

  class Game {

​    +ecs : ECS

​    +factory : EntityFactory

​    +spawner : SpawningSystem

​    +levelConfig

​    +update()

​    +loadLevel(levelNum, difficulty)

​    +spawnLevelEntities(levelConfig)

​    +renderOnly()

  }

  Game "1" *-- "1" ECS

  Game "1" *-- "1" EntityFactory

  Game "1" *-- "1" SpawningSystem

  %% ─────────────────────────────────────────────

  %% COMPONENTS — Physics

  %% ─────────────────────────────────────────────

  class Position {

​    +x

​    +y

​    +width

​    +height

​    +getBoundingBox()

  }

  class Velocity {

​    +vx

​    +vy

​    +recoilVx

  }

  class Acceleration {

​    +ax

​    +ay

  }

  %% ─────────────────────────────────────────────

  %% COMPONENTS — Character / Entity

  %% ─────────────────────────────────────────────

  class Character {

​    +onGround

​    +health

​    +direction

​    +jumpBufferTime

  }

  class Player {

​    +score

  }

  class Enemy {

​    +powerful

  }

  class Floating {

​    +wasInRange

  }

  class Dying {

​    +rotation

​    +rotationSpeed

  }

  %% ─────────────────────────────────────────────

  %% COMPONENTS — Combat

  %% ─────────────────────────────────────────────

  class Weapon {

​    +type

​    +lastShotTime

​    +fireRate

​    +bulletDamage

​    +bulletSpeed

​    +bulletSize

​    +recoilKick

​    +maxRange

​    +pellets

​    +bounce

  }

  class Projectile {

​    +damage

​    +range

​    +bounce

​    +pierce

​    +duration

​    +spawnTime

​    +lastHitEnemy

​    +hitEnemies : Set

​    +followEntity

​    +followDirection

​    +followOffset

  }

  %% ─────────────────────────────────────────────

  %% COMPONENTS — Environment

  %% ─────────────────────────────────────────────

  class Wall

  class Box {

​    +weapon

​    +lastWeapon$

​    +pickUp()

  }

  class SpawnablePlatform

  %% ─────────────────────────────────────────────

  %% COMPONENTS — Rendering

  %% ─────────────────────────────────────────────

  class WeaponSprite {

​    +spriteSheet

​    +frameWidth

​    +frameHeight

  }

  class Renderable {

​    +color

​    +image

  }

  class Animation {

​    +spriteSheet

​    +frameWidth

​    +frameHeight

​    +columns

​    +animations

​    +current

​    +frameIndex

​    +timer

​    +hurtUntil

​    +setAnimation(type)

​    +setSpriteSheet(spriteSheet, newColumns, newAnimations)

  }

  %% Factory creates component compositions

  EntityFactory ..> Position : creates

  EntityFactory ..> Velocity : creates

  EntityFactory ..> Acceleration : creates

  EntityFactory ..> Character : creates

  EntityFactory ..> Player : creates

  EntityFactory ..> Enemy : creates

  EntityFactory ..> Floating : creates

  EntityFactory ..> Dying : creates

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


​    +scaleX(col, W)$

​    +scaleY(row, H)$

​    +build(template, difficultyKey)$

​    +buildWalls(platforms, W, H)$

  }

  class DEFAULTS {


​    +physics

​    +sizes

​    +health

​    +hurtTime

​    +spawnStartDelay

​    +difficulty

​    +controls

  }

  Game ..> LevelFactory : uses

  Game ..> DEFAULTS : uses
```

*Figure 15: Complete Backend Class Diagram*

## Front End

Early in the design process, we used sequence diagrams to conceptualise how the menu system should function, mapping out transitions between screens before any code was written. The diagram below illustrates a typical user journey through the game, from the title screen to gameplay and back again. By tracing the player’s path across different scenes, we identified which state needed to be preserved and chose an appropriate design pattern to support these transitions.

This process informed key decisions—for example, overlaying the pause menu on top of the live game rather than replacing it, allowing for a seamless resume experience. During gameplay, the player interacts directly with the game world while the system responds in real time. If the player dies, a Game Over screen is displayed, offering the choice to retry the level or return to the main menu, thereby completing the loop. Overall, this approach provided a strong foundation to build upon as development progressed.

![ECS](image/frontend-sequence-diagram.png)

*Figure 16: Example Frontend Sequence Diagram*

The game uses a Scene Manager pattern to control which screen is shown at any time, such as the main menu, gameplay, or pause screen. Each screen is represented as a "Scene" object with a common set of methods: **setup** to initialise, **update** to run logic, **display** to render, and **dispose** to clean up. A central SceneManager holds a reference to whichever scene is currently active and forwards every frame update and input event to it, keeping the rest of the codebase decoupled from scene-specific logic. This approach makes it straightforward to add new screens independently and keeps each scene's logic self-contained.

![ECS](image/scene-manager-diagram.png)

*Figure 17: Frontend Class Diagram*

# 5. Implementation

## Challenge 1: Implementing Floating Enemy

One of the most distinctive enemies in our game is the floating enemy, a ghost-like entity that partially ignores gravity and actively hunts the player through the air. This enemy type provides ensures that there are no safe locations where a player can avoid all enemies. However, designing its movement behaviour proved to be more difficult than initially anticipated.

### **Our Initial Approach**

We started by implementing a simple pathfinding algorithm which consistently applied a force in the direction of the player. This worked in open space but failed whenever walls got in the way, as the floating enemies would get stuck. This also caused enemies to cluster together, without posing any threat to the player. 

### **Our Solution**

To address this, we updated the floating enemy’s pathfinding to use two distinct modes based on its distance from the player. When far away, it drifts downward through the level using behaviour similar to other enemies. Once it enters a defined radius around the player, it reverts to our initial approach and begins smoothly accelerating toward the player. This ensures the enemy only actively pursues the player at close range, preventing it from getting stuck on walls. If it moves out of range again, it returns to its natural drifting behaviour.

![](image/floating-enemy-tracking.gif)

*Figure 18: Floating Enemy Pathfinding With Acceleration Arrows*

## Challenge 2: Maintaining Gameplay and Performance Across Systems

### **Animated Background Optimisation**

The game needed to look and feel consistent across different machines, which proved more challenging than expected. While it ran smoothly on some systems, lower-end devices experienced significant frame-rate drops due to the cost of rendering a complex animated background, which required intensive per-pixel calculations.

To address this, we introduced a scaled offscreen rendering approach. The background is first rendered at a reduced resolution and then upscaled to fit the screen. Since rendering cost scales with pixel count, this significantly lowers GPU workload, reducing it to a fraction of the original, while maintaining acceptable visual quality. We also ensured that display scaling did not undo these performance gains, and made the buffer automatically adjust to window size changes to maintain consistent efficiency.

### **Consistent Physics Across Framerates**

A second cross-device issue was inconsistent game speed caused by varying frame rates. Because the game updates once per rendered frame, higher refresh rates caused physics to run faster, while lower frame rates slowed everything down. To fix this, we scaled all physics updates using a time factor based on the elapsed time between frames, normalised to a 60 fps baseline. This ensures that movement, gravity, and other physics behaviours progress at a consistent rate, regardless of the hardware or display refresh rate.

### **Maintaining Layouts Across Resolutions and Aspect Ratios**

A further issue arose from differences in screen aspect ratios, which caused levels to appear and play differently across devices. To address this, we based all geometry and layout on a fixed 32×18 grid aligned to a 16:9 aspect ratio. This grid was then scaled to the user’s screen at runtime (with padding to maintain aspect ratio). This ensured that the relative positioning and proportions of platforms, walls, and entities remained consistent, regardless of screen dimensions. An additional benefit of this approach was that levels could be easily designed and iterated on using simple tools like Excel, before being translated directly into the game.

![Excel Level Design](image/excel-design.png)

*Figure 19: Excel Level Design vs. In-Game Space Level*


# 6. Evaluation

As part of the development process, the game went through several rounds of evaluation to ensure that the software was meeting the user requirements we had set out to achieve previously. We assessed the game using quantitative and qualitative methods, to give us the clearest picture possible of any potential usability issues whilst minimising the weaknesses that any one method may have.

#### Qualitative Evaluation: Think-Aloud
Sixteen participants were gathered in total from workshops. During this evaluation, users were asked to navigate around the map, interact with enemy entities, and pick up crates that spawned around the map. Players were encouraged to express their thoughts as they played. The results are as follows:

**Tasks:**
*   Navigate around the map, jump between platforms
*   Interact with enemy entities- avoid mobs, or kill them
*   Pick up crates as they spawn around the map

<p align="center">
    <img src="./image/thinkaloud_image.png" alt="Think Aloud User Quotes" width="70%">
</p>

*Figure 20: Think-Aloud User Quotes*


## Solutions and Adjustments

### **Navigation and Map**

*   **Issues:** Users found the movement smooth and enjoyable, however they found that the character could travel outside of the map boundaries.
*   **Solution:** We implemented strict level colliders and invisible walls around the top of the map, so that players could not jump out of the playing area.

### **Game Objectives and Goal clarity**

*   **Issues:** Players were confused about the win conditions. This was brought on by the lack of player death and a score tracker, and led to players not being incentivised to engage with the core mechanics of the game.
*   **Solutions:** We added a score tracker to informe players of how many crates they had collected, and we implemented player death, to clearly communicate the game’s fail conditions.

### **Enemy Pathing and Difficulty**

*   **Issues:** Enemy pathing and the presence of spots in the map where enemies did not cover led to users feeling as though enemies were not dangerous.
*   **Solutions:** We implemented a new type of enemy, the floating enemy, which would intercept the player regardless of map position, and revised the enemy pathing to cover the whole map.

#### Heuristic Evaluation
To complement the Think-Aloud method, and to make up for the tendency of its results to be skewed by the social desiribility bias, we also utilised the Heuristic evaluation method as well. Five participants spent approximately half an hour going through the game and its interfaces multiple times, noting down any issues in the game’s usability as according to Nielsen’s 10 Principles of heuristic evaluation. These notes are compiled in the table below.

| Interface Component | Issue | Heuristic(s) | Frequency (0-4) | Impact (0-4) | Persistence (0-4) | Severity (F+I+P)/3 |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| 🔴 UI | Missing score tracking and unclear win/fail conditions | H1: Visibility of system status | 4 | 4 | 4 | 4 |
| 🔴 Level Design | Player can go out of bounds or disappear off the top of the screen | H5: Error prevention | 3 | 4 | 4 | 3.7 |
| 🟡 Enemy Pathing | Enemies don't act as threats or path toward the player; no incentive to stop them | H2: Match between system and real world | 4 | 3 | 4 | 3.7 |
| 🟡 Mechanics | Misalignment between bullet/enemy rendering and actual hitbox positions | H4: Consistency and standards | 2 | 4 | 3 | 3 |
| 🟡 Game Logic | Unfair "safe spots" in enemy pathing where the player cannot be hit | H5: Error prevention | 2 | 3 | 3 | 2.7 |
| 🟢 Combat Feedback | Lack of visual response (flashing/recoil) when enemies are hit | H1: Visibility of system status | 3 | 2 | 2 | 2.3 |
| 🟢 Difficulty | Increase in enemy speed is not immediately intuitive to the player | H1: Visibility of system status | 2 | 2 | 2 | 2 |

Based on the severity scores, we prioritised fixes into three tiers, with 1 being critical, and 3 being minor. 🔴 Tier 1 (Critical) addressed the issues with the UI and the Level Design, as these were preventing users from carrying out the core principles of the game. 🟡 Tier 2 (Major) focused on the Enemy Pathing and Hitboxes, ensuring that the game felt responsive to player inputs. 🟢 Tier 3 (Minor) involved changing the way difficulty and enemy spawn times were implemented, which were addressed only once the first two tiers had been addressed.

## Quantitative Analysis: System Usability Scale (SUS)
To evaluate our game’s improvements, we transitioned from qualitative feedback to empirical, quantitative testing. We specifically measured whether players felt a heightened sense of danger and a clearer understanding of win conditions. Although we conducted tests for different difficulties, we decided on the System Usability Scale (SUS) over the NASA Task Load (TLX) to measure if we had met our objectives. This was because we wanted to ensure player satisfaction and good usability was attained, rather than simply measuring the volume of user workload.

Ten participants were randomly selected to complete SUS evaluations for both “Easy” and “Hard” difficulties. We sought high usability scores to prove that the game is intuitive and to verify our refinements had enhanced the user experience.

| User | Easy Difficulty | Hard Difficulty | Difference (Δ) |
| :--- | :---: | :---: | :---: |
| 1 | 67.5 | 70 | 2.5 |
| 2 | 72.5 | 68.5 | -4 |
| 3 | 62.5 | 65 | 2.5 |
| 4 | 70 | 67 | -3 |
| 5 | 65 | 65 | 0 |
| 6 | 75 | 73 | -2 |
| 7 | 60 | 62.5 | 2.5 |
| 8 | 72.5 | 72.5 | 0 |
| 9 | 67.5 | 66 | -1.5 |
| 10 | 70 | 72.5 | 2.5 |
| **Average** | **68.25** | **68.2** | **-0.05** |


<p align="center">
    <img src="./image/sus_chart2.png" alt="SUS Usability Chart"width="50%">
</p>

*Figure 21: Comparison of System Usability Scale (SUS) Scores across Easy and Hard difficulties.*

### Performance Analysis & Interpretation: 

The Wilcoxon Signed Rank Test produced a very high p-value (p ~ 1.0) , indicating no statistically significant difference in usability following the shift in difficulty. With average scores of 68.25 and 68.2 (consistent with the industry average of 68), the results suggest that the fixes to collision, boundaries and enemy pathing were effective in maintaining a consistent user experience. The minimal variation in scores indicates that the difficulty adjustment was well balanced; the game remained intuitive, and the “Hard” mode introduced challenge without causing frustration from technical issues or unintended behaviour.

However, the findings also highlight areas for improvement, particularly in accessibility through customisable controls and enhanced visual design. Overall, the results indicate that the initial issues were successfully resolved, allowing the gameplay to deliver a consistent sense of challenge that supports engagement with the win conditions.

#### Testing

We adopted a varied approach to testing to ensure that requirements were being conformed to. The majority of our quality assurance was achieved through black-box methods, looking at the player perception without relying on internal code knowledge.

As part of fulfilling the black-box method, we utilised **Boundary Value Analysis (BVA)** to test edge cases within our code. For example, we identified that the player would phase through boundary walls when a weapon was used and the knockback mechanic would be applied. Additionally, **Equivalence Partitioning** was used to categorise object interactions. Inputs were divided into valid and invalid partitions to test how the system handled different classes of collisions, such as player vs. crate, and player vs. enemy.

We also adopted **white-box testing** to ensure core internal systems were running correctly. These tests were written using the Jest framework and organised into four suites. Contrary to the black-box testing, this allowed us to directly inspect internal implementation details and prioritise high code coverage across our most critical systems. Using the Jest framework, we were able to acheive a 94.36% Statement Coverage and an 82.6% Branch Coverage across our core logic. This ensured that we were not only executing the code but also validating nearly every logical path within the ECS and Physics components. These high metrics show that we were conforming to user requirements, and ensuring that internal events like player-death and collision handling were responding correctly to game data under a wide variety of conditions, thereby reducing potential maintenance costs and identifying defects early in the development cycle.

<img src="./image/jest_coverage.png" alt="Jest Coverage Report" width="90%">


# 7. Process 

## Team Structure & Shared Accountability
At project onset, our team adopted a flat structure where all members contributed equally to decision-making while delegating tasks based on individual technical strengths. We divided the development into **Frontend** (animations, environment rendering, and UI) and **Backend** (ECS engine logic, physics, and weapon systems). 

To ensure our development stayed aligned with stakeholder expectations, one team member consistently acted as the **Client/Product Owner**. This role was responsible for validating features against our initial requirements and providing critical feedback during our "live" demonstrations, ensuring the "user's voice" was never lost in the technical implementation.

## Sprint Cadence: Planning & Retrospectives
Our development followed a rigorous weekly agile cadence. We utilized **Tuesday workshop sessions** for **Sprint Planning**, where we brainstormed objectives, estimated task complexity, and assigned Jira tickets. To ensure transparency and iterative growth, we held **Friday Retrospectives** to showcase new features, reflect on the week's blockers, and discuss areas for improvement. This routine allowed us to transition from abstract ideas to technical proof-of-concepts effectively.

| **Sprint Management (Jira)** | **Visual Prototyping (Miro)** |
| :---: | :---: |
| <img src="./image/jira_kanban.png" width="400"> | <img src="./image/miro.png" width="400"> |

*Figures 22, 23: Project Management Tools*

During the early stages, we also utilized physical **Paper Prototyping** to validate our mechanics before writing a single line of code. This "low-fidelity" approach was instrumental in deciding to prioritize the "Lights Out" mechanic, which eventually became a core feature of the game.

## Technical Workflow & Quality Control
To maintain high code quality and a clean project history, we implemented a strict Git Flow strategy. Work was strictly isolated in `feature/` or `fix/` branches, requiring at least one peer code review and approval before merging into the main branch. We prioritized a **linear history** through rebasing to keep the integration of complex systems—like the Projectile and Weapon systems—auditable. Furthermore, we standardized our communication using a semantic commit message style (e.g., `feat:`, `fix:`, `chore:`), which allowed the team to track progress at a glance.

| **Commit Standards** | **Git Flow Architecture** |
| :---: | :---: |
| <img src="./image/commit_style.png" width="400"> | <img src="./image/gitflow.png" width="400"> |

*Figures 24, 25: Git Quality Control*

## Reflections & Adaptations

While our Agile framework provided a strong foundation, the reality of development presented several challenges that required us to adapt our working style:

### **Challenge 1: Task Overlap & Ambiguity**  

**What Didn't Work:** Because we were all navigating game development and p5.js for the first time, initial task boundaries were blurry. Teammates occasionally modified shared files independently, leading to divergent logic and confusion.  

**How We Adapted:** We shifted to a more immediate communication style using our **WhatsApp Group** to flag file modifications in real-time. More importantly, we introduced **pair programming** sessions. This not only prevented overlapping work but also allowed us to share ideas and standardize our coding styles across the frontend and backend boundaries.

### **Challenge 2: Feature Creep & Idea Convergence**  

**What Didn't Work:** During brainstorming, our team tended to be overly ambitious. We frequently proposed complex mechanics without knowing if they were technically viable, which stalled early prototyping.  

**How We Adapted:** We implemented a "verify early" rule. Instead of debating complex ideas abstractly, we forced ourselves to either draw a simplified, structural flow on **Miro** or build a bare-bones code proof-of-concept. This grounded our creativity in technical reality.

### **Challenge 3: Git Conflicts**  

**What Didn't Work:** Frequent rebasing initially resulted in overwhelming merge conflicts, as isolated tasks ended up interacting with the same core game loops.  

**How We Adapted:** We learned that working in silos is dangerous in game development. When a conflict arose, we stopped resolving them in isolation and immediately initiated quick sync calls with the involved teammates to negotiate the merge. This fundamentally changed our mindset: we learned to constantly read each other's code to anticipate integration points *before* pushing our branches, drastically reducing integration risks later in the project.

# 8. Sustainability

Sustainability was a key consideration throughout our development process, influencing both our design decisions and the themes presented in the game. To ensure a structured approach, we integrated sustainability principles into our workflow using the **Sustainability Awareness Framework**.

## Sustainability Awareness Framework (SusAF)

### **Questions and Discussion**

Each team member proposed potential impacts of our game prompted by questions relating to five key sustainability dimensions: social, individual, environmental, economic, and technical. This encouraged us to reflect on our own perspectives and consider different viewpoints, helping us think more critically about sustainability in our project. 

### **Analysis**

From these discussions, we developed a set of organised notes that describe the game’s sustainability impacts across the five dimensions.

<table border="1" cellpadding="6" cellspacing="0">
  <thead>
    <tr>
      <th>Dimension</th>
      <th>Aspect</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4">Social</td>
      <td>Sense of Community</td>
      <td>The high score feature provides an opportunity for competitiveness amongst like-minded people.</td>
    </tr>
    <tr>
      <td>Trust</td>
      <td>Our active and consistent development schedule builds trust with users, who can expect new features.</td>
    </tr>
    <tr>
      <td>Inclusiveness and Diversity</td>
      <td>The game is designed with simple mechanics and minimal narrative barriers, making it accessible to a wide variety of players regardless of educational background.</td>
    </tr>
    <tr>
      <td>Equity</td>
      <td>All players have equal access to gameplay features. We implemented no pay-to-win mechanics or locked content to ensure fairness.</td>
    </tr>
    <tr>
      <td rowspan="5">Individual</td>
      <td>Health</td>
      <td>The game supports adjustable control schemes, allowing players to choose input methods that minimise strain and improve comfort during extended play sessions.</td>
    </tr>
    <tr>
      <td>Lifelong Learning</td>
      <td>Players can develop reflexes, coordination, and strategic thinking through repeated play.</td>
    </tr>
    <tr>
      <td>Privacy</td>
      <td>The game does not collect any personal data.</td>
    </tr>
    <tr>
      <td>Safety</td>
      <td>Content is designed to be non-realistic and stylised, reducing exposure to harmful or distressing material.</td>
    </tr>
    <tr>
      <td>Agency</td>
      <td>Players can customise control schemes and choose difficulty levels, giving them control over how they interact with the game.</td>
    </tr>
    <tr>
      <td rowspan="5">Environmental</td>
      <td>Materials and Resources</td>
      <td>The use of lightweight pixel-art assets and simple animations reduces memory usage and limits the computational resources required to run the game.</td>
    </tr>
    <tr>
      <td>Soil, Atmospheric and Water Pollution</td>
      <td>While our game has no direct physical pollution, reducing energy consumption through optimisations indirectly lowers electricity usage.</td>
    </tr>
    <tr>
      <td>Biodiversity and Land Use</td>
      <td>The game’s themed environments (space, cave, ice) are fictional and do not promote harmful real-world land use.</td>
    </tr>
    <tr>
      <td>Energy</td>
      <td>Efficient asset loading and lightweight graphics reduce CPU and GPU usage, lowering overall energy consumption during gameplay.</td>
    </tr>
    <tr>
      <td>Logistics and Transport</td>
      <td>As a digital-only product, the game avoids physical distribution, eliminating emissions associated with manufacturing and shipping.</td>
    </tr>
    <tr>
      <td rowspan="4">Economic</td>
      <td>Value</td>
      <td>Potential for paid levels and weapons in future.</td>
    </tr>
    <tr>
      <td>Customer Relations Management</td>
      <td>Simple gameplay, high scores, and regular improvements encourage engagement and build a positive relationship with players.</td>
    </tr>
    <tr>
      <td>Supply Chain</td>
      <td>Uses a minimal, fully digital supply chain, reducing cost, complexity, and reliance on external providers.</td>
    </tr>
    <tr>
      <td>Innovation, Research and Development</td>
      <td>Iterative design of themed levels and adaptable controls supports ongoing improvements, including potential accessibility features like high-contrast mode.</td>
    </tr>
    <tr>
      <td rowspan="5">Technical</td>
      <td>Maintainability</td>
      <td>Modular structure separates core systems, making bugs easier to fix and updates easier to implement.</td>
    </tr>
    <tr>
      <td>Usability</td>
      <td>Simple controls and clear feedback make the game easy to learn, with customisable inputs improving accessibility.</td>
    </tr>
    <tr>
      <td>Extensibility and Adaptability</td>
      <td>New levels, mechanics, and features (e.g. accessibility modes) can be added with minimal changes.</td>
    </tr>
    <tr>
      <td>Security</td>
      <td>Minimal data collection reduces risk, with no sensitive user information stored.</td>
    </tr>
    <tr>
      <td>Scalability</td>
      <td>Lightweight design supports additional content and increased usage without major performance impact.</td>
    </tr>
  </tbody>
</table>

The insights from this framework were then used to construct a SusAF diagram, which visualises how the impacts of our game extend across the five sustainability dimensions over time. By mapping short, medium, and long-term effects, the diagram highlights how immediate design decisions can lead to broader systemic outcomes. 

![SusAF](image/SusAF-diagram.png)

*Figure 26: SusAF Diagram*

## Sustainability in Design

To embed sustainability considerations into our design, we translated the insights from our earlier analysis into a set of user stories and acceptance criteria. These were again structured across the five sustainability dimensions. The table below shows how the earlier notes were translated into concrete design requirements, which we added to our project backlog.

| Dimension     | User Story                                                   | Acceptance Criterion                                         |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Social        | As a casual player, I want a fair and balanced game, so that I can enjoy it without feeling disadvantaged. | Given a user is playing, when they progress, then all gameplay features should be equally accessible with no pay-to-win mechanics making the game easier. |
| Social        | As a competitive player, I want to compare my performance with others, so that I feel part of a wider community. | Given a user completes a run, when scores are displayed, then they should be able to view and compare high scores. |
| Individual    | As a player with accessibility needs, I want to customise controls, so that I can play comfortably. | Given a user goes into settings menu, when they change controls, then the new configuration should be applied immediately and persist between screens. |
| Individual    | As a player, I want my privacy to be protected, so that I can play without sharing personal data. | Given a user plays the game, no personal data should be required or stored. |
| Environmental | As a sustainably-minded player, I want the game to run efficiently, so that it uses minimal system resources on my system. | Given a user is playing, when the game is running, then CPU and memory usage should remain low due to optimised assets. |
| Environmental | As a developer, I want to minimise unnecessary resource usage, so that the game has a lower environmental impact. | Given assets are loaded, when they are no longer needed, then they should be removed or reused efficiently. |
| Economic      | As a developer, I want the option to add future content, so that the game can remain financially sustainable. | Given new content is introduced, when additional levels or items are added, then they should integrate without affecting core gameplay balance. |
| Technical     | As a regular player, I want the game to run smoothly over time, so that I can continue playing without performance issues. | Given a user is playing the game, when they play for extended periods, then the game should maintain stable performance without crashes or slowdowns. |
| Technical     | As a developer, I want the game to be easy to update and extend, so that new content can be added without breaking existing features. | Given the system is updated, when new levels or features are added, then existing functionality should remain unaffected. |

## Green Software Design Patterns

To improve the environmental sustainability of our game, we investigated several Green Software Design Patterns and chose three that were most applicable to our system and likely to have meaningful impact. These patterns consider trade-offs across environmental impact, system performance, and cost efficiency. We assessed their potential benefits using the Software Carbon Intensity (SCI) framework, defined as **SCI = (E × I) + M per R**. [1]

Where:

- **E** represents the energy consumed by the system during operation
- **I** represents the carbon intensity of the electricity used
- **M** represents the embodied carbon associated with hardware and infrastructure
- **R** represents the functional unit of software usage being measured (e.g. per game session)

**1. Deprecate GIFs for Animated Content [2]** 

The GIF format has become technically obsolete with the adoption of newer technologies. To reduce the inefficiencies associated with GIF-based animation, we replaced all GIF assets with sprite sheets for in-game animations. In contrast to GIFs, sprite sheets consolidate all animation frames into a single image, which can then be rendered by selectively displaying regions of the sheet.

By storing animation frames in one compact resource, we reduce bandwidth usage and improve rendering efficiency. This lowers processing overhead on the client side, contributing to reduced energy consumption **(E)** .

![SpriteSheet](src/assets/spriteEnemy.png)

*Figure 27: Sprite Sheet*

**2.  Optimising Image Size for Display [3]**

To improve performance and reduce unnecessary resource usage, we optimised all in-game images so that their stored pixel dimensions more closely match their actual display size on the lab machines. Previously, some assets were significantly larger than required and were being scaled down in the browser, which resulted in wasted memory, bandwidth, and processing effort.

Overall, this change reduces energy usage **(E)** by lowering rendering overhead and memory demand, while also minimising wasted storage from oversized assets **(M)**.

![ImageResizing](image/image-resizing.png)

*Figure 28: Image Resizing*

**3. Caching Static Data [4]**

Repeatedly recomputing and redrawing static assets introduces unnecessary CPU work and increases rendering overhead. Even if the underlying data does not change between frames, it may still be re-processed and re-rendered every update cycle, wasting energy. A more efficient approach is to cache the rendered output of static data so it can be reused without re-computation.

We made use of this design pattern in our rendering system. Instead of iterating over wall entities and drawing them each frame, the system pre-renders them once into an off-screen buffer and reuses the resulting image. Pseudocode of this implementation is included below.

```pseudocode
wallCache ← empty

function buildWallCache():
    create offscreen buffer

    for each wall entity:
        get position and size
        render wall tiles into buffer

    store result in wallCache


render loop:
    if wallCache exists:
        draw wallCache to screen
```

Caching static data reduces SCI by lowering repeated computation and rendering. By reusing pre-rendered content instead of recalculating it each frame, less energy is consumed on the client device, reducing energy use **(E)**. It also reduces the amount of work performed across the rendering pipeline over time, which decreases overall hardware utilisation and therefore lowers embodied carbon **(M)**.

# 9. Conclusion

Reflecting on the development of *Crate Expectations*, we are proud of what we have achieved as a team. At the outset, creating a fully functional game felt ambitious, particularly given our limited prior experience with game development. Over time, through experimentation, iteration, and collaboration, we transformed an initial concept into a polished and engaging final product.

A key aspect of our project was the decision to adopt an Entity-Component-System (ECS) architecture. While this approach was initially unfamiliar and challenging to implement, it ultimately provided a flexible and scalable foundation for our game. This decision, combined with our use of structured development practices such as sprint planning, task tracking, and version control, allowed us to manage complexity effectively as the project evolved.

Working as a team was central to our success. By holding regular meetings, working through problems together, and sharing equal ownership of the codebase, we established a workflow that kept development organised and effective. Practices such as code reviews, consistent commit standards, and frequent refactoring helped us maintain code quality and conform to agreed-upon design patterns. In addition, the team worked well on a personal level, our personalities aligned naturally, and we were open to each other’s ideas, which created a positive and collaborative environment. This made communication straightforward and allowed us to coordinate effectively throughout the project.

Throughout the project, we encountered and overcame several key technical challenges, particularly in implementing the floating enemy’s behaviour and maintaining consistent performance across different systems. Both required careful iteration and refinement to ensure they worked reliably within the overall game. Addressing these challenges not only improved the quality and stability of the game, but also strengthened our technical and problem-solving skills. The iterative evaluation process further allowed us to refine the user experience and ensure that the game remained both intuitive and challenging.

Despite meeting our core objectives, there are several areas where the game could be extended in **future work**. Features such as multiplayer functionality, additional weapons, and new themed levels would enhance both replayability and player engagement. A key priority moving forward would be expanding accessibility further, particularly through improved visual feedback such as clearer enemy health indicators and optional effects like screen shake to better communicate in-game events during fast-paced gameplay. We would also refine the visual design and overall polish of the game to improve consistency and usability across all gameplay situations.

Overall, this project has been a wonderful learning experience. It has allowed us to develop new technical skills, gain first-hand experience of collaborative software development,  and apply our creativity during the design process. We are proud of the final product we have created and of the progress we have made as a team throughout the project.

# 10. Contribution Statement

| Team Member   | Contribution |
| ------------- | ------------ |
| Alex Hoover   | 1.0          |
| Jui Cheng Ho  | 1.0          |
| Wei Lun Chang | 1.0          |
| Chi-Wei Feng  | 1.0          |
| Johnny Fraser | 1.0          |
| Oliver Parry  | 1.0          |

# 11. AI Statement

We used AI tools in a limited way during the development of *Crate Expectations*. They were mainly used to help check grammar and improve figure style in our report. All technical content and analysis were written and checked by the team.

We also used AI to help create some visual assets, such as background images and other artwork used in the game.

AI was **not** used to design or build the game systems, write gameplay code, or produce evaluation results. All of the core development work was done by the team.

# 12. References

[1] Green Software Foundation, *Software Carbon Intensity (SCI) Specification*, Green Software Foundation. [Online]. Available: https://sci.greensoftware.foundation/. [Accessed: 26-Apr-2026].

[2] Green Software Foundation, “Deprecate GIFs for animated content,” *Green Software Patterns*, [Online]. Available: [https://patterns.greensoftware.foundation/catalog/web/deprecate-gifs/](https://patterns.greensoftware.foundation/catalog/web/deprecate-gifs/?utm_source=chatgpt.com). [Accessed: 26-Apr-2026].

[3] Green Software Foundation, “Properly sized images,” *Green Software Patterns*, [Online]. Available: [https://patterns.greensoftware.foundation/catalog/web/properly-sized-images/](https://patterns.greensoftware.foundation/catalog/web/properly-sized-images/?utm_source=chatgpt.com). [Accessed: 26-Apr-2026].

[4] Green Software Foundation, “Cache static data,” *Green Software Patterns*, [Online]. Available: [https://patterns.greensoftware.foundation/catalog/cloud/cache-static-data/](https://patterns.greensoftware.foundation/catalog/cloud/cache-static-data/?utm_source=chatgpt.com). [Accessed: 26-Apr-2026].

[5] "SH17A, "Tiny Clouds," *Shadertoy*. [Online]. Available: https://www.shadertoy.com/view/lsBfDz. [Accessed: 26-Apr-2026].