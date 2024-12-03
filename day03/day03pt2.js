// Parte Dois

// Enquanto você examina a memória corrompida, percebe que algumas das instruções condicionais também estão intactas. Se você lidar com algumas dessas instruções condicionais não corrompidas no programa, talvez consiga obter um resultado ainda mais preciso.

// Há duas novas instruções que você precisará lidar:

// A instrução do() habilita as instruções mul futuras.
// A instrução don't() desabilita as instruções mul futuras.
// Somente a instrução do() ou don't() mais recente se aplica. No início do programa, as instruções mul estão habilitadas.

// Por exemplo:

// xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))

// Essa memória corrompida é semelhante ao exemplo anterior, mas dessa vez as instruções mul(5,5) e mul(11,8) estão desabilitadas porque há uma instrução don't() antes delas. As outras instruções mul funcionam normalmente, incluindo a que no final é reabilitada por uma instrução do().

// Dessa vez, a soma dos resultados é 48 (24 + 85).

// Lide com as novas instruções; o que você obtém se somar todos os resultados apenas das multiplicações habilitadas?

import fs from 'fs';

function main() {
  const input = fs.readFileSync('day03/day03.txt', 'utf-8');
  const regex = /(?:do\(\)|don't\(\)|mul\((\d+),(\d+)\))/g;
  let sum = 0;
  let match;
  let doInstruction = true;
  while ((match = regex.exec(input))) {
    if (match[0] === 'do()') {
      doInstruction = true;
    } else if (match[0] === "don't()") {
      doInstruction = false;
    } else if (doInstruction) {
      sum += parseInt(match[1]) * parseInt(match[2]);
    }
  }
  console.log(sum);
}

main();
