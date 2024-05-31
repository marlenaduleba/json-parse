/**
 * Entry point for the CustomHashTable demonstration.
 * Demonstrates the usage of the CustomHashTable class.
 */
import CustomHashTable from "./CustomHashTable.js";

const hashTable = new CustomHashTable();

console.log("=== Inserting key-value pairs ===");
hashTable.insert("key1", 1);
hashTable.insert("key2", 2);
hashTable.insert("key3", 3);
hashTable.insert("key4", 4);
hashTable.insert("key5", 5);

// Retrieve values
console.log("\n=== Retrieving values ===");
console.log(`Value for key1: ${hashTable.get("key1")}`); // Output: 1
console.log(`Value for key2: ${hashTable.get("key2")}`); // Output: 2
console.log(`Value for key3: ${hashTable.get("key3")}`); // Output: 3
console.log(`Value for key4: ${hashTable.get("key4")}`); // Output: 4
console.log(`Value for key5: ${hashTable.get("key5")}`); // Output: 5

// Delete a key
console.log("\n=== Deleting a key (key2) ===");
hashTable.delete("key2");

// Display all key-value pairs
console.log("\n=== Displaying all key-value pairs ===");
hashTable.display();

// Check size, emptiness, and capacity of the hash table
console.log(
  "\n=== Checking size, emptiness, and capacity of the hash table ==="
);
console.log(`Size: ${hashTable.getSize()}`); // Output: Size: 4
console.log(`Is Empty: ${hashTable.isEmpty()}`); // Output: Is Empty: false
console.log(`Capacity: ${hashTable["capacity"]}`); // Output: Current capacity of the hash table

// These keys are chosen to cause collisions.
const key1 = "xyz";
const key2 = "zyx";

// Calculate the hash values for both keys.
console.log("\n=== Demonstrating hash collisions ===");
console.log(`Hash for ${key1}: ${hashTable.hash(key1)}`); // Assuming the same hash value for both keys
console.log(`Hash for ${key2}: ${hashTable.hash(key2)}`);

// Insert values into the hash table.
console.log("\n=== Inserting colliding keys ===");
hashTable.insert(key1, 6);
hashTable.insert(key2, 7);

// Display the values in the hash table.
console.log("\n=== Displaying all key-value pairs after collisions ===");
hashTable.display();

// Insert additional objects to trigger resizing
console.log(
  "\n=== Inserting additional key-value pairs to trigger resizing ==="
);
for (let i = 8; i <= 22; i++) {
  const key = `key${i}`;
  const value = i;
  hashTable.insert(key, value);
}

// Display the final state of the hash table
console.log("\n=== Final state of the hash table ===");
console.log(hashTable);
