// backgorund.js
// p5.js (WEBGL) background shader drawn on a full-canvas rectangle at lower z depth.

class bgShader {
    constructor() {
      this._shaderInitFailed = false;
      this._loggedShaderError = false;
      this._renderScale = 0.4;
      this._offscreen = null;
      this._offscreenW = 0;
      this._offscreenH = 0;
      this._offscreenShader = null;
      this._resolution = [0, 0];
  
      // iChannel0 stand-in texture (noise)
      this._channel0 = null;
      this._channel0InitFailed = false;
  
      // Shadertoy -> p5 uniforms:
      // iTime        -> u_time (float)
      // iResolution  -> u_resolution (vec2)
      // iChannel0    -> u_channel0 (sampler2D)
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
  
      // Replaces the old fragment shader with the shader you provided (Shadertoy style).
      // Ported to WebGL1 (GLSL ES 1.00): texture2D + gl_FragColor.
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
                p.xz += u_time * 2.0;

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
  
    _createNoiseTexture(p, size = 256) {
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

    _ensureOffscreen(p) {
      if (this._shaderInitFailed) return;

      const targetW = Math.max(1, Math.floor(p.width * this._renderScale));
      const targetH = Math.max(1, Math.floor(p.height * this._renderScale));
      const sizeChanged = targetW !== this._offscreenW || targetH !== this._offscreenH;

      if (!this._offscreen || sizeChanged) {
        if (this._offscreen) {
          this._offscreen.remove();
        }
        this._offscreen = p.createGraphics(targetW, targetH, p.WEBGL);
        this._offscreen.pixelDensity(1);
        this._offscreen.textureWrap(this._offscreen.REPEAT);
        this._offscreenW = targetW;
        this._offscreenH = targetH;
        this._offscreenShader = this._offscreen.createShader(this.vert, this.frag);
      }
    }
  
    _ensureChannel0(p) {
      if (this._channel0 || this._channel0InitFailed) return;
  
      try {
        this._channel0 = this._createNoiseTexture(p);
      } catch (err) {
        console.error("Failed to create iChannel0 texture:", err);
        this._channel0InitFailed = true;
      }
    }
  
    // Call this every frame from your scene: background.display();
    display() {
      const p = window; // assumes global-mode p5
      this._ensureOffscreen(p);
      this._ensureChannel0(p);

      if (!this._offscreen || !this._offscreenShader) return;
  
      const g = this._offscreen;
      this._resolution[0] = g.width;
      this._resolution[1] = g.height;
  
      // Render shader at scaled offscreen resolution.
      g.push();
      g.noStroke();
      try {
        g.shader(this._offscreenShader);
      } catch (err) {
        if (!this._loggedShaderError) {
          console.error("Background shader failed to compile/link:", err);
          this._loggedShaderError = true;
        }
        this._shaderInitFailed = true;
        g.pop();
        return;
      }
  
      this._offscreenShader.setUniform("u_time", p.millis() / 1000.0);
      this._offscreenShader.setUniform("u_resolution", this._resolution);
      if (this._channel0) this._offscreenShader.setUniform("u_channel0", this._channel0);
  
      g.rectMode(g.CENTER);
      g.plane(g.width, g.height);
      g.resetShader();
      g.pop();

      // Upscale to full canvas and draw behind UI.
      p.push();
      p.translate(-p.width / 2, -p.height / 2, -10);
      p.imageMode(p.CORNER);
      p.noStroke();
      p.image(g, 0, 0, p.width, p.height);
      p.pop();
    }
  }
  
