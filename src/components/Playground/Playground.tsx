"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Playground.module.css";
import generateCircle from "@/lib/utils/generateCircle";
import renderCircles from "@/lib/utils/renderCircles";
import getCursor from "@/lib/utils/getCursor";

interface Offset extends Position {
  id: number;
}

const Playground = () => {
  const [circles, setCircles] = useState<Circle[]>([]);
  const ref = useRef<HTMLCanvasElement>(null);
  const [isDragging, setDragging] = useState(false);
  const [draggingOffset, setDraggingOffset] = useState<Offset[]>([]);

  const addCircle = () => {
    if (ref && ref.current) {
      const circle = generateCircle({
        playgroundHeight: ref.current.clientHeight,
        playgroundWidth: ref.current.clientWidth,
        circles,
      });

      setCircles((s) => [...s, circle]);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    const isMoreThanOneActive = circles.filter((el) => el.isActive).length > 1;

    // clear states trying select more than 1 circle without shift
    if (!e.shiftKey && !isMoreThanOneActive) {
      console.log("here");
      setDraggingOffset([]);
      setCircles((s) => s.map((el) => ({ ...el, isActive: false })));
    }

    const cursor = getCursor({ event: e, canvasRef: ref });

    let isFinded = false;

    for (let i = circles.length - 1; i >= 0; i--) {
      const circle = circles[i];

      const distance = Math.sqrt(
        (cursor.x - circle.position.x) ** 2 +
          (cursor.y - circle.position.y) ** 2
      );

      // circle cought
      if (distance < circle.diameter) {
        isFinded = true;
        setDragging(true);

        // if clicks on non selected circle, when already multiple selected
        if (!e.shiftKey && !circle.isActive && isMoreThanOneActive) {
          break;
        }

        // set selected circle active
        setCircles((s) => {
          const updatedCircles = s.map((el, key) =>
            key === i ? { ...el, isActive: true } : el
          );

          const activeCircles = updatedCircles.filter(
            (circle) => circle.isActive
          );

          // update offsets state
          setDraggingOffset(
            activeCircles.map((circle) => ({
              id: circle.id,
              x: cursor.x - circle.position.x,
              y: cursor.y - circle.position.y,
            }))
          );

          return updatedCircles;
        });

        break;
      }
    }

    // on empty click
    if (!isFinded) {
      setCircles((s) => s.map((el) => ({ ...el, isActive: false })));
      setDraggingOffset([]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const cursor = getCursor({ event: e, canvasRef: ref });

    setCircles((s) =>
      s.map((circle) => {
        if (!circle.isActive) {
          return circle;
        }

        const offset = draggingOffset.find((el) => el.id == circle.id)!;

        return {
          ...circle,
          position: {
            x: cursor.x - offset.x,
            y: cursor.y - offset.y,
          },
        };
      })
    );
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    renderCircles({ playgroundRef: ref, circles });
  }, [circles]);

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key == "Backspace") {
          setCircles((s) => s.filter((el) => !el.isActive));
        }
      }}
      className={styles.wrapper}>
      <button onClick={addCircle} className={styles.button}>
        Добавить круг
      </button>
      <div className={styles.playground}>
        <canvas
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className={styles.canvas}
          ref={ref}
        />
      </div>
    </div>
  );
};

export default Playground;
