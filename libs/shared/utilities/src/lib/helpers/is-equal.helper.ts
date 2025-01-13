export function isEqual(value: unknown, other: unknown): boolean {
  // Check if both values are of the same type
  if (typeof value !== typeof other) {
    return false;
  }

  // Handle special cases (null and undefined)
  if (value === null || other === null || value === undefined || other === undefined) {
    return value === other;
  }

  // Check if values are primitives
  if (typeof value !== 'object' || typeof other !== 'object') {
    return value === other;
  }

  // Check if values are arrays
  if (Array.isArray(value) && Array.isArray(other)) {
    if (value.length !== other.length) {
      return false;
    }

    for (let i = 0; i < value.length; i++) {
      if (!isEqual(value[i], other[i])) {
        return false;
      }
    }

    return true;
  }

  // Check if values are objects
  const keysValue = Object.keys(value);
  const keysOther = Object.keys(other);

  if (keysValue.length !== keysOther.length) {
    return false;
  }

  for (const key of keysValue) {
    if (!keysOther.includes(key) || !isEqual((value as never)[key], (other as never)[key])) {
      return false;
    }
  }

  return true;
}
