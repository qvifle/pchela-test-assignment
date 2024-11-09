interface Position {
  x: number;
  y: number;
}

interface Circle {
  id: number;
  color: string;
  diameter: number;
  position: Position;
  isActive?: boolean;
}

interface SelectedCircle extends Circle {
  offset: Position;
}
