// **Parte Dois**

// Os engenheiros ficaram surpresos com o baixo número de relatórios seguros até perceberem que esqueceram de contar para você sobre o **Amortecedor de Problemas**.

// O **Amortecedor de Problemas** é um módulo instalado no reator que permite aos sistemas de segurança tolerarem um único nível problemático em um relatório que, de outra forma, seria considerado seguro. É como se o nível problemático nunca tivesse existido!

// Agora, as mesmas regras se aplicam como antes, exceto que, se remover um único nível de um relatório inseguro o tornaria seguro, o relatório deve ser contado como seguro.

// Mais relatórios do exemplo anterior agora são seguros:

// - `7 6 4 2 1`: Seguro sem remover nenhum nível.
// - `1 2 7 8 9`: Inseguro, independentemente do nível removido.
// - `9 7 6 2 1`: Inseguro, independentemente do nível removido.
// - `1 3 2 4 5`: Seguro ao remover o segundo nível, `3`.
// - `8 6 4 4 1`: Seguro ao remover o terceiro nível, `4`.
// - `1 3 6 7 9`: Seguro sem remover nenhum nível.

// Graças ao **Amortecedor de Problemas**, 4 relatórios agora são seguros!

// Atualize sua análise para lidar com situações em que o **Amortecedor de Problemas** pode remover um único nível de relatórios inseguros. Quantos relatórios são seguros agora?

import fs from 'fs';

function main() {
  const reports = readReports('day02/day02.txt');
  const safeReports = countSafeReports(reports);
  console.log(safeReports);
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
  for (const levels of reports) {
    if (isReportSafe(levels) || isReportSafeWithDampener(levels)) {
      safeReports++;
    }
  }
  return safeReports;
}

function isReportSafe(levels) {
  const isIncreasing = isMonotonic(levels, (a, b) => a < b);
  const isDecreasing = isMonotonic(levels, (a, b) => a > b);
  return isIncreasing || isDecreasing;
}

function isMonotonic(levels, compareFunc) {
  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i] - levels[i - 1];
    if (
      Math.abs(diff) < 1 ||
      Math.abs(diff) > 3 ||
      !compareFunc(levels[i - 1], levels[i])
    ) {
      return false;
    }
  }
  return true;
}

function isReportSafeWithDampener(levels) {
  for (let i = 0; i < levels.length; i++) {
    const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
    if (isReportSafe(modifiedLevels)) {
      return true;
    }
  }
  return false;
}

main();
