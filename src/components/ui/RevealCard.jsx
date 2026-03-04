import React, { useState } from "react";
import { motion as Motion, useInView } from "framer-motion";

/**
 * A card that reveals its content with a sliding overlay animation.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to be revealed.
 * @param {string} [props.className] - Additional classes for the card container.
 * @param {string} [props.overlayClassName] - Additional classes for the overlay (e.g., for custom colors or opacity).
 * @param {('right'|'left'|'down'|'up')} [props.direction='right'] - Direction from which the overlay slides away.
 * @param {number} [props.duration=1] - Animation duration in seconds.
 * @param {number} [props.delay=0] - Delay before animation starts in seconds.
 * @param {('mount'|'hover'|'inview')} [props.trigger='mount'] - What triggers the reveal animation.
 * @param {string} [props.ease='easeInOut'] - Framer Motion easing function.
 * @param {Function} [props.onComplete] - Callback fired when animation completes.
 */
const RevealCard = ({
  children,
  className = "w-full max-w-md h-auto",
  overlayClassName = "bg-black",
  direction = "right",
  duration = 1,
  delay = 0,
  trigger = "mount",
  ease = "easeInOut",
  onComplete,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const isRevealed =
    trigger === "mount" || (trigger === "inview" && inView) || (trigger === "hover" && isHovered);

  // Get initial and animate values based on direction
  const getAnimationProps = () => {
    const base = { x: 0, y: 0 };
    let animate = { ...base };

    switch (direction) {
      case "right":
        animate.x = "100%";
        break;
      case "left":
        animate.x = "-100%";
        break;
      case "down":
        animate.y = "100%";
        break;
      case "up":
        animate.y = "-100%";
        break;
      default:
        animate.x = "100%";
    }
    return { initial: base, animate };
  };

  const { initial, animate } = getAnimationProps();

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-xl shadow-lg ${className}`}
      onMouseEnter={trigger === "hover" ? () => setIsHovered(true) : undefined}
      onMouseLeave={trigger === "hover" ? () => setIsHovered(false) : undefined}
    >
      {/* Card content */}
      <div className="relative z-0 bg-white p-6 flex flex-col items-center justify-center">
        {children}
      </div>

      {/* Overlay that slides away to reveal content */}
      <Motion.div
        initial={initial}
        animate={isRevealed ? animate : initial}
        transition={{
          duration,
          delay,
          ease,
          onComplete: () => {
            if (onComplete && isRevealed) onComplete();
          },
        }}
        className={`absolute top-0 left-0 w-full h-full ${overlayClassName} z-10`}
      />
    </div>
  );
};

export default RevealCard;
