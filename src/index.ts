import myJSONParse from "./json-parser.js";

// Example of a complex JSON string containing arrays and objects
const jsonString = `
{
    "name": "Alice",
    "age": 28,
    "address": {
        "street": "123 Main St",
        "city": "Wonderland",
        "zip": "12345"
    },
    "phoneNumbers": [
        {
            "type": "home",
            "number": "123-456-7890"
        },
        {
            "type": "work",
            "number": "987-654-3210"
        }
    ],
    "email": "alice@example.com",
    "isStudent": false,
    "scores": [99, 87, 92.5],
    "favorites": {
        "color": "blue",
        "food": "pizza",
        "activities": ["reading", "hiking", "swimming"]
    }
}
`;

// Parse the JSON string using the custom myJSONParse function
const parsedObject = myJSONParse(jsonString);

// Log the parsed object to the console
console.log(parsedObject);
