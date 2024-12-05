// --- Dia 5: Fila de Impressão ---

// Satisfeitos com sua busca em Ceres, o esquadrão de estudiosos sugere, posteriormente, vasculhar as pilhas de papelaria do subsolo 17.

// O departamento de impressão do Polo Norte está mais ocupado do que nunca, tão próximo do Natal, e enquanto os Historiadores continuam sua busca por este local historicamente significativo, um Elfo operando uma impressora muito familiar acena para você.

// O Elfo deve reconhecê-lo, porque não perde tempo ao explicar que as atualizações do novo manual de segurança para lançamento do trenó não estão sendo impressas corretamente. Falhar na atualização dos manuais de segurança seria algo realmente terrível, então você oferece seus serviços.

// Os protocolos de segurança indicam claramente que as novas páginas dos manuais de segurança devem ser impressas em uma ordem muito específica. A notação X|Y significa que, se os números das páginas X e Y forem produzidos como parte de uma atualização, o número da página X deve ser impresso em algum momento antes do número da página Y.

// O Elfo tem para você tanto as regras de ordenação das páginas quanto as páginas que devem ser produzidas em cada atualização (sua entrada do problema), mas não consegue descobrir se cada atualização possui as páginas na ordem correta.

// Por exemplo:

// ```
// 47|53
// 97|13
// 97|61
// 97|47
// 75|29
// 61|13
// 75|53
// 29|13
// 97|29
// 53|29
// 61|53
// 97|53
// 61|29
// 47|13
// 75|47
// 97|75
// 47|61
// 75|61
// 47|29
// 75|13
// 53|13
// ```

// ```
// 75,47,61,53,29
// 97,61,53,29,13
// 75,29,13
// 75,97,47,61,53
// 61,13,29
// 97,13,75,29,47
// ```

// A primeira seção especifica as regras de ordenação das páginas, uma por linha. A primeira regra, 47|53, significa que, se uma atualização incluir os números das páginas 47 e 53, o número da página 47 deve ser impresso em algum momento antes do número 53. (47 não precisa estar imediatamente antes de 53; outras páginas podem estar entre elas.)

// A segunda seção especifica os números das páginas de cada atualização. Como a maioria dos manuais de segurança são diferentes, as páginas necessárias para as atualizações também variam. A primeira atualização, `75,47,61,53,29`, significa que a atualização consiste nos números das páginas 75, 47, 61, 53 e 29.

// Para colocar as impressoras em funcionamento o mais rápido possível, comece identificando quais atualizações já estão na ordem correta.

// No exemplo acima, a primeira atualização (`75,47,61,53,29`) está na ordem correta:

// - 75 está corretamente em primeiro lugar, porque há regras que colocam cada uma das outras páginas depois dela: 75|47, 75|61, 75|53 e 75|29.
// - 47 está corretamente em segundo lugar, porque 75 deve estar antes dela (75|47) e todas as outras páginas devem estar depois dela, conforme 47|61, 47|53 e 47|29.
// - 61 está corretamente no meio, porque 75 e 47 estão antes dela (75|61 e 47|61) e 53 e 29 estão depois dela (61|53 e 61|29).
// - 53 está corretamente em quarto lugar porque está antes da página 29 (53|29).
// - 29 é a única página restante e, portanto, está corretamente por último.

// Como a primeira atualização não inclui alguns números de páginas, as regras de ordenação que envolvem esses números ausentes são ignoradas.

// A segunda e a terceira atualizações também estão na ordem correta de acordo com as regras. Assim como a primeira atualização, elas também não incluem todos os números de páginas, então apenas algumas das regras de ordenação se aplicam – dentro de cada atualização, as regras que envolvem números de páginas ausentes não são usadas.

// A quarta atualização, `75,97,47,61,53`, não está na ordem correta: ela imprimiria 75 antes de 97, o que viola a regra 97|75.

// A quinta atualização, `61,13,29`, também não está na ordem correta, pois quebra a regra 29|13.

// A última atualização, `97,13,75,29,47`, não está na ordem correta devido à violação de várias regras.

// Por algum motivo, os Elfos também precisam saber o número da página central de cada atualização que está sendo impressa. Como você está imprimindo apenas as atualizações ordenadas corretamente, precisará encontrar o número da página central de cada atualização ordenada corretamente. No exemplo acima, as atualizações ordenadas corretamente são:

// ```
// 75,47,61,53,29
// 97,61,53,29,13
// 75,29,13
// ```

// Elas têm os números de páginas centrais 61, 53 e 29, respectivamente. Somando esses números, obtemos 143.

// Claro, você precisará ter cuidado: a lista real de regras de ordenação das páginas é maior e mais complicada do que o exemplo acima.

// Determine quais atualizações já estão na ordem correta. Qual é o resultado da soma dos números da página central dessas atualizações?

import fs from 'fs';

function main() {
  const input = fs.readFileSync('day05/day05.txt', 'utf8');
  const [rules, updates] = input.trim().split('\n\n');
  const rulesArr = rules.trim().split('\n');
  const updatesArr = updates.trim().split('\n');

  const rulesMap = new Map();
  rulesArr.forEach((rule) => {
    const [a, b] = rule.split('|').map(Number);
    if (!rulesMap.has(a)) {
      rulesMap.set(a, []);
    }
    rulesMap.get(a).push(b);
  });

  let sum = 0;
  updatesArr.forEach((update) => {
    const pages = update.split(',').map(Number);
    const indexMap = new Map();
    pages.forEach((page, idx) => {
      indexMap.set(page, idx);
    });

    let ordered = true;
    for (const [a, bs] of rulesMap.entries()) {
      if (!indexMap.has(a)) continue;
      for (const b of bs) {
        if (!indexMap.has(b)) continue;
        if (indexMap.get(a) >= indexMap.get(b)) {
          ordered = false;
          break;
        }
      }
      if (!ordered) break;
    }

    if (ordered) {
      const middle = pages[Math.floor(pages.length / 2)];
      sum += middle;
    }
  });

  console.log(sum);
}

main();
