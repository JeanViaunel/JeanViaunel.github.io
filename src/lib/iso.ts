// Isometric projection of axis-aligned boxes for build-time SVG.
// x runs right-down, y runs left-down, z runs up.

export type Box = { x0: number; x1: number; y0: number; y1: number; z0: number; z1: number; kind?: string };
export type Face = { d: string; side: 'top' | 'right' | 'front'; kind?: string };

const C = Math.cos(Math.PI / 6);

export function projector(scale: number, ox: number, oy: number) {
  return (x: number, y: number, z: number): [number, number] => [
    ox + (x - y) * C * scale,
    oy + (x + y) * 0.5 * scale - z * scale,
  ];
}

const path = (pts: [number, number][]) =>
  'M' + pts.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join('L') + 'Z';

/** Visible faces of every box, ordered back to front for painting. */
export function boxFaces(boxes: Box[], p: ReturnType<typeof projector>): Face[] {
  const sorted = [...boxes].sort((a, b) => a.z0 - b.z0 || a.x1 + a.y1 - (b.x1 + b.y1));
  return sorted.flatMap((b) => [
    { side: 'front' as const, kind: b.kind, d: path([p(b.x0, b.y1, b.z0), p(b.x1, b.y1, b.z0), p(b.x1, b.y1, b.z1), p(b.x0, b.y1, b.z1)]) },
    { side: 'right' as const, kind: b.kind, d: path([p(b.x1, b.y0, b.z0), p(b.x1, b.y1, b.z0), p(b.x1, b.y1, b.z1), p(b.x1, b.y0, b.z1)]) },
    { side: 'top' as const, kind: b.kind, d: path([p(b.x0, b.y0, b.z1), p(b.x1, b.y0, b.z1), p(b.x1, b.y1, b.z1), p(b.x0, b.y1, b.z1)]) },
  ]);
}

/** A rectangle lying on a vertical face: a front face (y fixed) or a right face (x fixed). */
export function facePatch(
  p: ReturnType<typeof projector>,
  plane: { y: number } | { x: number },
  a0: number,
  a1: number,
  z0: number,
  z1: number,
): string {
  if ('y' in plane) {
    return path([p(a0, plane.y, z0), p(a1, plane.y, z0), p(a1, plane.y, z1), p(a0, plane.y, z1)]);
  }
  return path([p(plane.x, a0, z0), p(plane.x, a1, z0), p(plane.x, a1, z1), p(plane.x, a0, z1)]);
}
