// --- Dia 1: Histeria do Historiador ---

// O Historiador-Chefe sempre está presente no grande lançamento do trenó de Natal, mas ninguém o vê há meses! A última notícia que se teve dele é que estava visitando locais historicamente significativos para o Polo Norte; um grupo de Historiadores Seniores pediu que você os acompanhasse enquanto verificam os lugares onde acham que ele provavelmente visitou.

// À medida que cada local é verificado, eles o marcarão em sua lista com uma estrela. Eles acham que o Historiador-Chefe deve estar em um dos primeiros cinquenta lugares que procurarão, então, para salvar o Natal, você precisa ajudá-los a conseguir cinquenta estrelas em sua lista antes que o Papai Noel decole em 25 de dezembro.

// Colete estrelas resolvendo quebra-cabeças. Dois quebra-cabeças serão disponibilizados em cada dia no calendário do Advento; o segundo quebra-cabeça é desbloqueado quando você completa o primeiro. Cada quebra-cabeça concede uma estrela. Boa sorte!

// Você nem saiu ainda e o grupo de Historiadores Seniores Elfos já encontrou um problema: sua lista de locais para verificar está atualmente vazia. Eventualmente, alguém decide que o melhor lugar para verificar primeiro seria o escritório do Historiador-Chefe.

// Ao entrar no escritório, todos confirmam que o Historiador-Chefe realmente não está em lugar algum. Em vez disso, os Elfos descobrem uma variedade de notas e listas de locais historicamente significativos! Parece ser o planejamento que o Historiador-Chefe estava fazendo antes de partir. Talvez essas notas possam ser usadas para determinar quais locais procurar?

// Por todo o escritório do Chefe, os locais historicamente significativos estão listados não por nome, mas por um número único chamado ID de localização. Para garantir que não percam nada, os Historiadores se dividem em dois grupos, cada um vasculhando o escritório e tentando criar sua própria lista completa de IDs de localização.

// Há apenas um problema: ao colocar as duas listas lado a lado (sua entrada do quebra-cabeça), rapidamente fica claro que as listas não são muito semelhantes. Talvez você possa ajudar os Historiadores a conciliar suas listas?

// Por exemplo:

// 3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3

// Talvez as listas estejam apenas um pouco diferentes! Para descobrir, emparelhe os números e meça o quão distantes eles estão. Emparelhe o menor número da lista da esquerda com o menor número da lista da direita, depois o segundo menor número da esquerda com o segundo menor número da direita, e assim por diante.

// Dentro de cada par, descubra o quão distantes os dois números estão; você precisará somar todas essas distâncias. Por exemplo, se você emparelhar um 3 da lista da esquerda com um 7 da lista da direita, a distância entre eles é 4; se você emparelhar um 9 com um 3, a distância entre eles é 6.

// Na lista de exemplo acima, os pares e distâncias seriam os seguintes:

// 1. O menor número na lista da esquerda é 1, e o menor número na lista da direita é 3. A distância entre eles é 2.
// 2. O segundo menor número na lista da esquerda é 2, e o segundo menor número na lista da direita é outro 3. A distância entre eles é 1.
// 3. O terceiro menor número em ambas as listas é 3, então a distância entre eles é 0.
// 4. Os próximos números a serem emparelhados são 3 e 4, uma distância de 1.
// 5. Os quintos menores números em cada lista são 3 e 5, uma distância de 2.
// 6. Finalmente, o maior número na lista da esquerda é 4, enquanto o maior número na lista da direita é 9; estes estão a uma distância de 5.

// Para encontrar a distância total entre a lista da esquerda e a lista da direita, some as distâncias entre todos os pares que você encontrou. No exemplo acima, isso é 2 + 1 + 0 + 1 + 2 + 5, uma distância total de 11!

// Suas listas da esquerda e da direita reais contêm muitos IDs de localização. Qual é a distância total entre suas listas?

import fs from 'fs';

function main() {
  const input = fs.readFileSync('day01/day01.txt', 'utf8');
  const inputArray = input
    .split('\n')
    .map((item) => item.split(' ').filter((item) => item !== ''));

  const leftList = inputArray.map((item) => parseInt(item[0]));
  const rightList = inputArray.map((item) => parseInt(item[1]));

  const sortedLeftList = leftList.sort((a, b) => a - b);
  const sortedRightList = rightList.sort((a, b) => a - b);

  console.log('sortedLeftList', sortedLeftList);
  console.log('sortedRightList', sortedRightList);

  const distance = sortedLeftList.reduce((acc, item, index) => {
    return acc + Math.abs(item - sortedRightList[index]);
  }, 0);

  console.log('distance', distance);
}

main();
