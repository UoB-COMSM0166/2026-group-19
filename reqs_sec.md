### Initial Genre Brainstorming & Selection Tally

The first stage of our development process was to identify what type of game we wanted to make.
To begin, we discussed what types of games we enjoyed engaging with, and ended up with a list of genres that we all felt had potential. We used dot-voting to rank our preferences, allowing three votes per person. This allowed us to avoid anchoring onto one person's opinion and acted as a natural risk assessment, resulting in the ‘Action-Arcade Platformer’ and ‘Launcher’ genres tied first place.

### Initial Genre Selection Results

| Genre | Total Votes | Status |
| :--- | :---: | :--- |
| **Launcher** | 4 | **Provisionally Selected** |
| **Action-Arcade Platformer** | 4 | **Provisionally Selected** |
| **"Cozy" Sims / Farming Sims** | 3 | High Interest |
| **Roguelike (RPG)** | 3 | High Interest |
| **Puzzles** | 3 | High Interest |
| **Racing** | 2 | Low Interest |
| **Fighting / Action** | 2 | Low Interest |
| **Tower Defense** | 2 | Low Interest |
| **Survival / Crafting** | 1 | Dropped |
| ~~**Horror**~~ | - | Scratched |
| ~~**Exploration**~~ | - | Scratched |

<table>
  <tr>
    <td><img src="image/launchers.jpg" style="height:180; width:auto;"/></td>
    <td><img src="image/action-arcade2.jpg" style="height:180; width:auto;"/></td>
  </tr>
</table>

Not wanting to pick a focus immediately, we explored a range of games from each genre and, through another vote, selected Super Crate Box and Learn 2 Fly as the two ideas that we would bring forward for user testing via a paper prototyping session.

<table>
  <tr>
    <td><img src="assets/crate_paper_prototype.gif" style="height:180; width:auto;"/></td>
    <td><img src="assets/pingu_prototype-cropped.gif" style="height:180; width:auto;"/></td>
  </tr>
</table>


During user testing, users much preferred the Super Crate Box style game, noting that it had clearer objectives and more intuitive game mechanics. Our group was also more motivated to pursue this direction, as the Super Crate Box concept offered greater potential for expansion beyond the original, such as introducing new enemies, items, and additional gameplay features.
The 'lights out!' feature was liked a lot by playtesters and made its way to our final game, in the form of the dark mine area in level 1.

![Onion Model of Stakeholders](./image/OnionModel.jpg)


### Epics and User Stories

We categorized our requirements into a range of Epics to ensure all stakeholder needs from our Onion Model were addressed. Sections of two epics are displayed below as examples of this process.

#### Epic 1: Core Combat & Arcade Physics
* **User Story 1.1:** As a Player, I want responsive gravity and platform collision, so that movement feels precise and fair.

    * **Acceptance Criteria 1.1:** Given the player is in mid-air (not touching a platform), When the game loop updates, Then the player’s vertical velocity must increase by the gravity constant.
* **User Story 1.2:** As a Player, I want to collect crates that instantly swap my weapon, so that the gameplay remains dynamic and challenging.

    * **Acceptance Criteria 1.2:** Given the player overlaps with a weapon crate, When the collision is detected, Then the crate must be removed from the canvas and the player's currentWeapon variable must be updated.

#### Epic 3: Inclusive Design (Accessibility)
* **User Story 3.1:** As a Player with motor impairments, I want to choose different parts of the control scheme independently from each other, so that I can play comfortably.

    * **Acceptance Criteria 3.1:** Given the player is in the settings menu, When they interact with the key configuration options, Then they must be able to choose between specific preset key mappings independently of each other.
* **User Story 3.2:** As a Player with hearing impairments, I want visual feedback for health loss, so that I don't miss critical game-state changes.

    * **Acceptance Criteria 3.2:** Given the player character takes damage, When the health reduction occurs, Then the player must flash red simultaneously with any audio cues.

###  Project Prioritization (MoSCoW Matrix)

| Feature | Effort | Value | MoSCoW Bucket | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Core Physics & Gravity** | High | Critical | Must Have | The game is unplayable without stable physics, thus this is required for even the MVP. |
| **Randomized Weapon Crates** | Medium | High | Must Have | This is the main hook of the game, and forms the fundamental gameplay loop .|
| **Multiple Control Schemes** | Low | High | Should Have | Allows players with control related accessiblity needs to optimise their play. |
| **Visual Hit-Flash Feedback** | Low | Medium | Should Have | Aids deaf players who cannot hear the 'hurt' sound effect to play easily. |
| **Pause Menu & State Control** | Low | Medium | Should Have | Important for user control and allowing breaks without losing progress. |
| **Local High Score Saving** | Medium | Medium | Could Have | This would encourage replayability but is not required for an early game iteration. |
| **Online Global Leaderboard** | High | Medium | Won't Have | Leads to high server-side complexity and data protection considerations, with limited interest from playtesters. |

### Use Case Diagram
![Use Case Diagram](./image/use_case_diagram.jpg)

