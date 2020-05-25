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

// TODO: parameterize data folder so it's not assuming current working dir
// TODO: script input arg regex to make this more flexible
// export function fGetInputFileLocations(fileTypeSuffix: string) {
//   const sDataFolderPath = ;

//   return fs
//     .readdirSync(path.join(__dirname, "."))
//     .find((sFileName) => sFileName.endsWith(fileTypeSuffix));
// }

const main = async () => {
  const sFile = fs
    .readdirSync(path.join(__dirname, "."))
    .find((sFileName) => sFileName.endsWith(".csv"));
  const csvContent = await fpReadFile(sFile, "utf8");
  const parsedCsvCardRows = CSVToArray(csvContent).filter(
    (arrs) => arrs[0]?.trim() === "custom-card"
  );

  console.log(csvContent);
  const iRandomDraw = Math.floor(Math.random() * parsedCsvCardRows.length);
  console.log(
    "you randomly drew::",
    iRandomDraw,
    parsedCsvCardRows[iRandomDraw]
  );
};

main();
