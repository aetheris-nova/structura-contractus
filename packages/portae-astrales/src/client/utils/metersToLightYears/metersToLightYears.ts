import BigNumber from 'bignumber.js';

/**
 * Converts meters to light years.
 * @param {BigNumber} distance - A distance in meters.
 * @returns {BigNumber} The distance converted to light years.
 */
export default function metersToLightYears(distance: BigNumber): BigNumber {
  const conversionFactor = new BigNumber('1.0570008340247e-16');

  return distance.multipliedBy(conversionFactor);
}
