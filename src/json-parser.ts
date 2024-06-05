/**
 * Parses a JSON-formatted string into a corresponding JavaScript object.
 * This implementation uses regular expressions to tokenize and parse the input string.
 *
 * @param {string} jsonString - The JSON-formatted string to be parsed.
 * @returns {any} - The JavaScript object representation of the parsed JSON string.
 * @throws {SyntaxError} - Throws an error if the JSON string is malformed.
 */
function myJSONParse(jsonString: string) {
  // Array to store the tokens identified in the JSON string.
  const tokens: string[] = [];

  // Regular expression to tokenize the JSON string.
  // It matches strings, booleans, null, numbers, and punctuation characters used in JSON syntax.
  const regex =
    /"((?:\\.|[^"\\])*)"|true|false|null|-?[0-9]+(?:\.[0-9]+)?|\[|\]|\{|\}|:|,/g;
  let match: RegExpExecArray | null;

  // Execute the regular expression on the JSON string and store the matches in the tokens array.
  while ((match = regex.exec(jsonString)) !== null) {
    tokens.push(match[0]);
  }

  // Helper function to parse the next value from the tokens array.
  const parseValue = (): any => {
    // Retrieve the next token from the tokens array.
    const token = tokens.shift();
    if (token === undefined)
      throw new SyntaxError("Unexpected end of JSON input");

    // Determine the type of the token and parse it accordingly.
    switch (token) {
      case "true":
        return true;
      case "false":
        return false;
      case "null":
        return null;
      case "[": {
        const arr: any[] = [];
        // Parse array elements until the closing bracket is encountered.
        while (tokens[0] !== "]") {
          arr.push(parseValue());
          if (tokens[0] === ",") tokens.shift();
        }
        tokens.shift(); // Remove the closing ']'
        return arr;
      }
      case "{": {
        const obj: Record<string, any> = {};
        // Parse object key-value pairs until the closing brace is encountered.
        while (tokens[0] !== "}") {
          const key = parseValue();
          if (typeof key !== "string")
            throw new SyntaxError("Expected a string key");
          if (tokens.shift() !== ":")
            throw new SyntaxError('Expected ":" after key');
          obj[key] = parseValue();
          if (tokens[0] === ",") tokens.shift();
        }
        tokens.shift(); // Remove the closing '}'
        return obj;
      }
      default: {
        // Handle strings, numbers, and invalid tokens.
        if (/^"((?:\\.|[^"\\])*)"$/.test(token)) {
          // Remove quotes and unescape characters in the string.
          return token
            .slice(1, -1)
            .replace(/\\"/g, '"')
            .replace(/\\\\/g, "\\")
            .replace(/\\n/g, "\n");
        }
        if (/^-?[0-9]+(?:\.[0-9]+)?$/.test(token)) {
          return Number(token); // Convert numeric tokens to numbers.
        }
        throw new SyntaxError(`Unexpected token: ${token}`);
      }
    }
  };

  // Parse the value from the tokens and return the resulting JavaScript object.
  return parseValue();
}

export default myJSONParse;
