// -----------------------------
// Line 2D
// -----------------------------

export function Line2D (x1, y1, x2, y2, length) {
    const points = [];
    const dx = (x2 - x1) / (length - 1);
    const dy = (y2 - y1) / (length - 1);
    for (let i = 0; i < length; i++) {
        const x = x1 + (dx * i);
        const y = y1 + (dy * i);
        points.push(x, y);
    }
    return points;

}



// -----------------------------
// Grid 2D
// -----------------------------

export function Grid2D (size, cell, length) {

    const lines = [];
    const min = -size / 2;
    const max = min * -1;
    const offset = (size % cell) / 2;

    function line (...args) {
        lines.push(Line2D(...args, length));
    }

    if (offset) {
        line(min, max, min, min)
        line(min, min, max, min)
        line(max, min, max, max)
        line(max, max, min, max);
    }

    let dy = 1
    let dx = 1;

    for (let x = min + offset; x <= max; x += cell) {
        line(x, max * dy, x, min * dy);
        dy *= -1;
    }

    dy *= -1;
    lines.push(max, min * dy);

    for (let y = min + offset; y <= max; y += cell) {
        line(max * dx, y * dy, min * dx, y * dy);
        dx *= -1;
    }

    return lines.flat();

}



// -----------------------------
// Square 2D
// -----------------------------

export function _Square2D (size) {
    const c = size / 2;
    return [-c, c, -c, -c, c, -c, c, -c, c, c, -c, c];
}



// -----------------------------
// Square 2D
// -----------------------------

export function Square2D (size, length) {

    const points = [];
    const d = size / (length - 1);
    const s = -size / 2;

    for (let ix = 0; ix < length - 1; ix ++) {
        const x1 = s + d * ix;
        const x2 = s + d * (ix + 1);
        for (let iy = 0; iy < length - 1; iy++) {
            const y1 = s + d * iy;
            const y2 = s + d * (iy + 1);
            points.push(x1, y2, x1, y1, x2, y1, x2, y1, x2, y2, x1, y2)
        }
    }

    return points;
}



// -----------------------------
// Square UV
// -----------------------------

export function SquareUV (size, length) {

    const points = [];
    const d = size / (length - 1);

    for (let ix = 0; ix < length - 1; ix ++) {
        const x1 = d * ix;
        const x2 = d * (ix + 1);
        for (let iy = length - 1; iy > 0; iy--) {
            const y1 = d * iy;
            const y2 = d * (iy - 1);
            points.push(x1, y2, x1, y1, x2, y1, x2, y1, x2, y2, x1, y2)
        }
    }

    return points;

}