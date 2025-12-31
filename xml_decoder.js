import fs from "fs-extra";
import { AXMLParser } from "axml-parser";

// دالة لفك XML الثنائي
export async function decodeXML(binaryXmlBuffer) {
  try {
    // إذا كان النص عبارة عن Base64 من Telegram
    let buffer;
    if (typeof binaryXmlBuffer === "string") {
      buffer = Buffer.from(binaryXmlBuffer, "base64");
    } else {
      buffer = binaryXmlBuffer;
    }

    const parser = new AXMLParser(buffer);
    const xmlObj = parser.parse();
    return xmlObj; // هذا ككائن JSON
  } catch (err) {
    throw new Error("Failed to decode binary XML: " + err.message);
  }
}
