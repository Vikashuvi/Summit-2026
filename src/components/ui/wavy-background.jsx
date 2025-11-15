"use client";
import { cn } from "../../lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {
  const noise = createNoise3D();
  let w,
    h,
    nt,
    i,
    x,
    ctx,
    canvas;
  const canvasRef = useRef(null);
  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const init = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    const rect = parent?.getBoundingClientRect();
    w = ctx.canvas.width = Math.max(1, Math.floor(rect?.width || window.innerWidth));
    h = ctx.canvas.height = Math.max(1, Math.floor(rect?.height || window.innerHeight));
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    window.addEventListener("resize", handleResize);
    render();
  };

  const handleResize = () => {
    if (!ctx || !canvas) return;
    const parent = canvas.parentElement;
    const rect = parent?.getBoundingClientRect();
    w = ctx.canvas.width = Math.max(1, Math.floor(rect?.width || window.innerWidth));
    h = ctx.canvas.height = Math.max(1, Math.floor(rect?.height || window.innerHeight));
    ctx.filter = `blur(${blur}px)`;
  };

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];
  const drawWave = (n) => {
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5); // adjust for height, currently at 50% of the container
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId;
  const render = () => {
    // Opaque background fill
    ctx.globalAlpha = 1;
    ctx.fillStyle = backgroundFill || "black";
    ctx.fillRect(0, 0, w, h);
    // Semi-transparent waves
    ctx.globalAlpha = waveOpacity || 0.5;
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    // I'm sorry but i have got to support it on safari.
    setIsSafari(typeof window !== "undefined" &&
      navigator.userAgent.includes("Safari") &&
      !navigator.userAgent.includes("Chrome"));
  }, []);

  return (
    <div
      className={cn("relative h-screen flex flex-col items-center justify-center", containerClassName)}>
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
