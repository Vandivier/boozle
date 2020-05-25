import * as fs from "fs";
import * as path from "path";
import * as util from "util";

const fpReadFile = util.promisify(fs.readFile);

// ref: https://stackoverflow.com/questions/1293147/javascript-code-to-parse-csv-data
export function CSVToArray(strData: string, strDelimiter?: string): string[][] {
  strDelimiter = strDelimiter || ",";

  var objPattern = new RegExp(
    // Delimiters.
    "(\\" +
      strDelimiter +
      "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      // Standard fields.
      '([^"\\' +
      strDelimiter +
      "\\r\\n]*))",
    "gi"
  );

  var arrData = [[]];
  var arrMatches = null;

  while ((arrMatches = objPattern.exec(strData))) {
    var strMatchedValue;
    var strMatchedDelimiter = arrMatches[1];

    if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
      arrData.push([]);
    }

    if (arrMatches[2]) {
      strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
    } else {
      strMatchedValue = arrMatches[3];
    }

    arrData[arrData.length - 1].push(strMatchedValue);
  }

  return arrData;
}

const main = async () => {
  const sFile = fs
    .readdirSync(path.join(__dirname, "."))
    .find((sFileName) => sFileName.endsWith("current-game.csv"));
  const csvContent = await fpReadFile(sFile, "utf8");
  const parsedCsvCardRows = CSVToArray(csvContent).filter(
    (arrs) => arrs[0]?.trim() === "custom-card"
  );

  const iRandomDraw = Math.floor(Math.random() * parsedCsvCardRows.length);
  console.log(
    "you randomly drew::",
    iRandomDraw,
    parsedCsvCardRows[iRandomDraw]
  );
};

main();
