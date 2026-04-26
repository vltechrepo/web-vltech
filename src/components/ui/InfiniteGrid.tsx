import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
  type MotionValue,
} from "motion/react";

interface InfiniteGridProps {
  /** Grid cell size in px */
  size?: number;
  /** Color of grid lines */
  lineColor?: string;
  /** Radius of the flashlight reveal circle in px */
  flashlightRadius?: number;
  /** Opacity of the always-visible base grid (0–1) */
  baseOpacity?: number;
  /** Opacity of the flashlight-revealed grid (0–1) */
  revealOpacity?: number;
  /** Speed of the auto-scroll */
  speed?: number;
  /** Background color of the layer */
  backgroundColor?: string;
}

function GridPattern({
  offsetX,
  offsetY,
  size,
  color,
  id,
}: {
  offsetX: MotionValue<string>;
  offsetY: MotionValue<string>;
  size: number;
  color: string;
  id: string;
}) {
  return (
    <svg className="w-full h-full" aria-hidden>
      <defs>
        <motion.pattern
          id={id}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export default function InfiniteGrid({
  size = 40,
  lineColor = "#94a3b8",
  flashlightRadius = 300,
  baseOpacity = 0.05,
  revealOpacity = 0.4,
  speed = 0.5,
  backgroundColor = "transparent",
}: InfiniteGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  // String motion values for SVG pattern x/y attributes
  const strOffsetX = useMotionTemplate`${gridOffsetX}`;
  const strOffsetY = useMotionTemplate`${gridOffsetY}`;

  const maskImage = useMotionTemplate`radial-gradient(${flashlightRadius}px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + speed) % size);
    gridOffsetY.set((gridOffsetY.get() + speed) % size);
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-9999);
    mouseY.set(-9999);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: backgroundColor,
      }}
      aria-hidden
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            right: "-20%",
            top: "-20%",
            width: "40%",
            height: "40%",
            borderRadius: "999px",
            background: "rgba(249, 115, 22, 0.18)",
            filter: "blur(120px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "10%",
            top: "-10%",
            width: "20%",
            height: "20%",
            borderRadius: "999px",
            background: "rgba(124, 58, 237, 0.18)",
            filter: "blur(100px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-10%",
            bottom: "-20%",
            width: "40%",
            height: "40%",
            borderRadius: "999px",
            background: "rgba(59, 130, 246, 0.18)",
            filter: "blur(120px)",
          }}
        />
      </div>

      {/* Base grid */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: baseOpacity }}>
        <GridPattern
          id="vltech-grid-base"
          offsetX={strOffsetX}
          offsetY={strOffsetY}
          size={size}
          color={lineColor}
        />
      </div>

      {/* Revealed grid */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: revealOpacity,
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <GridPattern
          id="vltech-grid-reveal"
          offsetX={strOffsetX}
          offsetY={strOffsetY}
          size={size}
          color={lineColor}
        />
      </motion.div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 35%, rgba(255,255,255,0.08) 100%)",
        }}
      />
    </div>
  );
}
