import { motion as Motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";

function Reveal({
  children,
  className = "",
  containerClass = "",
  delay = 0.2,
  duration = 0.6,
  direction = "up", // "up" | "left" | "right"
  overlay = false,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      slideControls.start("visible");
    }
  }, [inView, controls, slideControls]);

  const variants = {
    hidden:
      direction === "up"
        ? { opacity: 0, y: 60 }
        : direction === "left"
        ? { opacity: 0, x: -60 }
        : { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <Motion.div
      ref={ref}
      className={`relative overflow-hidden ${containerClass}`}
      initial="hidden"
      animate={controls}
    >
      <Motion.div
        variants={variants}
        transition={{ duration, delay, ease: "easeOut" }}
        className={className}
      >
        {children}
      </Motion.div>

      {overlay && (
        <Motion.div
          initial={{ left: 0 }}
          animate={slideControls}
          variants={{
            hidden: { left: 0 },
            visible: { left: "100%" },
          }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="absolute inset-0 bg-black z-20"
        />
      )}
    </Motion.div>
  );
}

export default Reveal;
