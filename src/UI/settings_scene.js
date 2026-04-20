class SettingsScene extends Scene {
    constructor(sceneToDisplayUnderneath, sceneToReturnTo) {
        super();
        this.sceneToDisplayUnderneath = sceneToDisplayUnderneath;
        this.sceneToReturnTo = sceneToReturnTo || sceneToDisplayUnderneath;
        
        this.menuIndex = 0;

        this.moveSchemes  = Object.keys(defaults.controls.movement);
        this.shootSchemes = Object.keys(defaults.controls.shoot);
        this.moveIndex  = this.moveSchemes.indexOf(GameSettings.moveScheme);
        this.shootIndex = this.shootSchemes.indexOf(GameSettings.shootScheme);
        if (this.moveIndex  === -1) this.moveIndex  = 0;
        if (this.shootIndex === -1) this.shootIndex = 0;

        this.menuItems = ["MOVEMENT", "SHOOT KEY", "SFX VOL", "MUSIC VOL", "MUTE", "BACK"];

        this.sfxVolume = GameSettings.sfxVolume;
        this.bgVolume = GameSettings.bgVolume;
        this.isMuted = GameSettings.muted;
    }

    display() {
        // Draw the play scene or menu scene first so it's visible behind the settings menu
        if (this.sceneToDisplayUnderneath) {
            this.sceneToDisplayUnderneath.display();
        }

        push();
        // Since other scenes use WEBGL translation, we need to handle it or match it
        translate(-width / 2, -height / 2);

        // Dark translucent overlay — more opaque over the busy main menu
        const overlayAlpha = (this.sceneToDisplayUnderneath instanceof MenuScene) ? 230 : 180;
        fill(0, 0, 0, overlayAlpha);
        noStroke();
        rect(0, 0, width, height);

        let titleSize = min(width, height) * 0.1;

        // Uses ShadowText for title
        new ShadowText("SETTINGS", width/2, height*0.2, titleSize, 255, color(0), titleSize*0.1).display();

        // Control texts with ShadowText
        let fontSize = titleSize * 0.4;
        let listTop = height * 0.33;
        let listBottom = height * 0.95;
        let spacing = (listBottom - listTop) / this.menuItems.length;
        let startY = listTop + spacing * 0.5;

        for (let i = 0; i < this.menuItems.length; i++) {
            let item = this.menuItems[i];
            let label = item;
            if (item === "MOVEMENT")  label = "MOVEMENT [ "  + this.moveSchemes[this.moveIndex].toUpperCase()   + " ]";
            if (item === "SHOOT KEY") label = "SHOOT KEY [ " + this.shootSchemes[this.shootIndex].toUpperCase() + " ]";
            if (item === "SFX VOL")   label = "SFX VOL [ "   + this.sfxVolume + " ]";
            if (item === "MUSIC VOL") label = "MUSIC VOL [ " + this.bgVolume  + " ]";
            if (item === "MUTE") label = "MUTE [ " + (this.isMuted ? "ON" : "OFF") + " ]";

            let isSelected = (i === this.menuIndex);
            let displayText = label;
            let displayColor = isSelected ? color(255, 240, 120) : color(255);

            new ShadowText(
                displayText,
                width / 2,
                startY + (i * spacing),
                fontSize,
                displayColor,
                color(0),
                fontSize * 0.1
            ).display();
        }
        pop();
    }

    handleKeyPressed() {
        if (keyCode === UP_ARROW || key === 'w' || key === 'W') {
            this.menuIndex = (this.menuIndex - 1 + this.menuItems.length) % this.menuItems.length;
        } else if (keyCode === DOWN_ARROW || key === 's' || key === 'S') {
            this.menuIndex = (this.menuIndex + 1) % this.menuItems.length;
        } else if (keyCode === ENTER || key === ' ') {
            this.handleSelection();
        } else if (keyCode === LEFT_ARROW || key === 'a' || key === 'A' || keyCode === RIGHT_ARROW || key === 'd' || key === 'D') {
            this.handleHorizontal(
                (keyCode === LEFT_ARROW || key === 'a' || key === 'A') ? -1 : 1
            );
        } else if (keyCode === ESCAPE) {
            sceneManager.resumeScene(this.sceneToReturnTo);
        }
    }

    handleHorizontal(dir) {
        let item = this.menuItems[this.menuIndex];
        if (item === "MOVEMENT") {
            this.moveIndex = (this.moveIndex + dir + this.moveSchemes.length) % this.moveSchemes.length;
            GameSettings.moveScheme = this.moveSchemes[this.moveIndex];
            if (gameInstance && gameInstance.ecs) {
                const inputSys = gameInstance.ecs.getSystem(InputSystem);
                if (inputSys) inputSys.setControlScheme(GameSettings.moveScheme, GameSettings.shootScheme);
            }
        } else if (item === "SHOOT KEY") {
            this.shootIndex = (this.shootIndex + dir + this.shootSchemes.length) % this.shootSchemes.length;
            GameSettings.shootScheme = this.shootSchemes[this.shootIndex];
            if (gameInstance && gameInstance.ecs) {
                const inputSys = gameInstance.ecs.getSystem(InputSystem);
                if (inputSys) inputSys.setControlScheme(GameSettings.moveScheme, GameSettings.shootScheme);
            }
        } else if (item === "SFX VOL") {
            this.sfxVolume = constrain(this.sfxVolume + dir * 5, 0, 100);
            GameSettings.sfxVolume = this.sfxVolume;
            soundManager.setSfxVolume(this.sfxVolume);
        } else if (item === "MUSIC VOL") {
            this.bgVolume = constrain(this.bgVolume + dir * 5, 0, 100);
            GameSettings.bgVolume = this.bgVolume;
            soundManager.setBgVolume(this.bgVolume);
        } else if (item === "MUTE") {
            this.isMuted = !this.isMuted;
            GameSettings.muted = this.isMuted;
            soundManager.setMuted(this.isMuted);
        }
    }

    handleSelection() {
        if (this.menuItems[this.menuIndex] === "BACK") {
            sceneManager.resumeScene(this.sceneToReturnTo);
        }
    }

    handleMousePressed() {
        // Disabled
    }

    dispose() {
        // Cleanup if needed
    }
}
