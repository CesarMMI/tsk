export abstract class ColorUtils {
  static getShades(
    color: string,
    quantity: number,
    limits: { min: number; max: number } = { min: 20, max: 80 },
    prop: 'l' | 's' = 'l'
  ) {
    const step = (limits.max - limits.min) / (quantity - 1);
    const hsl = this.hexToHsl(color);

    return Array(quantity)
      .fill(limits.min)
      .map((val, i) =>
        prop === 'l'
          ? this.hslToHex(hsl!.h, hsl!.s, Math.round(val + i * step))
          : this.hslToHex(hsl!.h, Math.round(val + i * step), hsl!.l)
      );
  }

  static hslToHex(h: number, s: number, l: number) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  static hexToHsl(hex: string) {
    let r: any = 0;
    let g: any = 0;
    let b: any = 0;

    if (hex.length == 4) {
      r = '0x' + hex[1] + hex[1];
      g = '0x' + hex[2] + hex[2];
      b = '0x' + hex[3] + hex[3];
    } else if (hex.length == 7) {
      r = '0x' + hex[1] + hex[2];
      g = '0x' + hex[3] + hex[4];
      b = '0x' + hex[5] + hex[6];
    }

    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l };
  }
}
