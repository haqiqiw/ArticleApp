export default class StringHelper {
  static parseISOString(s) {
    if (s.length == 0) return null;
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])).toDateString();
  }
}