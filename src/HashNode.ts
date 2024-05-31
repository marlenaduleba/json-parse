/**
 * Class representing a node in the hash table.
 */
class HashNode {
  public key: string;
  public value: number;

  /**
   * Constructor to initialize a hash node.
   * @param key - The key associated with the value.
   * @param value - The value associated with the key.
   */
  constructor(key: string, value: number) {
    this.key = key;
    this.value = value;
  }
}

export default HashNode;
