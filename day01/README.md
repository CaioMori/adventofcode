# Dia 1: Histeria do Historiador

## Parte 1

Os historiadores possuem duas listas de IDs de locais historicamente significativos que desejam reconciliar. Para isso, eles pareiam os números de ambas as listas em ordem crescente: o menor número da lista da esquerda com o menor da direita, o segundo menor com o segundo menor, e assim sucessivamente.

Após o pareamento, calculamos a diferença absoluta entre cada par de números. A soma de todas essas diferenças absolutas resulta na **distância total** entre as duas listas. Este valor representa o quão diferentes as listas são entre si.

## Parte 2

Agora, o objetivo é calcular uma **pontuação de similaridade** entre as duas listas. Para cada número na lista da esquerda, contamos quantas vezes ele aparece na lista da direita. Em seguida, multiplicamos o número da esquerda pela quantidade de ocorrências correspondentes na direita.

A soma de todos esses produtos nos dá a pontuação total de similaridade. Esse valor indica o grau de semelhança entre as listas, considerando a frequência com que os números aparecem em ambos os lados.
