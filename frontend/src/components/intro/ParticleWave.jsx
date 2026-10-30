import { useEffect, useRef } from "react";

export default function ParticleWave({
  density = 1,
  speed = 0.65,
  layers = 1,
  anchorY = 0.53,
  vignette = true,
  className = "",
  style = {},
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = 1;
    let height = 1;
    let dpr = 1;
    let rafId = 0;
    let lastTime = 0;
    let time = 0;
    let visible = !document.hidden;

    // Smooth cursor tracking.
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let mouseActive = false;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let reducedMotion = reducedMotionQuery.matches;

    const columns = Math.round(
      Math.max(80, Math.min(160, 125 * density))
    );

    const rows = Math.round(
      Math.max(28, Math.min(55, 42 * density))
    );

    const meshLayers = Math.max(
      1,
      Math.min(2, Math.round(layers))
    );

    const clamp = (value, min, max) =>
      Math.max(min, Math.min(max, value));

    // --------------------------------------------------
    // CURSOR INTERACTION
    // --------------------------------------------------

    const onPointerMove = (event) => {
      const rect = container.getBoundingClientRect();

      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside) {
        mouseActive = false;
        targetX = 0;
        targetY = 0;
        return;
      }

      mouseActive = true;

      targetX =
        ((event.clientX - rect.left) / Math.max(rect.width, 1)) *
          2 -
        1;

      targetY =
        ((event.clientY - rect.top) / Math.max(rect.height, 1)) *
          2 -
        1;
    };

    const onPointerLeaveWindow = () => {
      mouseActive = false;
      targetX = 0;
      targetY = 0;
    };

    // --------------------------------------------------
    // PROCEDURAL TERRAIN
    // --------------------------------------------------

    const terrain = (u, v, t) => {
      const x = (u - 0.5) * 2;
      const z = v;

      // Large, slowly moving hills.
      const broad =
        Math.sin(x * 4.8 + z * 3.8 - t * 0.28) * 0.14;

      const rolling =
        Math.sin(x * 8.2 - z * 5.6 + t * 0.2) * 0.075;

      const cross =
        Math.cos(x * 3.4 + z * 9.0 - t * 0.16) * 0.065;

      // Smaller ridges provide a natural wireframe appearance.
      const ridges =
        Math.sin(x * 12.5 + z * 5.5 + t * 0.12) *
        Math.cos(z * 7.5 - x * 3.2) *
        0.04;

      const detail =
        Math.sin(x * 18 - z * 11 + t * 0.1) * 0.015;

      // Broad, asymmetric peaks.
      const hill1 =
        Math.exp(
          -(
            ((u - 0.19) / 0.16) ** 2 +
            ((v - 0.43) / 0.24) ** 2
          )
        ) * 0.17;

      const hill2 =
        Math.exp(
          -(
            ((u - 0.77) / 0.19) ** 2 +
            ((v - 0.36) / 0.25) ** 2
          )
        ) * 0.23;

      const hill3 =
        Math.exp(
          -(
            ((u - 0.49) / 0.22) ** 2 +
            ((v - 0.68) / 0.25) ** 2
          )
        ) * 0.11;

      return (
        broad +
        rolling +
        cross +
        ridges +
        detail +
        hill1 +
        hill2 +
        hill3
      );
    };

    // --------------------------------------------------
    // 3D SURFACE PROJECTION
    // --------------------------------------------------

    const surfacePoint = (u, v, layer, t) => {
      const perspective = 0.42 + v * 0.9;

      const worldX = (u - 0.5) * width * 1.42;

      let displacement = terrain(u, v, t);

      // Mouse movement physically deforms nearby parts
      // of the surface instead of moving only the lighting.
      if (mouseActive) {
        const cursorU = (mouseX + 1) * 0.5;
        const cursorV = (mouseY + 1) * 0.5;

        const dx = (u - cursorU) * 2;
        const dy = (v - cursorV) * 1.5;

        const distance = Math.sqrt(dx * dx + dy * dy);

        const radius = 0.58;

        const influence = Math.exp(
          -(distance * distance) / (radius * radius)
        );

        const ripple =
          Math.sin(distance * 15 - t * 2.5) * 0.095;

        const push =
          Math.cos(distance * 7 - t * 1.6) * 0.075;

        displacement += influence * (ripple + push);
      }

      // Subtle overall parallax.
      const parallaxX = mouseX * 9 * (0.3 + v * 0.7);
      const parallaxY = mouseY * 6 * (0.3 + v * 0.7);

      const layerOffset =
        meshLayers > 1 ? (layer === 0 ? -0.008 : 0.008) : 0;

      const x =
        width * 0.5 +
        worldX * perspective +
        parallaxX;

      const y =
        height * (anchorY + v * 0.22 + layerOffset) +
        displacement * height * perspective +
        parallaxY;

      return {
        x,
        y,
        u,
        v,
        perspective,
      };
    };

    // --------------------------------------------------
    // RENDER THE WAVE
    // --------------------------------------------------

    const draw = (t) => {
      ctx.fillStyle = "#030303";
      ctx.fillRect(0, 0, width, height);

      // Very subtle ambient light.
      const glow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.57,
        0,
        width * 0.5,
        height * 0.57,
        Math.max(width, height) * 0.8
      );

      glow.addColorStop(0, "rgba(190,200,215,0.055)");
      glow.addColorStop(0.5, "rgba(100,110,125,0.02)");
      glow.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Draw each mesh layer.
      for (let layer = 0; layer < meshLayers; layer++) {
        const layerOpacity =
          meshLayers === 1 ? 1 : layer === 0 ? 1 : 0.42;

        // Horizontal mesh curves.
        for (let row = 0; row <= rows; row++) {
          const v = row / rows;

          ctx.beginPath();

          for (let col = 0; col <= columns; col++) {
            const u = col / columns;
            const p = surfacePoint(u, v, layer, t);

            if (col === 0) {
              ctx.moveTo(p.x, p.y);
            } else {
              ctx.lineTo(p.x, p.y);
            }
          }

          const foreground = Math.pow(v, 1.35);

          ctx.lineWidth = 0.45 + foreground * 0.45;

          const opacity =
            (0.24 + foreground * 0.42) * layerOpacity;

          ctx.strokeStyle = `rgba(238,242,250,${opacity})`;
          ctx.stroke();
        }

        // Vertical curves create the continuous 3D grid.
        for (let col = 0; col <= columns; col += 2) {
          const u = col / columns;

          ctx.beginPath();

          for (let row = 0; row <= rows; row++) {
            const v = row / rows;
            const p = surfacePoint(u, v, layer, t);

            if (row === 0) {
              ctx.moveTo(p.x, p.y);
            } else {
              ctx.lineTo(p.x, p.y);
            }
          }

          ctx.lineWidth = 0.4;

          ctx.strokeStyle = `rgba(220,230,245,${
            (0.12 + u * 0.12) * layerOpacity
          })`;

          ctx.stroke();
        }
      }

      // Glowing particle intersections.
      // The density of points increases toward the foreground.
      for (let row = 1; row <= rows; row++) {
        const v = row / rows;

        for (let col = 0; col <= columns; col++) {
          const u = col / columns;

          // Slightly reduce particle count for performance.
          if ((row + col) % 2 !== 0) continue;

          const p = surfacePoint(u, v, 0, t);

          const pulse =
            0.5 +
            0.5 *
              Math.sin(
                t * 0.7 + col * 0.27 + row * 0.43
              );

          const foreground = Math.pow(v, 1.5);

          const alpha =
            (0.12 + foreground * 0.53) *
            (0.72 + pulse * 0.28);

          ctx.fillStyle = `rgba(248,250,255,${alpha})`;

          ctx.beginPath();

          ctx.arc(
            p.x,
            p.y,
            0.35 + foreground * 0.25 + pulse * 0.2,
            0,
            Math.PI * 2
          );

          ctx.fill();
        }
      }

      // Mouse-following light, separate from the physical ripple.
      if (mouseActive) {
        const hx = width * ((mouseX + 1) * 0.5);
        const hy = height * ((mouseY + 1) * 0.5);

        const cursorGlow = ctx.createRadialGradient(
          hx,
          hy,
          0,
          hx,
          hy,
          Math.min(width, height) * 0.23
        );

        cursorGlow.addColorStop(
          0,
          "rgba(235,242,255,0.07)"
        );

        cursorGlow.addColorStop(
          1,
          "rgba(235,242,255,0)"
        );

        ctx.fillStyle = cursorGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // Soft vignette.
      if (vignette) {
        const edge = ctx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          Math.min(width, height) * 0.18,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.8
        );

        edge.addColorStop(0, "rgba(0,0,0,0)");
        edge.addColorStop(1, "rgba(0,0,0,0.62)");

        ctx.fillStyle = edge;
        ctx.fillRect(0, 0, width, height);
      }
    };

    // --------------------------------------------------
    // CANVAS SIZE
    // --------------------------------------------------

    const resize = () => {
      const rect = container.getBoundingClientRect();

      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      draw(time);
    };

    // --------------------------------------------------
    // ANIMATION LOOP
    // --------------------------------------------------

    const frame = (now) => {
      if (!visible) {
        rafId = 0;
        return;
      }

      const delta = lastTime
        ? Math.min((now - lastTime) / 1000, 0.05)
        : 0.016;

      lastTime = now;

      if (!reducedMotion) {
        time += delta * speed;
      }

      // Smooth cursor response.
      mouseX += (targetX - mouseX) * 0.075;
      mouseY += (targetY - mouseY) * 0.075;

      draw(time);

      const needsAnimation =
        !reducedMotion ||
        Math.abs(targetX - mouseX) > 0.002 ||
        Math.abs(targetY - mouseY) > 0.002;

      if (needsAnimation) {
        rafId = requestAnimationFrame(frame);
      } else {
        rafId = 0;
      }
    };

    const start = () => {
      if (rafId || !visible) return;

      lastTime = 0;
      rafId = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = 0;
    };

    const onVisibilityChange = () => {
      visible = !document.hidden;

      if (visible) {
        start();
      } else {
        stop();
      }
    };

    const onMotionPreferenceChange = (event) => {
      reducedMotion = event.matches;

      stop();

      if (visible) {
        start();
      }
    };

    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(container);

    window.addEventListener("pointermove", onPointerMove, {
      passive: true,
    });

    window.addEventListener("blur", onPointerLeaveWindow);

    document.addEventListener(
      "visibilitychange",
      onVisibilityChange
    );

    if (reducedMotionQuery.addEventListener) {
      reducedMotionQuery.addEventListener(
        "change",
        onMotionPreferenceChange
      );
    } else {
      reducedMotionQuery.addListener(onMotionPreferenceChange);
    }

    resize();
    start();

    return () => {
      stop();

      resizeObserver.disconnect();

      window.removeEventListener(
        "pointermove",
        onPointerMove
      );

      window.removeEventListener(
        "blur",
        onPointerLeaveWindow
      );

      document.removeEventListener(
        "visibilitychange",
        onVisibilityChange
      );

      if (reducedMotionQuery.removeEventListener) {
        reducedMotionQuery.removeEventListener(
          "change",
          onMotionPreferenceChange
        );
      } else {
        reducedMotionQuery.removeListener(
          onMotionPreferenceChange
        );
      }
    };
  }, [density, speed, layers, anchorY, vignette]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        background: "#030303",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}