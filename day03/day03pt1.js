// Dia 3: Reflita sobre isso

// "Os nossos computadores estão com problemas, então não tenho ideia se temos algum Historiador Chefe em estoque! Mas você pode conferir no armazém", diz o atendente, um pouco atordoado, na Loja de Aluguel de Trenós no Polo Norte. Os Historiadores saem para dar uma olhada.

// O atendente se vira para você. "Tem alguma chance de você conseguir ver por que nossos computadores estão com problemas novamente?"

// O computador parece estar tentando rodar um programa, mas sua memória (a entrada do seu quebra-cabeça) está corrompida. Todas as instruções foram embaralhadas!

// Parece que o objetivo do programa é simplesmente multiplicar alguns números. Isso é feito com instruções como mul(X,Y), onde X e Y são números de 1 a 3 dígitos. Por exemplo, mul(44,46) multiplica 44 por 46, resultando em 2024. Da mesma forma, mul(123,4) multiplicaria 123 por 4.

// No entanto, devido à corrupção da memória do programa, também há muitos caracteres inválidos que devem ser ignorados, mesmo que pareçam parte de uma instrução mul. Sequências como mul(4*, mul(6,9!, ?(12,34), ou mul ( 2 , 4 ) não fazem nada.

// Por exemplo, considere a seguinte seção de memória corrompida:

// xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))

// Somente as quatro seções destacadas são instruções mul válidas. Somando os resultados de cada instrução, obtemos 161 (24 + 55 + 118 + 85).

// Escaneie a memória corrompida em busca de instruções mul não corrompidas. O que você obtém se somar todos os resultados das multiplicações?

import fs from 'fs';

function main() {
  const input = fs.readFileSync('day03/day03.txt', 'utf-8');
  const regex = /mul\((\d+),(\d+)\)/g;
  let sum = 0;
  let match;
  while ((match = regex.exec(input))) {
    sum += parseInt(match[1]) * parseInt(match[2]);
  }
  console.log(sum);
}

main();
