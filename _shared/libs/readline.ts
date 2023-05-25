import { createInterface } from "readline";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const readLineAsync = (question: string) => {
  return new Promise<string>((resolve, reject) => {
    readline.question(question, (answer) => {
      if (!answer) {
        reject("Answers are required :(.");
      }
      resolve(answer);
    });
  });
};

export const close = () => readline.close();
