interface RenderCirclesProps {
  playgroundRef: React.RefObject<HTMLCanvasElement>;
  circles: Circle[];
}

const renderCircles = ({ playgroundRef, circles }: RenderCirclesProps) => {
  const canvas = playgroundRef.current;

  if (!canvas) {
    return;
  }

  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  const context = canvas.getContext("2d");

  if (!context) {
    return;
  }

  circles.map((circle) => {
    context.beginPath();
    context.arc(
      circle.position.x,
      circle.position.y,
      circle.diameter,
      0,
      Math.PI * 2
    );
    context.fillStyle = circle.color;

    context.fill();

    if (circle.isActive) {
      context.lineWidth = 5;
      context.strokeStyle = "black";
      context.stroke();
    }
  });
};

export default renderCircles;
