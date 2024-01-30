import fs from "fs";
export const articles = JSON.parse(
  fs.readFileSync("./server/dataset.json", "utf-8")
);
