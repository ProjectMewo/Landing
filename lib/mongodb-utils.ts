import { ObjectId } from "mongodb"

// Function to convert MongoDB documents to plain objects
export function serializeDocument<T>(doc: any): T {
  return JSON.parse(
    JSON.stringify(doc, (key, value) => {
      // Convert ObjectId to string
      if (value instanceof ObjectId) {
        return value.toString()
      }
      // Convert Date to ISO string
      if (value instanceof Date) {
        return value.toISOString()
      }
      return value
    }),
  )
}

