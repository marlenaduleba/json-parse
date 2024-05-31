import CustomHashTable from "./../src/CustomHashTable";

/**
 * Test suite for the CustomHashTable class.
 */
describe("CustomHashTable", () => {
  let hashTable: CustomHashTable;

  // Initialize a new instance of the hash table before each test
  beforeEach(() => {
    hashTable = new CustomHashTable();
  });

  // Test inserting and retrieving values
  test("should insert and retrieve values correctly", () => {
    hashTable.insert("key1", 100);
    hashTable.insert("key2", 200);
    hashTable.insert("key3", 300);

    expect(hashTable.get("key1")).toBe(100);
    expect(hashTable.get("key2")).toBe(200);
    expect(hashTable.get("key3")).toBe(300);
  });

  // Test returning null for non-existing keys
  test("should return null for non-existing keys", () => {
    expect(hashTable.get("nonExistingKey")).toBeNull();
  });

  // Test handling collisions using linear probing
  test("should handle collisions correctly with linear probing", () => {
    const key1 = "xyz";
    const key2 = "zyx"; // This should cause a collision

    hashTable.insert(key1, 100);
    hashTable.insert(key2, 200);

    // Calculate the hash values for both keys to ensure they collide
    const hashIndex1 = hashTable.hash(key1);
    const hashIndex2 = hashTable.hash(key2);

    expect(hashIndex1).toBe(hashIndex2);

    expect(hashTable.get(key1)).toBe(100);
    expect(hashTable.get(key2)).toBe(200);
  });

  // Test deleting key-value pairs
  test("should delete key-value pairs correctly", () => {
    hashTable.insert("key1", 100);
    hashTable.insert("key2", 200);

    expect(hashTable.delete("key1")).toBe(100);
    expect(hashTable.get("key1")).toBeNull();
    expect(hashTable.get("key2")).toBe(200);
  });

  // Test returning the correct size of the hash table
  test("should return correct size of the hash table", () => {
    expect(hashTable.getSize()).toBe(0);

    hashTable.insert("key1", 100);
    hashTable.insert("key2", 200);

    expect(hashTable.getSize()).toBe(2);

    hashTable.delete("key1");
    expect(hashTable.getSize()).toBe(1);
  });

  // Test correctly reporting if the hash table is empty
  test("should correctly report if the hash table is empty", () => {
    expect(hashTable.isEmpty()).toBe(true);

    hashTable.insert("key1", 100);
    expect(hashTable.isEmpty()).toBe(false);

    hashTable.delete("key1");
    expect(hashTable.isEmpty()).toBe(true);
  });

  // Test displaying all key-value pairs
  test("should display all key-value pairs", () => {
    console.log = jest.fn(); // Mock console.log

    hashTable.insert("key1", 100);
    hashTable.insert("key2", 200);

    hashTable.display();

    // These values are based on the assumption that keys 'key1' and 'key2' have specific indices.
    expect(console.log).toHaveBeenCalledWith(
      "index = 18, key = key1, value = 100"
    );
    expect(console.log).toHaveBeenCalledWith(
      "index = 19, key = key2, value = 200"
    );
  });

  // Test resizing the table when load factor exceeds 0.75
  test("should resize the table when load factor exceeds 0.75", () => {
    const initialCapacity = hashTable["capacity"];
    // Insert elements to exceed load factor
    for (let i = 0; i < 25; i++) {
      hashTable.insert("key" + i, i * 100);
    }

    // The capacity should double after resizing
    expect(hashTable["capacity"]).toBe(initialCapacity * 2);

    // Ensure all key-value pairs are still retrievable after resizing
    for (let i = 0; i < 25; i++) {
      expect(hashTable.get("key" + i)).toBe(i * 100);
    }
  });
});
