const getCursor = ({
  event,
  canvasRef,
}: {
  event: React.MouseEvent;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}): Position => {
  const { clientX, clientY } = event;

  const canvas = canvasRef.current;
  if (!canvas) {
    throw new Error("Canvas not defined");
  }

  return { x: clientX - canvas.offsetLeft, y: clientY - canvas.offsetTop };
};

export default getCursor;
