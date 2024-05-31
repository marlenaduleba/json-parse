
# Hash Functions and Hash Tables

This repository contains an implementation of a hash table in TypeScript with a custom hash function. The project demonstrates the concepts of hash functions, collision resolution, and practical application of hash tables.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installing

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies

```sh
npm install
```
### Building the Project
```sh
npm run build
```

### Running the Project
```sh
npm start
```

### Running the Tests
```sh
npm test
```

## Performance Analysis

### Hash Function
The custom hash function implemented in this project uses a polynomial accumulation with the prime base of 31 to distribute keys evenly across the hash table. The hash function has a time complexity of O(n), where n is the length of the key.

### Operations
- **Insertion**: Average-case O(1), worst-case O(n) if the table is full and rehashing occurs. With dynamic resizing, the insertion operation remains efficient even as the table grows.
- **Deletion**: Average-case O(1), but can degrade to O(n) in scenarios with extensive collisions and when a deep scan is needed to find the item. Dynamic resizing helps maintain a balanced load factor, reducing the likelihood of such scenarios.
- **Retrieval**: Generally O(1) on average, but can escalate to O(n) under heavy collisions and nearly full table conditions. Dynamic resizing helps prevent the table from becoming overly full, preserving efficient retrieval times.

### Trade-offs
- **Space vs. Time**: Achieving efficient collision management often requires additional space or increases complexity. Dynamic resizing adds overhead to insertion operations but improves overall performance by keeping the load factor within an optimal range.
- **Linear Probing**: While simple, linear probing can lead to clustering, which worsens performance as the load factor increases. Dynamic resizing mitigates clustering by redistributing keys across a larger array when necessary.

## Authors
- Marlena Dulęba

## License
- This project is licensed under the ISC License.
