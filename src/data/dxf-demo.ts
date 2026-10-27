// A floor plan redrawn and simplified from "Floor plan 2" (Figure 4) of
// Victor, Kumar & Hsieh, ISARC 2026. One definition feeds every stage of the
// figure, so the 2D plan, the rooms and the 3D model always agree.
// Units: millimetres. x runs along grid 1–5, y along grid A–D.

export const GX = { '1': 0, '2': 4500, '3': 5900, '4': 10100, '5': 13500 } as const;
export const GY = { A: 0, B: 3800, C: 7600, D: 10300 } as const;
export const T = 200; // wall thickness
export const STOREY = 3000; // paper: walls extruded to floor height, default 3000 mm

export type Opening = { kind: 'door' | 'window'; at: number; width: number };
export type Wall = { axis: 'x' | 'y'; line: number; from: number; to: number; openings: Opening[] };

const W = (axis: 'x' | 'y', line: number, from: number, to: number, openings: Opening[] = []): Wall => ({
  axis,
  line,
  from,
  to,
  openings,
});
const door = (at: number, width = 900): Opening => ({ kind: 'door', at, width });
const win = (at: number, width = 1200): Opening => ({ kind: 'window', at, width });

/** Walls on the A-WALL layer. axis 'x' runs along x at y = line; 'y' runs along y at x = line. */
export const walls: Wall[] = [
  W('x', GY.A, GX['1'], GX['5'], [win(2250), win(8000), win(11800)]),
  W('x', GY.D, GX['1'], GX['5'], [win(2250), door(5200, 1000), win(8000), win(11800)]),
  W('x', GY.B, GX['1'], GX['2']),
  W('x', GY.C, GX['1'], GX['2']),
  W('x', GY.B, GX['3'], GX['5'], [door(11800)]),
  W('x', GY.C, GX['3'], GX['5'], [door(11800)]),
  W('y', GX['1'], GY.A, GY.D, [win(1900), win(5700)]),
  W('y', GX['5'], GY.A, GY.D, [win(1900), win(5700), win(8950)]),
  W('y', GX['2'], GY.A, GY.D, [door(1900), door(5700), door(8950)]),
  W('y', GX['3'], GY.A, GY.D, [door(1900), door(5700), door(8950)]),
  W('y', GX['4'], GY.A, GY.C),
];

/** Columns on the A-COLS layer, one at every grid intersection. */
export const columns = Object.values(GX).flatMap((x) => Object.values(GY).map((y) => ({ x, y })));

/** Rooms the Detect Rooms tool closes into polygons (clear interior, inside the wall faces). */
const room = (x0: number, x1: number, y0: number, y1: number) => ({
  x0: x0 + T / 2,
  x1: x1 - T / 2,
  y0: y0 + T / 2,
  y1: y1 - T / 2,
});
export const rooms = [
  room(GX['1'], GX['2'], GY.A, GY.B),
  room(GX['1'], GX['2'], GY.B, GY.C),
  room(GX['1'], GX['2'], GY.C, GY.D),
  room(GX['2'], GX['3'], GY.A, GY.D),
  room(GX['3'], GX['4'], GY.A, GY.B),
  room(GX['3'], GX['4'], GY.B, GY.C),
  room(GX['4'], GX['5'], GY.A, GY.B),
  room(GX['4'], GX['5'], GY.B, GY.C),
  room(GX['3'], GX['5'], GY.C, GY.D),
];

/** A-STAIR and A-FURN content: drawn in the DXF, not generated in IFC (paper, Table 1). */
export const stair = { x0: GX['1'] + 400, x1: GX['2'] - 400, y0: GY.C + 300, y1: GY.D - 300, treads: 9 };
export const beds = [
  { x: 600, y: 600, w: 1600, h: 2000 },
  { x: 600, y: 4400, w: 1600, h: 2000 },
  { x: 8200, y: 600, w: 1600, h: 2000 },
  { x: 8200, y: 4400, w: 1600, h: 2000 },
];

export const counts = {
  walls: walls.length,
  columns: columns.length,
  doors: walls.reduce((n, w) => n + w.openings.filter((o) => o.kind === 'door').length, 0),
  windows: walls.reduce((n, w) => n + w.openings.filter((o) => o.kind === 'window').length, 0),
  rooms: rooms.length,
};

/** The user request from the paper's demonstration (Figure 5), verbatim. */
export const request =
  'Create a 5 story building with @"../floors/Level 0.dxf" as ground floor and @"../floors/Level 1.dxf" as typical floors.';

/** Table 1 of the paper: AIA CAD layer to IFC class. */
export const layerMap = [
  { layer: 'A-WALL', element: 'Wall', ifc: 'IfcWall' },
  { layer: 'A-COLS', element: 'Column', ifc: 'IfcColumn' },
  { layer: 'A-DOOR', element: 'Door', ifc: 'IfcDoor' },
  { layer: 'A-WIND', element: 'Window', ifc: 'IfcWindow' },
  { layer: 'A-SLAB', element: 'Floor slab', ifc: 'IfcSlab' },
  { layer: 'A-STAIR', element: 'Stair', ifc: null },
  { layer: 'A-FURN', element: 'Furniture', ifc: null },
];
