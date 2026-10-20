import { useEffect, useRef } from "react";

const VERT = `#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const SIM = `#version 300 es
precision highp float;
uniform sampler2D uMap;
uniform vec2 uRes;
uniform vec2 uFrom;
uniform vec2 uTo;
uniform float uDt;
uniform float uTime;
uniform float uSpeed;
uniform float uActive;
out vec4 outColor;

vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  vec3 ns = 0.142857142857 * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

vec2 curl(vec2 p, float t){
  const float e = 0.02;
  float n1 = snoise(vec3(p.x, p.y + e, t));
  float n2 = snoise(vec3(p.x, p.y - e, t));
  float n3 = snoise(vec3(p.x + e, p.y, t));
  float n4 = snoise(vec3(p.x - e, p.y, t));
  return vec2(n1 - n2, n4 - n3) / (2.0 * e);
}

float segDist(vec2 p, vec2 a, vec2 b){
  vec2 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
  return length(pa - ba * h);
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 texel = 1.0 / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 flow = curl(vec2(uv.x * aspect, uv.y) * 2.4 + vec2(0.0, uTime * 0.04), uTime * 0.07);
  vec2 src = uv - flow * uDt * 0.009 - vec2(0.0, uDt * 0.04);
  vec3 c = texture(uMap, src).rgb;
  vec3 blur = (texture(uMap, src + vec2(texel.x, 0.0)).rgb +
               texture(uMap, src - vec2(texel.x, 0.0)).rgb +
               texture(uMap, src + vec2(0.0, texel.y)).rgb +
               texture(uMap, src - vec2(0.0, texel.y)).rgb) * 0.25;
  c = mix(c, blur, 0.4);
  c *= 1.0 - uDt * 0.8;

  vec2 p = vec2((uv.x * 2.0 - 1.0) * aspect, uv.y * 2.0 - 1.0);
  float d = segDist(p, uFrom, uTo);
  float speed = clamp(uSpeed * 9.0, 0.0, 1.0);
  float radius = mix(0.09, 0.22, speed);
  float amount = uActive * mix(0.22, 1.0, speed);
  float g = exp(-(d * d) / (radius * radius));

  vec3 pool = vec3(0.08, 0.12, 0.38);
  vec3 body = vec3(0.314, 0.439, 1.0);
  vec3 core = vec3(0.992, 0.510, 0.337);

  c = mix(c, pool, g * amount * 0.7);
  c = mix(c, body, pow(g, 2.5) * amount * 0.8);
  c = mix(c, core, pow(g, 8.0) * amount * 0.45);

  outColor = vec4(clamp(c, 0.0, 1.0), 1.0);
}`;

const DRAW = `#version 300 es
precision highp float;
uniform sampler2D uMap;
uniform vec2 uRes;
out vec4 outColor;
void main(){
  vec3 c = texture(uMap, gl_FragCoord.xy / uRes).rgb;
  float a = max(max(c.r, c.g), c.b);
  outColor = vec4(c, a);
}`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function program(gl: WebGL2RenderingContext, frag: string) {
  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  return prog;
}

export function SmokeFX() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      premultipliedAlpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const sim = program(gl, SIM);
    const draw = program(gl, DRAW);
    if (!sim || !draw) return;

    const loc = {
      map: gl.getUniformLocation(sim, "uMap"),
      res: gl.getUniformLocation(sim, "uRes"),
      from: gl.getUniformLocation(sim, "uFrom"),
      to: gl.getUniformLocation(sim, "uTo"),
      dt: gl.getUniformLocation(sim, "uDt"),
      time: gl.getUniformLocation(sim, "uTime"),
      speed: gl.getUniformLocation(sim, "uSpeed"),
      active: gl.getUniformLocation(sim, "uActive"),
      dMap: gl.getUniformLocation(draw, "uMap"),
      dRes: gl.getUniformLocation(draw, "uRes"),
    };

    const vao = gl.createVertexArray();
    const buffers: { tex: WebGLTexture; fb: WebGLFramebuffer }[] = [];
    let w = 0;
    let h = 0;
    let ping = 0;

    const makeTarget = (width: number, height: number) => {
      const tex = gl.createTexture();
      const fb = gl.createFramebuffer();
      if (!tex || !fb) return null;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return { tex, fb };
    };

    const resize = () => {
      const nextW = Math.max(1, Math.round(window.innerWidth / 2));
      const nextH = Math.max(1, Math.round(window.innerHeight / 2));
      if (nextW === w && nextH === h) return;
      w = nextW;
      h = nextH;
      canvas.width = w;
      canvas.height = h;
      buffers.splice(0).forEach((item) => {
        gl.deleteTexture(item.tex);
        gl.deleteFramebuffer(item.fb);
      });
      const a = makeTarget(w, h);
      const b = makeTarget(w, h);
      if (a && b) buffers.push(a, b);
    };

    const pointer = { x: 0, y: 0, px: 0, py: 0, seen: false, idle: 0 };
    const toAspect = (x: number, y: number): [number, number] => {
      const aspect = window.innerWidth / window.innerHeight;
      return [((x / window.innerWidth) * 2 - 1) * aspect, (1 - y / window.innerHeight) * 2 - 1];
    };

    const onMove = (event: PointerEvent) => {
      const [x, y] = toAspect(event.clientX, event.clientY);
      if (!pointer.seen) {
        pointer.px = x;
        pointer.py = y;
      }
      pointer.x = x;
      pointer.y = y;
      pointer.seen = true;
      pointer.idle = 0;
    };

    const onLeave = () => {
      pointer.seen = false;
    };

    let frame = 0;
    let last = performance.now();
    let running = true;

    const tick = (now: number) => {
      if (!running) return;
      frame = requestAnimationFrame(tick);
      if (document.hidden) {
        last = now;
        return;
      }
      resize();
      if (buffers.length < 2) return;
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      pointer.idle += dt;
      const speed = Math.hypot(pointer.x - pointer.px, pointer.y - pointer.py);
      const next = 1 - ping;

      gl.bindVertexArray(vao);
      gl.bindFramebuffer(gl.FRAMEBUFFER, buffers[next].fb);
      gl.viewport(0, 0, w, h);
      gl.disable(gl.BLEND);
      gl.useProgram(sim);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, buffers[ping].tex);
      gl.uniform1i(loc.map, 0);
      gl.uniform2f(loc.res, w, h);
      gl.uniform2f(loc.from, pointer.px, pointer.py);
      gl.uniform2f(loc.to, pointer.x, pointer.y);
      gl.uniform1f(loc.dt, dt);
      gl.uniform1f(loc.time, now / 1000);
      gl.uniform1f(loc.speed, speed);
      gl.uniform1f(loc.active, pointer.seen ? Math.max(0, 1 - pointer.idle / 1.2) : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, w, h);
      gl.useProgram(draw);
      gl.bindTexture(gl.TEXTURE_2D, buffers[next].tex);
      gl.uniform1i(loc.dMap, 0);
      gl.uniform2f(loc.dRes, w, h);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      pointer.px = pointer.x;
      pointer.py = pointer.y;
      ping = next;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    resize();
    frame = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      buffers.forEach((item) => {
        gl.deleteTexture(item.tex);
        gl.deleteFramebuffer(item.fb);
      });
      gl.deleteProgram(sim);
      gl.deleteProgram(draw);
      gl.deleteVertexArray(vao);
    };
  }, []);

  return <canvas ref={ref} className="smokefx" aria-hidden />;
}
