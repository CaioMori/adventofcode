// --- Parte Dois ---

// A Elfa olha para você com um olhar intrigado. Você entendeu errado a tarefa?

// Procurando pelas instruções, você vira a caça-palavras e descobre que isso não é realmente um quebra-cabeça de XMAS; é um quebra-cabeça de X-MAS, onde você deve encontrar dois **MAS** na forma de um **X**. Uma maneira de alcançar isso é assim:

// ```
// M.S
// .A.
// M.S
// ```

// Novamente, caracteres irrelevantes foram substituídos por `.` no diagrama acima. Dentro do **X**, cada **MAS** pode ser escrito para frente ou para trás.

// Aqui está o mesmo exemplo de antes, mas desta vez todos os **X-MAS** foram mantidos:

// ```
// .M.S......
// ..A..MSMS.
// .M.S.MAA..
// ..A.ASMSM.
// .M.S.M....
// ..........
// S.S.S.S.S.
// .A.A.A.A..
// M.M.M.M.M.
// ..........
// ```

// Neste exemplo, um **X-MAS** aparece 9 vezes.

// Vire a caça-palavras das instruções de volta para o lado com a palavra e tente novamente. Quantas vezes um **X-MAS** aparece?

import fs from 'fs';

function main() {
  const input = fs.readFileSync('day04/day04.txt', 'utf8');
  const grid = input.trim().split('\n');
  const numRows = grid.length;
  const numCols = grid[0].length;
  let count = 0;

  const words = [
    ['M', 'A', 'S'],
    ['S', 'A', 'M'],
  ];

  for (let i = 1; i < numRows - 1; i++) {
    for (let j = 1; j < numCols - 1; j++) {
      const center = grid[i][j];
      if (center !== 'A') continue;

      const arms = [
        {
          positionsArm1: [
            [i - 1, j - 1],
            [i, j],
            [i + 1, j + 1],
          ],
          positionsArm2: [
            [i - 1, j + 1],
            [i, j],
            [i + 1, j - 1],
          ],
        },
      ];

      for (let arm of arms) {
        for (let word1 of words) {
          let matchArm1 = true;
          for (let k = 0; k < 3; k++) {
            const [x, y] = arm.positionsArm1[k];
            if (
              x < 0 ||
              y < 0 ||
              x >= numRows ||
              y >= numCols ||
              grid[x][y] !== word1[k]
            ) {
              matchArm1 = false;
              break;
            }
          }

          if (!matchArm1) continue;

          for (let word2 of words) {
            let matchArm2 = true;
            for (let k = 0; k < 3; k++) {
              const [x, y] = arm.positionsArm2[k];
              if (
                x < 0 ||
                y < 0 ||
                x >= numRows ||
                y >= numCols ||
                grid[x][y] !== word2[k]
              ) {
                matchArm2 = false;
                break;
              }
            }

            if (matchArm2) {
              count++;
            }
          }
        }
      }
    }
  }

  console.log(count);
}

main();
