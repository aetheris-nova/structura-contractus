import BigNumber from 'bignumber.js';

// types
import type { ILocation } from '@client/types';

/**
 * Calculates the distance between two points in 3D space. This algorithm uses Euclidean distance formula.
 * @param {ILocation} p - The first point
 * @param {ILocation} q - The second point.
 * @returns {BigNumber} The distance between the two points in meters.
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_distance}
 */
export default function calculateDistanceBetweenPoints(p: ILocation, q: ILocation): BigNumber {
  const dx = new BigNumber(p.x).minus(new BigNumber(q.x));
  const dy = new BigNumber(p.y).minus(new BigNumber(q.y));
  const dz = new BigNumber(p.z).minus(new BigNumber(q.z));

  return dx.pow(2).plus(dy.pow(2)).plus(dz.pow(2)).sqrt();
}
