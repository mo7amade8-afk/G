import { parseStringPromise } from "xml2js";

/**
 * فك وتحليل XML إلى JSON
 * @param {string} xmlData
 * @returns {object}
 */
export async function decodeXML(xmlData) {
  if (!xmlData || typeof xmlData !== "string") {
    throw new Error("XML input is empty or invalid");
  }

  try {
    const result = await parseStringPromise(xmlData, {
      explicitArray: false, // لا يحول العناصر إلى مصفوفات
      trim: true,           // حذف الفراغات
      mergeAttrs: true      // دمج الخصائص
    });

    return result;
  } catch (err) {
    throw new Error("Failed to decode XML: " + err.message);
  }
}
