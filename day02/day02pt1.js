// --- Dia 2: Relatórios do Nariz Vermelho ---

// Felizmente, a primeira localização que os Historiadores querem investigar não fica longe do escritório do Historiador Chefe.

// Embora a usina de fusão/fissão nuclear do Nariz Vermelho pareça não conter nenhum sinal do Historiador Chefe, os engenheiros lá correm até você assim que o veem. Aparentemente, eles ainda falam sobre a vez em que Rudolph foi salvo por meio de síntese molecular a partir de um único elétron.

// Eles rapidamente adicionam que - já que você está aqui - realmente apreciariam sua ajuda para analisar alguns dados incomuns do reator Nariz Vermelho. Você se vira para verificar se os Historiadores estão esperando por você, mas eles parecem já ter se dividido em grupos que estão atualmente procurando por todos os cantos da instalação. Você se oferece para ajudar com os dados incomuns.

// Os dados incomuns (sua entrada de quebra-cabeça) consistem em muitos relatórios, um por linha. Cada relatório é uma lista de números chamados níveis, separados por espaços. Por exemplo:

// ```
// 7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9
// ```

// Esses dados de exemplo contêm seis relatórios, cada um com cinco níveis.

// Os engenheiros estão tentando descobrir quais relatórios são seguros. Os sistemas de segurança do reator Nariz Vermelho só podem tolerar níveis que estejam gradualmente aumentando ou gradualmente diminuindo. Portanto, um relatório só é considerado seguro se ambas as condições abaixo forem verdadeiras:

// 1. Os níveis estão todos aumentando ou todos diminuindo.
// 2. Qualquer dois níveis adjacentes diferem por pelo menos 1 e no máximo 3.

// No exemplo acima, os relatórios podem ser avaliados como seguros ou inseguros verificando essas regras:

// - `7 6 4 2 1`: Seguro porque os níveis estão todos diminuindo de 1 ou 2.
// - `1 2 7 8 9`: Inseguro porque `2 7` é um aumento de 5.
// - `9 7 6 2 1`: Inseguro porque `6 2` é uma diminuição de 4.
// - `1 3 2 4 5`: Inseguro porque `1 3` está aumentando, mas `3 2` está diminuindo.
// - `8 6 4 4 1`: Inseguro porque `4 4` não é nem um aumento nem uma diminuição.
// - `1 3 6 7 9`: Seguro porque os níveis estão todos aumentando de 1, 2 ou 3.

// Neste exemplo, **2 relatórios** são seguros.

// Analise os dados incomuns dos engenheiros. **Quantos relatórios são seguros?**

// Para começar, obtenha sua entrada de quebra-cabeça.

import fs from 'fs';

function isSafeReport(report) {
  const diffs = [];

  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1];
    if (diff === 0 || Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      return false;
    }
    diffs.push(diff);
  }

  const allIncreasing = diffs.every((d) => d > 0);
  const allDecreasing = diffs.every((d) => d < 0);

  return allIncreasing || allDecreasing;
}

function readReports(filePath) {
  const input = fs.readFileSync(filePath, 'utf8');
  return input
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => line.split(' ').map(Number));
}

function countSafeReports(reports) {
  let safeReports = 0;
  for (const report of reports) {
    if (isSafeReport(report)) {
      safeReports++;
    }
  }
  return safeReports;
}

function main() {
  const reports = readReports('day02/day02.txt');

  const safeReports = countSafeReports(reports);

  console.log(safeReports);
}

main();
