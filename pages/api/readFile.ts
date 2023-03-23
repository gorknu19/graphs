import * as fs from "node:fs";
import reader from "xlsx";
import type { NextApiRequest, NextApiResponse } from "next";

interface Data {
  FAG: string;
  SPM1: number;
  SPM2: number;
  SPM3: number;
  SPM4: number;
  SPM5: number;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>,
) {
  const file = reader.readFile("./data/Evaluering.xlsx");

  let data: Data[] = [];
  const sheets = file.SheetNames;
  if (sheets && data)
    for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
      temp.forEach((res) => {
        data.push(res as Data);
      });
    }
  res.status(200).json(data);
}
