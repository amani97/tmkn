export class ObjectIdGenerator {
  private static increment = Math.floor(Math.random() * 16777216); // Random 3-byte value

  static generateObjectId(): string {
    const timestamp = Math.floor(Date.now() / 1000).toString(16);
    const machineId = (Math.floor(Math.random() * 16777216) + 1).toString(16);
    const counter = (ObjectIdGenerator.increment++ % 16777216).toString(16);

    const objectId = timestamp + machineId + counter;

    return objectId;
  }

  static generateOptimisticObjectId(): string {
    const timestamp = Math.floor(Date.now() / 1000).toString(16);
    const machineId = (Math.floor(Math.random() * 16777216) + 1).toString(16);
    const counter = (ObjectIdGenerator.increment++ % 16777216).toString(16);

    const objectId = timestamp + machineId + counter;
    // TODO: Make this ID hashable Instead of  [_optimistic]
    return `${objectId}_optimistic`;
  }

  static isOptimisticObjectId(id: string): boolean {
    return id.includes('_optimistic');
  }
}
