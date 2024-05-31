/**
 * Class representing a custom hash table with linear probing.
 */
import HashNode from "./HashNode.js";

class CustomHashTable {
  private capacity: number;
  private size: number;
  private arr: Array<HashNode | null>;
  private dummy: HashNode;

  /**
   * Constructs a new CustomHashTable with the specified initial capacity.
   * @param initialCapacity The initial capacity of the hash table.
   */
  constructor(initialCapacity: number = 20) {
    this.capacity = initialCapacity;
    this.size = 0;
    this.arr = new Array(initialCapacity).fill(null);
    this.dummy = new HashNode("", -1);
  }

  /**
   * Generates a hash code for the given key using a basic polynomial accumulation method.
   * This method calculates the hash value by iterating over each character in the key,
   * multiplying the current hash value by 31 (a prime number) and adding the ASCII value
   * of the character, then taking the modulus with the table capacity.
   * @param key - The key to be hashed.
   * @returns A hash code (integer) for the key.
   */
  hash(key: string): number {
    let hashVal = 0;
    for (let i = 0; i < key.length; i++) {
      hashVal = (hashVal * 31 + key.charCodeAt(i)) % this.capacity;
    }
    return hashVal;
  }

  /**
   * Inserts a key-value pair into the hash table.
   * Uses linear probing to resolve collisions by moving to the next available slot.
   * If an empty slot or a dummy node is found, the key-value pair is inserted there.
   * @param key - The key to be inserted.
   * @param value - The value to be associated with the key.
   */
  insert(key: string, value: number): void {
    if (this.loadFactor() > 0.75) {
      this.resize(this.capacity * 2);
    }

    const temp = new HashNode(key, value);
    let hashIndex = this.hash(key);

    while (
      this.arr[hashIndex] !== null &&
      this.arr[hashIndex]!.key !== key &&
      this.arr[hashIndex]!.key !== this.dummy.key
    ) {
      hashIndex++;
      hashIndex %= this.capacity;
    }

    if (
      this.arr[hashIndex] === null ||
      this.arr[hashIndex]!.key === this.dummy.key
    ) {
      this.size++;
    }
    this.arr[hashIndex] = temp;
  }

  /**
   * Resizes the hash table to the specified new capacity.
   * Rehashes all existing key-value pairs to the new table.
   * @param newCapacity The new capacity of the hash table.
   */
  private resize(newCapacity: number): void {
    const oldArr = this.arr;
    this.capacity = newCapacity;
    this.arr = new Array(newCapacity).fill(null);
    this.size = 0;

    for (let i = 0; i < oldArr.length; i++) {
      if (oldArr[i] !== null && oldArr[i]!.key !== this.dummy.key) {
        this.insert(oldArr[i]!.key, oldArr[i]!.value);
      }
    }
  }

  /**
   * Deletes a key-value pair from the hash table.
   * Uses linear probing to find the key.
   * If the key is found, it is replaced with a dummy node to maintain the probe sequence.
   * @param key - The key to be deleted.
   * @returns The value associated with the deleted key, or null if the key was not found.
   */
  delete(key: string): number | null {
    let hashIndex = this.hash(key);

    while (this.arr[hashIndex] !== null) {
      if (this.arr[hashIndex]!.key === key) {
        const temp = this.arr[hashIndex]!;
        this.arr[hashIndex] = this.dummy;
        this.size--;
        return temp.value;
      }
      hashIndex++;
      hashIndex %= this.capacity;
    }

    return null;
  }

  /**
   * Retrieves the value associated with a given key.
   * Uses linear probing to find the key.
   * @param key - The key to be searched.
   * @returns The value associated with the key, or null if the key was not found.
   */
  get(key: string): number | null {
    let hashIndex = this.hash(key);
    let counter = 0;

    while (this.arr[hashIndex] !== null) {
      if (counter++ > this.capacity) {
        return null;
      }

      if (this.arr[hashIndex]!.key === key) {
        return this.arr[hashIndex]!.value;
      }
      hashIndex++;
      hashIndex %= this.capacity;
    }

    return null;
  }

  /**
   * Displays all key-value pairs in the hash table.
   */
  display(): void {
    for (let i = 0; i < this.capacity; i++) {
      if (this.arr[i] !== null && this.arr[i]!.key !== this.dummy.key) {
        console.log(
          `index = ${i}, key = ${this.arr[i]!.key}, value = ${
            this.arr[i]!.value
          }`
        );
      }
    }
  }

  /**
   * Returns the current size (number of key-value pairs) of the hash table.
   * @returns The size of the hash table.
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Checks if the hash table is empty.
   * @returns True if the hash table is empty, false otherwise.
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Computes the load factor of the hash table.
   * The load factor is the ratio of the number of stored entries to the capacity.
   * @returns The load factor of the hash table.
   */
  loadFactor(): number {
    return this.size / this.capacity;
  }
}

export default CustomHashTable;
