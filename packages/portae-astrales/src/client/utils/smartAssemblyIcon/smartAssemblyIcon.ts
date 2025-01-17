import type { SmartAssemblies } from '@eveworld/types';
import { createElement, type ReactNode } from 'react';
import { GrCube, GrFan, GrVulnerability } from 'react-icons/gr';
import { MdQuestionMark } from 'react-icons/md';

/**
 * Gets the icon associated with the smart assembly.
 * @param {SmartAssemblies} type - The type of smart assembly.
 * @returns {ReactNode} The icon element associated with the smart assembly.
 */
export default function smartAssemblyIcon(type: SmartAssemblies): ReactNode {
  let icon = MdQuestionMark;

  switch (type) {
    case 'SmartGate':
      icon = GrFan;
      break;
    case 'SmartStorageUnit':
      icon = GrCube;
      break;
    case 'SmartTurret':
      icon = GrVulnerability;
      break;
    default:
      break;
  }

  return createElement(icon);
}
