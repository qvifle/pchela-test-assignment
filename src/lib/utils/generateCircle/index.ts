import generateColor from "./generateColor";
import generateDiameter from "./generateDiameter";
import generatePosition from "./generatePosition";

interface GenerateCircleProps {
  playgroundWidth: number;
  playgroundHeight: number;
  circles: Circle[];
}

const generateCircle = ({
  playgroundHeight,
  playgroundWidth,
  circles,
}: GenerateCircleProps): Circle => {
  const diameter = generateDiameter({ playgroundWidth });
  const position = generatePosition({
    diameter,
    playgroundHeight,
    playgroundWidth,
  });
  const color = generateColor();
  return { diameter, position, color, id: circles.length, isActive: false };
};

export default generateCircle;
