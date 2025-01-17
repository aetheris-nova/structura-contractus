import BigNumber from 'bignumber.js';

/**
 * Converts light years to meters.
 * @param {BigNumber} distance - A distance in light years.
 * @returns {BigNumber} The distance converted to meters.
 */
export default function lightYearsToMeters(distance: BigNumber): BigNumber {
  const metersPerLightYear = new BigNumber('9.46073047258e15');

  return distance.dividedBy(metersPerLightYear);
}
