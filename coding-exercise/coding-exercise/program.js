const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('./mini-data.text');

  const rl = readline.createInterface({
    input: fileStream,
    output: process.stdout,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  const lines = [];
  for await (const line of rl) {
    lines.push(line);
  }

  lines.filter(line => line.includes('--'))
  .map(line => line.split('--')
  .filter(line => line.includes(',')));
}

processLineByLine();
