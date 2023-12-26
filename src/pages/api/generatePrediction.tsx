import { NextApiRequest, NextApiResponse } from "next";
import data from "../../model/data.json";

function calculateProbabilities(
  data: Array<Array<number>>,
  input: Array<number>
) {
  // Count occurrences of each sequence in the data
  const occurrences = { 0: 0, 1: 0, 2: 0 };

  for (const sequence of data) {
    for (let i = 0; i <= sequence.length - input.length; i++) {
      const subsequence = sequence.slice(i, i + input.length);
      const isMatch = input.every(
        (value, index) => value === subsequence[index]
      );

      if (isMatch) {
        const nextElement = sequence[i + input.length];
        occurrences[nextElement]++;
      }
    }
  }

  // Calculate probabilities
  const totalOccurrences = Object.values(occurrences).reduce(
    (sum, count) => sum + count,
    0
  );
  const probabilities = {};

  for (const key in occurrences) {
    probabilities[key] =
      totalOccurrences > 0
        ? ((occurrences[key] / totalOccurrences) * 100).toFixed(2) + "%"
        : "0%";
  }

  return probabilities;
}
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  //check first if the call is a POST request
  //if not, return an error
  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests allowed" });
    return;
  }
  //get the data from the request body
  const { dataHistory }: { dataHistory: Array<number> } = req.body;
  const predict = calculateProbabilities(data.data, dataHistory);
  //return the data with a 200 status code
  res.status(200).json(predict);
}
