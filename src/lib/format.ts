const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "18 Aug" or "18 Aug 08:26", read straight from an ISO string so no time zone shifts it. */
export function fmtStamp(iso: string, withTime: boolean): string {
  const [date, time = ''] = iso.split('T');
  const [, mo, d] = date.split('-');
  const day = `${Number(d)} ${MONTHS[Number(mo) - 1]}`;
  return withTime ? `${day} ${time.slice(0, 5)}` : day;
}

export function fmtScore(v: number, digits: number): string {
  return v.toFixed(digits);
}

export function fmtDelta(v: number, digits: number): string {
  return `${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(digits)}`;
}
