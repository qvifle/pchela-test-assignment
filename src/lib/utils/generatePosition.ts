import getRandomNumber from "./getRandomNumber";

interface GeneratePositionProps {
  diameter: number;
  playgroundWidth: number;
  playgroundHeight: number;
}

const generatePosition = ({
  diameter,
  playgroundWidth,
  playgroundHeight,
}: GeneratePositionProps): Position => {
  const minXPostion = diameter;
  const minYPosition = diameter;

  const maxXPosition = playgroundWidth - diameter;
  const maxYPosition = playgroundHeight - diameter;

  const x = getRandomNumber(minXPostion, maxXPosition);
  const y = getRandomNumber(minYPosition, maxYPosition);

  return { x, y };
};

export default generatePosition;
