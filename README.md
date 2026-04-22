# 2026-group-19
2026 COMSM0166 group 19
Play Our Game!
>>  https://uob-comsm0166.github.io/2026-group-19/  <<

# COMSM0166 Project Template
A project template for the Software Engineering Discipline and Practice module (COMSM0166).

## Info

This is the template for your group project repo/report. We'll be setting up your repo and assigning you to it after the group forming activity. You can delete this info section, but please keep the rest of the repo structure intact.

You will be developing your game using [P5.js](https://p5js.org) a javascript library that provides you will all the tools you need to make your game. However, we won't be teaching you javascript, this is a chance for you and your team to learn a (friendly) new language and framework quickly, something you will almost certainly have to do with your summer project and in future. There is a lot of documentation online, you can start with:

- [P5.js tutorials](https://p5js.org/tutorials/) 
- [Coding Train P5.js](https://thecodingtrain.com/tracks/code-programming-with-p5-js) course - go here for enthusiastic video tutorials from Dan Shiffman (recommended!)

## Your Game (change to title of your game)

STRAPLINE. Add an exciting one sentence description of your game here.

IMAGE. Add an image of your game here, keep this updated with a snapshot of your latest development.

LINK. Add a link here to your deployed game, you can also make the image above link to your game if you wish. Your game lives in the [/docs](/docs) folder, and is published using Github pages. 

VIDEO. Include a demo video of your game here (you don't have to wait until the end, you can insert a work in progress video)

## Your Group

![Group Photo](./image/group-photo.JPG)

- Alexander Hoover, lv25122@bristol.ac.uk, ROLE
- Jui Cheng Ho, ax25117@bristol.ac.uk, ROLE
- Wei Lun Chang, jb25862@bristol.ac.uk, ROLE
- Chi-Wei Feng, yx25778@bristol.ac.uk, ROLE
- Johnny Fraser, qk18837@bristol.ac.uk, ROLE
- Oliver Parry, nf25715@bristol.ac.uk, ROLE 

## Project Report


### Introduction

- 5% ~250 words 
- Describe your game, what is based on, what makes it novel? (what's the "twist"?)
Our team outlined two main project ideas for potential development. The first game idea was based on the existing game Super Crate Box, and the second is based on the browser game Learn2Fly. Although both of these games are part of different genres, they share similarities in being 2D platformers with side-view perspective, being arcade-like in style and relatively fast-paced for the player.

Game 1: Super Crate Box
Main mechanics:
Fixed map arcade game, where the player controls a character equipped with weapons.
Scoring system is defined by picking up crates, which spawn randomly and periodically around the map. Picking up crates results in a counter incrementing, and being ultimately stored in a leaderboard.
Crates also contain a random weapon within, with weapons having their own unique attributes to fight against enemies.
Enemies spawn in through the top of the map, progress over platforms within the map, and if they collide with the player, the game ends.
Enemies differ in size between 'normal' sized enemies, which are smaller in hitbox and take 1 hit, and 'big' enemies, which are larger but take multiple hits to kill.
If enemies reach the bottom of the map, and fall through a gate at the bottom, they re-appear at the top again, only much faster in movement.
The music is retro/arcade, adding to the fast-paced nature of the game, and evoking a sense of nostalgia to older games of a similar genre.

Key strengths:
The core game mechanics are relatively simple, so there won't be the case of biting off more than we can chew. Moreover, we can implement the main features, and then work on adding our own twists to the game, iterating and further polishing as we go so that a seamless experience is achieved. The game is not so reliant on the quality of the graphics, so although we will all gain some experience creating our own visual entities, the quality of the graphics won't weigh down the implementation of other more important aspects of the game. This way development can continue to be refined simultaneous to the development of better graphics if need be.

Possible Twists:
Main twists would be changes to the environment in which the map is played. Adding wind which would affect bullet trajectory and physics as well as potentially the player would be interesting, which would occur at random points within the game for a specified amount of time. Similarly, limiting the perspective that the player can see from, for example removing lighting would be another interesting mechanic. In this way, the entire map would no longer be able to be seen in its entirety as usual, and instead the player is limited to seeing based on proximity from their player entity and which way they are facing. Changing gravity conditions is also a good twist, where the entire map flips, and the player has to traverse the map upside-down, with the enemies moving in the opposite direction.

### Requirements 
#### Genre Ideation & Investigation

The first stage of our development process was to identify what type of game we wanted to make.
To begin, we discussed what types of games we enjoyed engaging with, and ended up with a list of genres that we all felt had potential. We used dot-voting to rank our preferences, allowing three votes per person. This allowed us to avoid anchoring onto one person's opinion and acted as a natural risk assessment, resulting in the ‘Action-Arcade Platformer’ and ‘Launcher’ genres tied first place.

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

#### Paper Prototyping Sessions
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

These Paper Prototyping sessions provided critical data that shaped our final product. Users enjoyed the Super Crate Box concept, noting that it had clearer objectives and more intuitive game mechanics. This feedback, combined with the team's assessment of the project's Technical Scalability, led us to pivot away from the Launcher genre.

A standout success from the testing was the 'Lights Out!' mechanic seen above. Initially only a throwaway prototype, its popularity during user testing led us to prioritise it as a strong Should-Have requirement. It evolved into the 'Dark Mine' area in our final game, adding atmospheric depth and a unique challenge to the Level 1 environment.

#### Identification of Stakeholders

![Onion Model of Stakeholders](./image/OnionModel.jpg)

#### Epics and User Stories

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

#### User Personas

In order for us to be able to empathise with our users, and consider how development changes would impact different groups, we developed a range of distinct User Personas derived from our initial surrogate stakeholder feedback. 

This sped up development by allowing us to easily question what ‘Sam the Sensitive Hearing Gamer’ and other personas would think about a given change, and adjust accordingly. 


![User Personas](./image/user_personas.png)

####  Project Prioritization - MoSCoW Analysis

| Feature | Effort | Value | MoSCoW Bucket | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Core Physics & Gravity** | High | Critical | Must Have | The game is unplayable without stable physics, thus this is required for even the MVP. |
| **Randomized Weapon Crates** | Medium | High | Must Have | This is the main hook of the game, and forms the fundamental gameplay loop .|
| **Light's out Envimonmental Effect** | Medium | High | Should Have | This was a highly favoured feature during user testing that adds a unique twist to the game. |
| **Multiple Control Schemes** | Low | High | Should Have | Allows players with control related accessiblity needs to optimise their play. |
| **Visual Hit-Flash Feedback** | Low | Medium | Should Have | Aids deaf players who cannot hear the 'hurt' sound effect to play easily. |
| **Pause Menu & State Control** | Low | Medium | Should Have | Important for user control and allowing breaks without losing progress. |
| **Local High Score Saving** | Medium | Medium | Could Have | This would encourage replayability but is not required for an early game iteration. |
| **Online Global Leaderboard** | High | Medium | Won't Have | Leads to high server-side complexity and data protection considerations, with limited interest from playtesters. |

#### Use Case Diagram
![Use Case Diagram](./image/use_case_diagram.jpg)

### Design

With a set of preliminary requirements established for our game, we next turned to designing its architecture. During the 2026 BrisHack hackathon, our team experimented with a traditional object-oriented design using deep inheritance hierarchies. In this approach, a typical class structure might resemble:

```
GameObject → MovingEntity → Character → Player
```

While this design works adequately for small projects, we found that it did not scale well. Managing deep inheritance trees quickly became difficult, and the structure made it harder to reason about the relationships between classes. Additionally, we encountered the “God Class” problem, where individual classes accumulated large amounts of logic within a single file, making the code harder to maintain and extend.
For the development of our actual game, we therefore sought a design pattern that minimized inheritance, separated entity behaviour from the entities themselves, and remained conceptually simple. Based on these goals, we chose to implement an Entity–Component–System (ECS) architecture for the backend of our game.

#### Backend (Entity-Component-System)

Unlike the traditional object-oriented approach, where objects encapsulate both data and behaviour, ECS separates the game into three distinct and loosely coupled parts. 

- <strong>Entities:</strong>
An entity is simply a unique integer identifier. By itself, an entity contains no data or behaviour.

- <strong>Components:</strong>
Components store data but contain no logic. For example, a position component may store an entity’s x and y coordinates. Components are typically represented as lightweight structures.

- <strong>Systems:</strong>
Systems contain the game’s logic. Each system queries the ECS “database” for entities that possess a specific combination of components, then applies the relevant behaviour to those entities.

The images below show this design pattern conceptually.

*ECS Conceptual Class Diagram*

![ECS](image/ecs-basic-classes.png)

*Entity Component Database within ECS Class*

![ECS](image/ecs.png)

This architecture provides several additional benefits. The ECS database can be organized so that components are stored contiguously in memory, improving cache locality and overall performance. Achieving this level of memory efficiency is far more difficult with traditional object-oriented designs. Furthermore, ECS makes it easy to add new functionality. Rather than modifying existing class hierarchies, new behaviour can be introduced by defining a new component and system, then attaching the component to relevant entities. This modular structure enables rapid development of new features without requiring significant refactoring of existing code. The complete backend class diagram can be seen below.

*Backend Class Diagram*

![ECS](image/full-class-diagram.png)

#### Front End

Early in the design process, we used sequence diagrams to conceptualise how the menu system should function, mapping out transitions between screens before any code was written. The diagram below illustrates a typical user journey through the game, from the title screen to gameplay and back again. By tracing the player’s path across different scenes, we identified which state needed to be preserved and chose an appropriate design pattern to support these transitions.

This process informed key decisions—for example, overlaying the pause menu on top of the live game rather than replacing it, allowing for a seamless resume experience. During gameplay, the player interacts directly with the game world while the system responds in real time. If the player dies, a Game Over screen is displayed, offering the choice to retry the level or return to the main menu, thereby completing the loop. Overall, this approach provided a strong foundation to build upon as development progressed.

*Frontend Example Sequence Diagram*

![ECS](image/frontend-sequence-diagram.png)

The game uses a Scene Manager pattern to control which screen is shown at any time, such as the main menu, gameplay, or pause screen. Each screen is represented as a "Scene" object with a common set of methods: **setup** to initialise, **update** to run logic, **display** to render, and **dispose** to clean up. A central SceneManager holds a reference to whichever scene is currently active and forwards every frame update and input event to it, keeping the rest of the codebase decoupled from scene-specific logic. This approach makes it straightforward to add new screens independently and keeps each scene's logic self-contained.

*Frontend Class Diagram*

![ECS](image/scene-manager-diagram.png)

### Implementation

Our implementation of CrateBox is grounded in two key areas of technical challenge that shaped both the architecture and the development process: building a functional Entity–Component–System (ECS) engine from scratch, and ensuring the game maintains consistent visual and physical quality across different screen sizes and zoom levels.

#### Challenge 1: Implementing Floating Enemy

One of the most distinctive enemies in CrateBox is the floating enemy — a ghost-like entity that partially ignores gravity and actively hunts the player through the air. Designing its movement behaviour proved to be one of the more nuanced implementation challenges: a direct pursuit strategy from the moment of spawn caused enemies to lock onto the player immediately and press straight into walls, where they would become permanently stuck rather than posing any real threat.

The naive approach — computing a unit vector from the enemy's position to the player's position every frame and applying acceleration in that direction — worked in open space but failed whenever geometry intervened. An enemy spawned above a wall would accelerate horizontally into it and remain pinned there, because the target direction never changed. The result was cluttered, non-threatening enemies that degraded the gameplay experience.

Our solution introduces a `Floating` component (`src/ecs/components/floating.js`) that carries a single boolean flag, `wasInRange`. When a floating enemy is created (`src/ecs/entity_factory.js`), it is assigned a random initial horizontal velocity and a vertical acceleration of only `gravity / 5` — a fraction of normal gravity — so that it drifts passively through the level rather than charging at the player from the outset.

The `FloatingSystem` (`src/ecs/systems/floating_system.js`) runs each frame on every entity that carries both `Floating` and `Enemy` components. It computes the Euclidean distance from the enemy to the player via `Math.hypot`. If that distance falls within half the screen height, the system sets `wasInRange` to `true` and replaces the enemy's acceleration with a vector pointing directly toward the player, scaled by `floatingEnemyAccel`. This makes the enemy accelerate smoothly toward the player only once it is genuinely close.

When the enemy subsequently drifts back out of range, the `wasInRange` flag triggers a reset: acceleration reverts to the reduced-gravity constant, and horizontal velocity is reassigned a random direction. This return to drift behaviour is the key insight — instead of continuing to press against whatever geometry blocked the pursuit, the enemy re-enters a natural floating state and eventually drifts back into range from a different angle, maintaining the sense of an eerie, persistent threat without the wall-stuck pathology.

#### Challenge 2: Maintaining Game Quality And Performance

The game needed to look and feel identical across different machines — and that turned out to be harder than expected. Mac users saw the animated background running smoothly, while teammates on lower-end Windows laptops experienced severe frame-rate drops. The culprit was the animated background shader in `src/UI/draw_background.js`, a GLSL fragment shader adapted from Shadertoy that executes a 200-iteration raymarching loop for every pixel it draws. At full canvas resolution on an integrated GPU, that volume of fragment shader work was simply too much.

The fix was a render-scale offscreen buffer. Rather than running the shader at full canvas resolution, `bgShader` creates an offscreen `createGraphics` buffer at 40% of the canvas size (`_renderScale = 0.4`), runs the shader there, then upscales the result to fill the canvas via a single `image()` call. Because fragment shader cost scales with pixel count, dropping to 40% in each dimension reduces GPU work to roughly 16% of what full resolution would require — enough to make the background runnable on weak hardware. `pixelDensity(1)` is also set on the offscreen buffer to prevent HiDPI displays from silently doubling the internal resolution and erasing the saving. If the window is resized, `_ensureOffscreen` detects the dimension change and recreates the buffer at the new scaled size, so the optimisation holds at any window size.

A second cross-device problem was physics consistency across different display refresh rates. P5.js calls `draw()` once per display frame, so on a 120 Hz monitor physics would run twice as fast as on a 60 Hz screen. We resolved this in `src/game.js` with `const dt = deltaTime / (1000 / 60)`, which normalises P5's built-in `deltaTime` to a 60 fps baseline — yielding `dt = 1.0` at 60 Hz, `dt = 0.5` at 120 Hz, and `dt = 2.0` at 30 Hz. Every physics integration in the `PhysicsSystem` and `FloatingSystem` multiplies by `dt`, so gravity, velocity, and acceleration advance by the correct amount regardless of the hardware.

For geometry and layout, all positions and sizes are defined on a 32×18 normalised grid (`src/config/level_factory.js`). 32 and 18 are exact multiples of the 16:9 aspect ratio (32 = 2×16, 18 = 2×9), so each cell maps cleanly to pixels at any resolution, and a single grid cell produced a wall and box width that felt right for gameplay without manual tuning. Every physics constant is converted from grid-relative values to pixels once at level load in `LevelFactory.build()` — gravity, player speed, jump velocity, terminal velocity, enemy speed, and floating enemy acceleration are all pre-scaled before being passed to the systems, so at runtime no per-frame conversion is needed and the update loop stays lean on any device.


### Evaluation

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

#### Solutions and Adjustments

**Navigation and Map**
*   **Issues:** Users found the movement smooth and enjoyable, however they found that the character could travel outside of the map boundaries.
*   **Solution:** We implemented strict level colliders and invisible walls around the top of the map, so that players could not jump into the hole for the enemy spawn point.

**Game Objectives and Goal clarity**
*   **Issues:** Players were confused about the win conditions. This was brought on by the lack of player death and a score tracker, and led to players not being incentivised to engage with the core mechanics of the game.
*   **Solutions:** A score tracker was added, informing players of how many crates they had collected, and player death was implemented, giving a clear sense of the fail conditions of the game.

**Enemy Pathing and Difficulty**
*   Enemy pathing and the presence of spots in the map where enemies did not cover led to users feeling as though enemies were not dangerous.
*   **Solutions:** We implemented a new type of enemy, the floating enemy, which would intercept the player regardless of map position, and revised the enemy pathing to cover the whole map.

#### Heuristic Evaluation
To complement the Think-Aloud method, and to make up for the tendency of its results to be skewed by the social desiribility bias, we also utilised the Heuristic evaluation method as well. Five participants spent approximately half an hour going through the game and its interfaces multiple times, noting down any issues in the game’s usability as according to Nielsen’s 10 Principles of heuristic evaluation. These notes were then compiled and then subsequently worked over.

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

#### Quantitative Analysis: System Usability Scale (SUS)
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

*Comparison of System Usability Scale (SUS) Scores across Easy and Hard difficulties.*

**Performance Analysis & Interpretation:** The Wilcoxon Signed Rank Test yielded a p-value of 1.0 confirming that the shift in difficulty did not statistically impact usability. With average scores of 68.25 and 68.2 (consistent with the industry average of 68), the data proves that the fixes to collision, boundaries and enemy pathing were effective. The consistency of the scores suggests that difficulty was implemented correctly; the game remained intuitive, and the “Hard” difficulty provided a challenge without causing frustration from encountering bugs. However, these scores do reveal clear room for improvement, with users highlighting the need for enhanced accessibility (customisable controls) and better visual design. Overall, the study clearly shows that the initial issues had been successfully resolved, providing an engaging sense of danger to drive users to pursue the win conditions.

### Process 

#### Team Structure & Shared Accountability
At the project's conception, our team adopted a flat structure where all members contributed equally to decision-making while delegating tasks based on individual technical strengths. We divided the development into **Frontend** (animations, environment rendering, and UI) and **Backend** (ECS engine logic, physics, and weapon systems). 

To ensure our development stayed aligned with stakeholder expectations, one team member consistently acted as the **Client/Product Owner**. This role was responsible for validating features against our initial requirements and providing critical feedback during our "live" demonstrations, ensuring the "user's voice" was never lost in the technical implementation.

#### Sprint Cadence: Planning & Retrospectives
Our development followed a rigorous weekly agile cadence. We utilized **Tuesday workshop sessions** for **Sprint Planning**, where we brainstormed objectives, estimated task complexity, and assigned Jira tickets. To ensure transparency and iterative growth, we held **Friday Retrospectives** to showcase new features, reflect on the week's blockers, and discuss areas for improvement. This routine allowed us to transition from abstract ideas to technical proof-of-concepts effectively.

| **Sprint Management (Jira)** | **Visual Prototyping (Miro)** |
| :---: | :---: |
| <img src="./image/jira_kanban.png" width="400"> | <img src="./image/miro.png" width="400"> |
| *Figure 17: Weekly task tracking and sprint progress.* | *Figure 18: Collaborative design and UI/UX sketching.* |

During the early stages, we also utilized physical **Paper Prototyping** (see Figure 19) to validate our mechanics before writing a single line of code. This "low-fidelity" approach was instrumental in deciding to prioritize the "Lights Out" mechanic, which eventually became a core feature of the game.

#### Technical Workflow & Quality Control
To maintain high code quality and a clean project history, we implemented a strict Git Flow strategy. Work was strictly isolated in `feature/` or `fix/` branches, requiring at least one peer code review and approval before merging into the main branch. We prioritized a **linear history** through rebasing to keep the integration of complex systems—like the Projectile and Weapon systems—auditable. Furthermore, we standardized our communication using a semantic commit message style (e.g., `feat:`, `fix:`, `chore:`), which allowed the team to track progress at a glance.

| **Commit Standards** | **Git Flow Architecture** |
| :---: | :---: |
| <img src="./image/commit_style.png" width="400"> | <img src="./image/gitflow.png" width="400"> |
| *Figure 20: Standardized prefixes for a clear version history.* | *Figure 21: Branching strategy for modular development.* |

#### Reflections & Adaptations
While our Agile framework provided a strong foundation, the reality of development presented several challenges that required us to adapt our working style:

**Challenge 1: Task Overlap & Ambiguity**
    **What Didn't Work:** Because we were all navigating game development and p5.js for the first time, initial task boundaries were blurry. Teammates occasionally modified shared files independently, leading to divergent logic and confusion.
    **How We Adapted:** We shifted to a more immediate communication style using our **WhatsApp Group** to flag file modifications in real-time. More importantly, we introduced **pair programming** sessions. This not only prevented overlapping work but also allowed us to share ideas and standardize our coding styles across the frontend and backend boundaries.

**Challenge 2: Feature Creep & Idea Convergence**
    **What Didn't Work:** During brainstorming, our team tended to be overly ambitious. We frequently proposed complex mechanics without knowing if they were technically viable, which stalled early prototyping.
    **How We Adapted:** We implemented a "verify early" rule. Instead of debating complex ideas abstractly, we forced ourselves to either draw a simplified, structural flow on **Miro** or build a bare-bones code proof-of-concept. This grounded our creativity in technical reality.

**Challenge 3: Git Conflicts**
    **What Didn't Work:** Frequent rebasing initially resulted in overwhelming merge conflicts, as isolated tasks ended up interacting with the same core game loops. 
    **How We Adapted:** We learned that working in silos is dangerous in game development. When a conflict arose, we stopped resolving them in isolation and immediately initiated quick sync calls with the involved teammates to negotiate the merge. This fundamentally changed our mindset: we learned to constantly read each other's code to anticipate integration points *before* pushing our branches, drastically reducing integration risks later in the project.

### Conclusion
- The CrateBox project has been a massive undertaking. At the early stage, we discussed and set the tone of the whole development process. Instead of using the heavily inherited Object-Oriented-Programming structure, we adopted an unfamiliar design pattern - Entity-Component-System (ECS), which gave us a hard time to learn it in the beginning, but huge development benefits later down the road. Moreover, we implemented change control policies for our Github repo, which meant someone needed to review the code before any pull-request being merged or rebased into the main branch, and had standard formatting for the commit messages. 
These all helped us collaborate more easily and smoothly. 

- Throughout the project, we had regular meetings each week, using Jira to monitor the progress of the project, and Git to preserve the stages of code development. We followed the coding style we had been taught in C and Java - the importance of good code structure, well-designed classes, DRY code, descriptive variable and function names. We refactored the code frequently, which made it more succinct and easy to understand. Many challenges were overcome during the development. From the design of different scenes, to the logic of floating enemies, to maintaining the same game quality when zooming in and out the screen, etc. We grew and sharpened our coding skills along the way, and worked collaboratively through those bottlenecks. 

- For future design of the CrateBox, we would like to integrate some of features we discussed in the beginning, but assessed to be too complex to deliver in the limited timeframes. For instance, the multiplayer feature, which makes the game more interactive, or adding more weapon types like landmine, sword, and grenade, which brings more diversity into the game. Currently, The CrateBox has three types of scenes - cave, iced, and sea, each one has totally different environment settings, we can bring more themes like jungle, or urban into it. We believe those features with some special effects will be able to boost the enjoyment of the game. 

- To conclude, we greatly enjoyed working together to create CrateBox. None of us had prior experience of game development, so the whole journey was more like trial-and-error, but the design decisions we made early on, especially adopting ECS, proved to be the foundation that carried us through. Eventually, we understood a new design pattern, implemented what we had learnt in other courses, and strengthened Git and Github, which integrated the whole knowledge into one project. We are very proud of what we were able to deliver. It's a phenomenal experience.

### Contribution Statement

- Provide a table of everyone's contribution, which *may* be used to weight individual grades. We expect that the contribution will be split evenly across team-members in most cases. Please let us know as soon as possible if there are any issues with teamwork as soon as they are apparent and we will do our best to help your team work harmoniously together.

### Additional Marks

You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be marking you on the following two points:

- **Quality** of report writing, presentation, use of figures and visual material (5% of report grade) 
  - Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly available.
- **Documentation** of code (5% of report grade)
  - Organise your code so that it could easily be picked up by another team in the future and developed further.
  - Is your repo clearly organised? Is code well commented throughout?
