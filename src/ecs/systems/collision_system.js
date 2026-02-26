class CollisionSystem {
    update(ecs) {
        const ids = ecs.getEntitiesWith(Position, Collider);

        // Loop through all possible pairs of colliders to check for collisions
        for (let i = 0; i < ids.length; i++) {
            for (let j = i + 1; j < ids.length; j++) {
                const aId = ids[i];
                const bId = ids[j];

                const pa = ecs.getComponent(aId, Position);
                const pb = ecs.getComponent(bId, Position);
                const ca = ecs.getComponent(aId, Collider);
                const cb = ecs.getComponent(bId, Collider);

                const bb_a = ca.getBoundingBox(pa);
                const bb_b = cb.getBoundingBox(pb);

                // If no collision, go to next pair
                if (!this.collides(bb_a, bb_b)) {
                    continue;
                }

                // Could make this more fun by adding an impulse on collision
                const sep = this.computeSeparation(bb_a, bb_b);
                this.applySeparation(pa, pb, ca, cb, sep);
            }
        }
    }

    collides(a, b) {
        // a and b are bounding boxes from collider.getBoundingBox(pos)
        return a.x < b.x + b.w &&
            a.x + a.w > b.x &&
            a.y < b.y + b.h &&
            a.y + a.h > b.y;
    }

    computeSeparation(a, b) {
        const axc = a.x + a.w / 2;
        const ayc = a.y + a.h / 2;
        const bxc = b.x + b.w / 2;
        const byc = b.y + b.h / 2;

        const dx = bxc - axc;
        const dy = byc - ayc;

        const overlapX = ((a.w + b.w) / 2) - Math.abs(dx);
        const overlapY = ((a.h + b.h) / 2) - Math.abs(dy);

        // If not colliding, return 0
        if (overlapX <= 0 || overlapY <= 0) {
            return { x: 0, y: 0 };
        }

        // Resolve collision in the least distance direction
        if (overlapX < overlapY) {
            return { x: (dx < 0 ? -1 : 1) * overlapX, y: 0 };
        } else {
            return { x: 0, y: (dy < 0 ? -1 : 1) * overlapY };
        }
    }

    applySeparation(pa, pb, ca, cb, sep) {
        if (ca.immovable && !cb.immovable) {
            // Move b
            pb.x += sep.x;
            pb.y += sep.y;
        }
        else if (!ca.immovable && cb.immovable) {
            // Move a
            pa.x -= sep.x;
            pb.y -= sep.y;
        }
        else {
            // Both movable: split correction
            pa.x -= sep.x * 0.5;
            pa.y -= sep.y * 0.5;
            pb.x += sep.x * 0.5;
            pb.y += sep.y * 0.5;
        }
    }
}