"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Playground.module.css";
import generateCircle from "@/lib/utils/generateCircle";
import renderCircles from "@/lib/utils/renderCircles";
import getCursor from "@/lib/utils/getCursor";
import Rules from "../../../components/Rules/Rules";

export interface SelectedCircle extends Circle {
  offset: Position;
}

const Playground = () => {
  const [circles, setCircles] = useState<Circle[]>([]);
  const ref = useRef<HTMLCanvasElement>(null);
  const [isDragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<SelectedCircle[]>([]);

  const clearSelect = () => {
    setDragging(false);
    setSelected([]);
  };

  const addCircle = () => {
    if (ref && ref.current) {
      clearSelect();
      const circle = generateCircle({
        playgroundHeight: ref.current.clientHeight,
        playgroundWidth: ref.current.clientWidth,
        circles,
      });

      setCircles((s) => [...s, circle]);
    }
  };

  const removeSelectedCircles = () => {
    // remove selected elements
    setCircles((s) =>
      s.filter((circle) => !selected.find((el) => el.id === circle.id))
    );

    // refresh state
    setSelected([]);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    const cursor = getCursor({ event: e, canvasRef: ref });
    let isFinded = false;

    for (let i = circles.length - 1; i >= 0; i--) {
      const circle = circles[i];
      const distance = Math.sqrt(
        (cursor.x - circle.position.x) ** 2 +
          (cursor.y - circle.position.y) ** 2
      );

      if (distance <= circle.diameter) {
        isFinded = true;
        setDragging(true);

        setSelected((s) => {
          // if is already selected
          if (s.find((el) => el.id === circle.id)) {
            console.log(1);
            // if pressed with shift to deselect
            if (e.shiftKey) {
              return s.filter((el) => el.id != circle.id);
            }
            return s;
          }

          // if it is first circle or shift pressed on new circle
          if (e.shiftKey || !s.length) {
            console.log(2);
            return [
              ...s,
              {
                ...circle,
                offset: {
                  x: cursor.x - circle.position.x,
                  y: cursor.y - circle.position.y,
                },
              },
            ];
          }

          // when multiple circles selected trying click on new without shift
          return [
            {
              ...circle,
              offset: {
                x: cursor.x - circle.position.x,
                y: cursor.y - circle.position.y,
              },
            },
          ];
        });

        // update offsets state
        setSelected((s) =>
          s.map((el) => ({
            ...el,
            offset: {
              x: cursor.x - el.position.x,
              y: cursor.y - el.position.y,
            },
          }))
        );
        break;
      }
    }

    // if clicking on an empty area, clear the selection
    if (!isFinded) {
      clearSelect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const cursor = getCursor({ event: e, canvasRef: ref });

    // update selected array
    setSelected((s) =>
      s.map((circle) => ({
        ...circle,
        position: {
          x: cursor.x - circle.offset.x,
          y: cursor.y - circle.offset.y,
        },
      }))
    );

    // update circles array only selected elements to render
    setCircles((s) =>
      s.map((circle) => {
        const selectedCircle = selected.find((el) => el.id === circle.id);
        if (!selectedCircle) return circle;

        return {
          ...circle,
          position: {
            x: cursor.x - selectedCircle.offset.x,
            y: cursor.y - selectedCircle.offset.y,
          },
        };
      })
    );
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    renderCircles({ playgroundRef: ref, circles, selectedCircles: selected });
  }, [circles, selected]);

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Backspace") {
          removeSelectedCircles();
        }
      }}
      className={styles.wrapper}>
      <button onClick={addCircle} className={styles.button}>
        Добавить круг
      </button>
      <Rules />
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
