// lib/sanitizeForClient.js

function sanitizeForClient(obj) {
  if (Array.isArray(obj)) {
    return obj.map(sanitizeForClient);
  } else if (obj && typeof obj === "object") {
    const plainObject = {};
    for (const key in obj) {
      const value = obj[key];

      if (value instanceof Date) {
        plainObject[key] = value.toISOString();
      } else if (
        value &&
        typeof value === "object" &&
        typeof value.toHexString === "function"
      ) {
        // MongoDB ObjectId
        plainObject[key] = value.toHexString();
      } else if (Buffer.isBuffer(value)) {
        // Node Buffer
        plainObject[key] = value.toString("base64"); // ou 'hex'
      } else {
        plainObject[key] = sanitizeForClient(value);
      }
    }
    return plainObject;
  }
  return obj;
}

module.exports = { sanitizeForClient };
