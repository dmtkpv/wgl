import { Attr } from './constructors.js'



// -----------------------------
// Grid
// -----------------------------

export function Grid (size, cell, step = 4) {

    const points = [];
    const offset = (size % cell) / 2;
    const min = -size / 2 - 1;
    const max = min * -1;
    const start = -size / 2 + offset;

    let d = -1;

    for (let x = start; x <= max; x += cell) {
        for (let y = min; y < max + step; y += step) {
            points.push(x, y * d)
        }
        d *= -1;
    }

    points.push(max, min * d);
    d = -1;

    for (let y = start; y <= max; y += cell) {
        for (let x = min; x < max + step; x += step) {
            points.push(x * d, y)
        }
        d *= -1;
    }

    return points;

}



// -----------------------------
// Rect
// -----------------------------

export function Square (size) {
    const c = size / 2;
    const position = [-c, c, -c, -c, c, -c, c, -c, c, c, -c, c];
    const texcoord = position.map(coord => .5 + coord / size);



    return position
}