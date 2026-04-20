### Initial Genre Brainstorming & Investigation

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

### Paper Prototyping Sessions
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

### Identification of Stakeholders

![Onion Model of Stakeholders](./image/OnionModel.jpg)

### Epics and User Stories

We categorized our requirements into a range of Epics to ensure all stakeholder needs from our Onion Model were addressed. Sections of two epics are displayed below as examples of this process.

### Epic 1: Core Combat & Arcade Physics
* **User Story 1.1:** As a Player, I want responsive gravity and platform collision, so that movement feels precise and fair.

    * **Acceptance Criteria 1.1.1:** Given the player is in mid-air (not touching a platform), When the game loop updates, Then the player’s vertical velocity must increase by the gravity constant.
    * **Acceptance Criteria 1.1.2:** Given the player is moving upward during a jump, When they collide with the underside of a platform, Then their vertical velocity must instantly reset to zero to prevent "clipping."
* **User Story 1.2:** As a Player, I want to collect crates that instantly swap my weapon, so that the gameplay remains dynamic and challenging.

    * **Acceptance Criteria 1.2.1:** Given the player overlaps with a weapon crate, When the collision is detected, Then the crate must be removed from the canvas and the player's currentWeapon variable must be updated.
    * **Acceptance Criteria 1.2.2:** Given the player presses the 'Shoot' key, When the time since the last shot is less than that specific weapon's coolDown value, Then no new projectile should be spawned.

### Epic 3: Inclusive Design (Accessibility)
* **User Story 3.1:** As a Player with motor impairments, I want to choose different parts of the control scheme independently from each other, so that I can play comfortably.

    * **Acceptance Criteria 3.1.1:** Given the player is in the settings menu, When they interact with the key configuration options, Then they must be able to choose between specific preset key mappings independently of each other.
    * **Acceptance Criteria 3.1.2:** Given a specific control scheme has been selected and saved, When the player presses the designated keys in that scheme, Then the corresponding "Movement" or "Shoot" actions must trigger in-game.
* **User Story 3.2:** As a Player with hearing impairments, I want visual feedback for key game events, so that I don't miss critical game-state changes.

    * **Acceptance Criteria 3.2.1:** Given the player character takes damage, When the health reduction occurs, Then the player must flash red simultaneously with any audio cues.
    * **Acceptance Criteria 3.2.2:** Given the player collects a new weapon, When the crate is removed from the canvas, Then a text notification must appear in the UI.

###  Project Prioritization - MoSCoW Analysis

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

### Use Case Diagram
![Use Case Diagram](./image/use_case_diagram.jpg)
