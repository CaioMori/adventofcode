// --- Dia 4: Busca por Ceres ---

// "Parece que o Chefe não está aqui. Próximo!" Um dos Historiadores pega um dispositivo e aperta o único botão nele. Após um breve flash, você reconhece o interior da estação de monitoramento de Ceres!

// Enquanto a busca pelo Chefe continua, uma pequena Elfa que vive na estação puxa sua camisa; ela gostaria de saber se você poderia ajudá-la com a sua caça-palavras (sua entrada de quebra-cabeça). Ela só precisa encontrar uma palavra: **XMAS**.

// Esta caça-palavras permite que as palavras estejam em posições horizontais, verticais, diagonais, escritas ao contrário ou até mesmo sobrepostas a outras palavras. É um pouco incomum, no entanto, pois você não precisa apenas encontrar uma instância de **XMAS** - você precisa encontrar **todas elas**. Aqui estão algumas formas de como **XMAS** pode aparecer, onde caracteres irrelevantes foram substituídos por `.`:

// ```
// ..X...
// .SAMX.
// .A..A.
// XMAS.S
// .X....
// ```

// A caça-palavras real estará cheia de letras em vez disso. Por exemplo:

// ```
// MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX
// ```

// Nesta caça-palavras, **XMAS** aparece um total de 18 vezes; aqui está a mesma caça-palavras novamente, mas onde letras que não fazem parte de nenhum **XMAS** foram substituídas por `.`:

// ```
// ....XXMAS.
// .SAMXMS...
// ...S..A...
// ..A.A.MS.X
// XMASAMX.MM
// X.....XA.A
// S.S.S.S.SS
// .A.A.A.A.A
// ..M.M.M.MM
// .X.X.XMASX
// ```

// Dê uma olhada na caça-palavras da pequena Elfa. Quantas vezes **XMAS** aparece?

import fs from 'fs';

function main() {
  const input = fs.readFileSync('day04/day04.txt', 'utf8');
  const lines = input.trim().split('\n');
  const numRows = lines.length;
  const numCols = lines[0].length;
  const word = 'XMAS';
  const directions = [
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: -1 },
    { x: 0, y: -1 },
    { x: -1, y: -1 },
  ];

  let count = 0;

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (lines[i][j] === 'X') {
        for (let dir of directions) {
          let found = true;
          for (let k = 0; k < word.length; k++) {
            const x = i + dir.x * k;
            const y = j + dir.y * k;
            if (
              x < 0 ||
              y < 0 ||
              x >= numRows ||
              y >= numCols ||
              lines[x][y] !== word[k]
            ) {
              found = false;
              break;
            }
          }
          if (found) {
            count++;
          }
        }
      }
    }
  }

  console.log(count);
}

main();
