// --- Parte Dois ---

// Sua análise apenas confirmou o que todos temiam: as duas listas de IDs de localização são realmente muito diferentes.

// Ou serão?

// Os Historiadores não conseguem concordar sobre qual grupo cometeu os erros ou como ler a maior parte da caligrafia do Chefe, mas na comoção você nota um detalhe interessante: muitos IDs de localização aparecem em ambas as listas! Talvez os outros números não sejam IDs de localização, mas sim caligrafia mal interpretada.

// Desta vez, você precisará descobrir exatamente com que frequência cada número da lista da esquerda aparece na lista da direita. Calcule uma pontuação total de similaridade somando cada número na lista da esquerda após multiplicá-lo pelo número de vezes que esse número aparece na lista da direita.

// Aqui estão as mesmas listas de exemplo novamente:

// 3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3

// Para essas listas de exemplo, aqui está o processo de encontrar a pontuação de similaridade:

// 1. O primeiro número na lista da esquerda é 3. Ele aparece na lista da direita três vezes, então a pontuação de similaridade aumenta em 3 * 3 = 9.
// 2. O segundo número na lista da esquerda é 4. Ele aparece na lista da direita uma vez, então a pontuação de similaridade aumenta em 4 * 1 = 4.
// 3. O terceiro número na lista da esquerda é 2. Ele não aparece na lista da direita, então a pontuação de similaridade não aumenta (2 * 0 = 0).
// 4. O quarto número, 1, também não aparece na lista da direita.
// 5. O quinto número, 3, aparece na lista da direita três vezes; a pontuação de similaridade aumenta em 9.
// 6. O último número, 3, aparece na lista da direita três vezes; a pontuação de similaridade novamente aumenta em 9.

// Assim, para essas listas de exemplo, a pontuação de similaridade no final deste processo é 31 (9 + 4 + 0 + 0 + 9 + 9).

// Considere novamente suas listas da esquerda e da direita. Qual é a pontuação de similaridade delas?

import fs from 'fs';

function main() {
  const input = fs.readFileSync('day01/day01.txt', 'utf8');
  const inputArray = input
    .split('\n')
    .map((item) => item.split(' ').filter((item) => item !== ''));

  const leftList = inputArray.map((item) => parseInt(item[0]));
  const rightList = inputArray.map((item) => parseInt(item[1]));

  const similarity = leftList.reduce((acc, item) => {
    const count = rightList.filter((rightItem) => rightItem === item).length;
    return acc + item * count;
  }, 0);

  console.log('similarity', similarity);
}

main();
