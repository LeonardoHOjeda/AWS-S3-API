/* eslint-disable no-extend-native */
String.prototype.in = function (...values: string[]): boolean {
  const value = this.toString()
  return values.includes(value)
}
