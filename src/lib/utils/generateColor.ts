import CIRCLE_COLORS from "../constants/circleColors";
import getRandomNumber from "./getRandomNumber";

const generateColor = () => {
  const color = CIRCLE_COLORS[getRandomNumber(0, CIRCLE_COLORS.length - 1)];
  return color;
};

export default generateColor;
