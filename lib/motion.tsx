"use client";

import { ReactNode, useEffect, useState } from "react";

interface MotionProps {
  children: ReactNode;
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  transition?: Record<string, any>;
  whileInView?: Record<string, any>;
  viewport?: { once?: boolean; margin?: string };
  className?: string;
}

export function motion(Component: React.ElementType) {
  return function MotionComponent({
    initial,
    animate,
    transition,
    whileInView,
    viewport,
    children,
    ...props
  }: MotionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [ref, setRef] = useState<HTMLElement | null>(null);
    const [style, setStyle] = useState(initial || {});

    useEffect(() => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (viewport?.once) {
              observer.disconnect();
            }
          } else {
            if (!viewport?.once) {
              setIsVisible(false);
            }
          }
        },
        {
          rootMargin: viewport?.margin || "0px",
          threshold: 0.1,
        }
      );

      observer.observe(ref);

      return () => {
        observer.disconnect();
      };
    }, [ref, viewport]);

    useEffect(() => {
      if (isVisible && whileInView) {
        setStyle({
          ...style,
          ...whileInView,
          transition: `all ${transition?.duration || 0.3}s ${
            transition?.ease || "ease"
          } ${transition?.delay || 0}s`,
        });
      } else if (isVisible && animate) {
        setStyle({
          ...style,
          ...animate,
          transition: `all ${transition?.duration || 0.3}s ${
            transition?.ease || "ease"
          } ${transition?.delay || 0}s`,
        });
      } else {
        setStyle(initial || {});
      }
    }, [isVisible, initial, animate, whileInView, transition]);

    // Convert style object to CSS string
    const cssStyle = Object.entries(style).reduce((acc, [key, value]) => {
      // Convert camelCase to kebab-case
      const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      return { ...acc, [kebabKey]: value };
    }, {});

    return (
      <Component
        ref={setRef}
        style={cssStyle}
        {...props}
      >
        {children}
      </Component>
    );
  };
}

// Create pre-bound versions for common HTML elements
motion.div = motion("div");
motion.span = motion("span");
motion.h1 = motion("h1");
motion.h2 = motion("h2");
motion.h3 = motion("h3");
motion.p = motion("p");
motion.img = motion("img");
motion.section = motion("section");