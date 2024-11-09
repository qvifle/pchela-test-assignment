"use client";

import React, { useRef, useState } from "react";

const Playground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [circles, setCircles] = useState<
    {
      x: number;
      y: number;
      radius: number;
    }[]
  >([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedCircleIndex, setDraggedCircleIndex] = useState<null | number>(
    null
  );
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleAddCircle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Генерация случайных координат и размера круга
    const radius =
      Math.random() * (canvas.width * 0.2 - canvas.width * 0.05) +
      canvas.width * 0.05;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;

    // Добавляем новый круг в массив
    const newCircle = { x, y, radius };
    setCircles([...circles, newCircle]);
  };

  const handleMouseDown = (e: any) => {
    const { clientX, clientY } = e;
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");

    circles.forEach((circle, index) => {
      const distance = Math.sqrt(
        (clientX - circle.x) ** 2 + (clientY - circle.y) ** 2
      );

      if (distance < circle.radius) {
        setIsDragging(true);
        setDraggedCircleIndex(index);
        setOffset({ x: clientX - circle.x, y: clientY - circle.y });
      }
    });
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging || draggedCircleIndex === null) return;

    const { clientX, clientY } = e;

    const newCircles = [...circles];
    const draggedCircle = newCircles[draggedCircleIndex];

    // Обновляем координаты круга
    draggedCircle.x = clientX - offset.x;
    draggedCircle.y = clientY - offset.y;
    setCircles(newCircles);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedCircleIndex(null);
  };

  const drawCircles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка канваса

    circles.forEach((circle) => {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#00BFFF";
      ctx.fill();
    });
  };

  React.useEffect(() => {
    drawCircles();
  }, [circles]);

  return (
    <div>
      <button onClick={handleAddCircle}>Добавить круг</button>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid black", marginTop: "10px" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        // onMouseOut={handleMouseUp} // Чтобы прекратить перетаскивание, если курсор выходит за пределы
      />
    </div>
  );
};

export default Playground;
