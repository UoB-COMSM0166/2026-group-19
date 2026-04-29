/**
 * Marks an enemy as dead and in its tumble-off-screen animation.
 * Enemy and Character components are removed when this is added; the entity
 * is fully removed once it falls below the screen.
 */
class Dying {
   constructor() {
      this.rotation = 0;
      this.rotationSpeed = (Math.random() - 0.5) * 0.5;
   }
}