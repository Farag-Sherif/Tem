import { motion } from "motion/react";

/** The TAM mark rebuilt from the guideline: square modules forming a plus /
 *  cross with one chamfered corner. */
export function Symbol({
  size = 40,
  className = "",
  animated = false,
  color = "#DFFF00",
}: {
  size?: number;
  className?: string;
  animated?: boolean;
  color?: string;
}) {
  const cells = [
    { x: 100, y: 0 },
    { x: 0, y: 100 },
    { x: 200, y: 100 },
  ];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 300 300"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      {cells.map((c, i) => (
        <motion.rect
          key={i}
          x={c.x}
          y={c.y}
          width="100"
          height="100"
          fill={color}
          initial={animated ? { opacity: 0, scale: 0.7 } : false}
          animate={animated ? { opacity: 1, scale: 1 } : undefined}
          transition={{ delay: 0.1 * i, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${c.x + 50}px ${c.y + 50}px` }}
        />
      ))}
      <motion.polygon
        points="0,200 100,200 100,300 0,300 0,232"
        fill={color}
        initial={animated ? { opacity: 0, scale: 0.7 } : false}
        animate={animated ? { opacity: 1, scale: 1 } : undefined}
        transition={{ delay: 0.32, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "50px 250px" }}
      />
    </svg>
  );
}
