import pdfParse from "pdf-parse";
import JSZip from "jszip";
import { XMLParser } from "fast-xml-parser";

export async function extractText(buffer: Buffer, extension: string): Promise<string> {
  switch (extension) {
    case ".pdf":
      return extractPdfText(buffer);
    case ".pptx":
      return extractPptxText(buffer);
    default:
      throw new Error(`Unsupported file type: ${extension}`);
  }
}

async function extractPdfText(buffer: Buffer): Promise<string> {
  const data = await pdfParse(buffer);
  return data.text;
}

async function extractPptxText(buffer: Buffer): Promise<string> {
  const zip = await JSZip.loadAsync(buffer);
  const parser = new XMLParser({ ignoreAttributes: false, ignoreDeclaration: true });
  const slideRegex = /^ppt\/slides\/slide\d+\.xml$/;
  let textParts: string[] = [];

  const slideFiles = Object.keys(zip.files).filter((name) => slideRegex.test(name));

  for (const name of slideFiles) {
    const xmlString = await zip.files[name].async("string");
    const jsonObj = parser.parse(xmlString);
    // The text is usually under p:txBody or a:t tags; we can recursively search.
    collectText(jsonObj, textParts);
  }

  return textParts.join("\n");
}

type GenericObject = { [key: string]: any };

function collectText(obj: GenericObject, collector: string[]) {
  if (obj === null || typeof obj !== "object") return;

  if (typeof obj === "string") {
    collector.push(obj);
    return;
  }

  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (key === "a:t" && typeof value === "string") {
      collector.push(value);
    } else if (Array.isArray(value)) {
      value.forEach((v) => collectText(v, collector));
    } else if (typeof value === "object") {
      collectText(value, collector);
    }
  }
} 