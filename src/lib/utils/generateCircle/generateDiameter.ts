import getRandomNumber from "../getRandomNumber";

interface GenerateDiameter {
  playgroundWidth: number;
}

const generateDiameter = ({ playgroundWidth }: GenerateDiameter) => {
  const minCircleDiameter = (playgroundWidth * 5) / 100;
  const maxCircleDiameter = (playgroundWidth * 20) / 100;
  const diameter = getRandomNumber(minCircleDiameter, maxCircleDiameter);

  return diameter;
};

export default generateDiameter;
