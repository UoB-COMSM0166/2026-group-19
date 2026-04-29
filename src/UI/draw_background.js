/**
 * Renders an animated background using a GLSL shader in p5.js WEBGL mode.
 *
 * The vertex and fragment shader (this.vert, this.frag) were copied directly from Shadertoy and adapted
 * for p5.js.
 *
 * The shader is rendered at a reduced resolution (_renderScale = 0.4) into an
 * offscreen WEBGL buffer and then upscaled to the full canvas to improve performance.
 */
class bgShader {
    constructor() {
      this.shaderInitFailed = false;
      this.loggedShaderError = false;
      this.renderScale = 0.4;
      this.offscreen = null;
      this.offscreenW = 0;
      this.offscreenH = 0;
      this.offscreenShader = null;
      this.resolution = [0, 0];

      this.channel0 = null;
      this.channel0InitFailed = false;

      // Standard pass-through vertex shader.
      this.vert = `
        precision highp float;

        attribute vec3 aPosition;
        attribute vec2 aTexCoord;

        varying vec2 vTexCoord;

        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        void main() {
          vTexCoord = aTexCoord;
          gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
        }
      `;

      // Fragment shader copied from Shadertoy and adapted for p5.js (see class comment).
      this.frag = `
        precision mediump float;

        uniform vec2 u_resolution;
        uniform float u_time;
        uniform sampler2D u_channel0;

        varying vec2 vTexCoord;

        float T(vec4 p, inout float s){
            float v = texture2D(u_channel0,(s*p.zw+ceil(s*p.x))/200.0).y;
            s += s;
            return v/s*4.0;
        }

        void main(){

            vec2 uv = vec2(vTexCoord.x, 1.0 - vTexCoord.y);
            vec2 x = uv * u_resolution;

            vec4 p;
            vec4 d = vec4(.8,0.,x/u_resolution.y-.8);
            vec4 c = vec4(.3,.5,d);

            vec4 O = c - d.w;

            float t = 200.0 + sin(dot(x,x));

            for(int i=0;i<200;i++){

                float tt = t - float(i) - 1.0;
                float active = step(0.0, tt);

                p = .05*tt*d;
                p.xz += u_time * 0.5;

                float s = 2.0;

                float f =
                    p.w + 2.0
                    - T(p,s)
                    - T(p,s);

                float negF = 1.0 - step(0.0, f);
                float applyMask = active * negF;
                O += (O - 1.0 - f*c.zyxw) * f * .4 * applyMask;
            }

            O.a = 1.0;
            gl_FragColor = O;

        }
      `;
    }

    createNoiseTexture(p, size = 256) {
      const g = p.createGraphics(size, size);
      g.pixelDensity(1);
      g.loadPixels();
      for (let y = 0; y < g.height; y++) {
        for (let x = 0; x < g.width; x++) {
          const i = 4 * (y * g.width + x);
          const v = Math.floor(p.random(256));
          g.pixels[i + 0] = v;
          g.pixels[i + 1] = v;
          g.pixels[i + 2] = v;
          g.pixels[i + 3] = 255;
        }
      }
      g.updatePixels();
      return g;
    }

    ensureOffscreen(p) {
      if (this.shaderInitFailed) return;

      const targetW = Math.max(1, Math.floor(p.width * this.renderScale));
      const targetH = Math.max(1, Math.floor(p.height * this.renderScale));
      const sizeChanged = targetW !== this.offscreenW || targetH !== this.offscreenH;

      if (!this.offscreen || sizeChanged) {
        if (this.offscreen) {
          this.offscreen.remove();
        }
        this.offscreen = p.createGraphics(targetW, targetH, p.WEBGL);
        this.offscreen.pixelDensity(1);
        this.offscreen.textureWrap(this.offscreen.REPEAT);
        this.offscreenW = targetW;
        this.offscreenH = targetH;
        this.offscreenShader = this.offscreen.createShader(this.vert, this.frag);
      }
    }

    ensureChannel0(p) {
      if (this.channel0 || this.channel0InitFailed) return;

      try {
        this.channel0 = this.createNoiseTexture(p);
      } catch (err) {
        console.error("Failed to create iChannel0 texture:", err);
        this.channel0InitFailed = true;
      }
    }

    /** Call once per frame from the active scene to draw the background. */
    display() {
      const p = window;
      this.ensureOffscreen(p);
      this.ensureChannel0(p);

      if (!this.offscreen || !this.offscreenShader) return;

      const g = this.offscreen;
      this.resolution[0] = g.width;
      this.resolution[1] = g.height;

      // Render the Shadertoy fragment shader into the low-resolution offscreen buffer.
      g.push();
      g.noStroke();
      try {
        g.shader(this.offscreenShader);
      } catch (err) {
        if (!this.loggedShaderError) {
          console.error("Background shader failed to compile/link:", err);
          this.loggedShaderError = true;
        }
        this.shaderInitFailed = true;
        g.pop();
        return;
      }

      this.offscreenShader.setUniform("u_time", p.millis() / 1000.0);
      this.offscreenShader.setUniform("u_resolution", this.resolution);
      if (this.channel0) this.offscreenShader.setUniform("u_channel0", this.channel0);

      g.rectMode(g.CENTER);
      g.plane(g.width, g.height);
      g.resetShader();
      g.pop();

      // Upscale the offscreen buffer to full canvas resolution and draw behind everything.
      p.push();
      p.translate(-p.width / 2, -p.height / 2, -10);
      p.imageMode(p.CORNER);
      p.noStroke();
      p.image(g, 0, 0, p.width, p.height);
      p.pop();
    }

    dispose(){
        this.offscreen.remove();
    }

}
