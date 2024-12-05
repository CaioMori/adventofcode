// --- Parte Dois ---

// Enquanto os Elfos começam a imprimir as atualizações ordenadas corretamente, você tem um pouco de tempo para corrigir o restante delas.

// Para cada uma das atualizações que não estão ordenadas corretamente, use as regras de ordenação de páginas para colocar os números das páginas na ordem correta. Para o exemplo acima, aqui estão as três atualizações incorretamente ordenadas e suas ordenações corretas:

// 75,97,47,61,53 torna-se 97,75,47,61,53.
// 61,13,29 torna-se 61,29,13.
// 97,13,75,29,47 torna-se 97,75,47,29,13.
// Após considerar apenas as atualizações incorretamente ordenadas e ordená-las corretamente, seus números de página centrais são 47, 29 e 47. Somando esses números, obtemos 123.

// Encontre as atualizações que não estão na ordem correta. O que você obtém se somar os números da página central após ordenar corretamente apenas essas atualizações?

import fs from 'fs';

function topologicalSort(nodes, rulesMap) {
  const adjList = new Map();
  const inDegree = new Map();

  nodes.forEach((node) => {
    adjList.set(node, []);
    inDegree.set(node, 0);
  });

  for (const [a, bs] of rulesMap.entries()) {
    if (!adjList.has(a)) continue;
    for (const b of bs) {
      if (!adjList.has(b)) continue;
      adjList.get(a).push(b);
      inDegree.set(b, inDegree.get(b) + 1);
    }
  }

  const queue = [];
  nodes.forEach((node) => {
    if (inDegree.get(node) === 0) {
      queue.push(node);
    }
  });

  const sorted = [];
  while (queue.length > 0) {
    const node = queue.shift();
    sorted.push(node);
    adjList.get(node).forEach((neighbor) => {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    });
  }

  return sorted;
}

function main() {
  const input = fs.readFileSync('day05/day05.txt', 'utf8');
  const [rules, updates] = input.trim().split('\n\n');
  const rulesArr = rules.trim().split('\n');
  const updatesArr = updates.trim().split('\n');

  const rulesMap = new Map();
  rulesArr.forEach((rule) => {
    const [a, b] = rule.split('|').map(Number);
    if (!rulesMap.has(a)) {
      rulesMap.set(a, new Set());
    }
    rulesMap.get(a).add(b);
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

    if (!ordered) {
      const sortedPages = topologicalSort(pages, rulesMap);
      const middle = sortedPages[Math.floor(sortedPages.length / 2)];
      sum += middle;
    }
  });

  console.log(sum);
}

main();
