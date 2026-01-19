# Exemplos de Nomenclatura de Arquivos

Este documento demonstra como funciona a lógica de nomenclatura dos arquivos.

## Formato

```
AAMMDD[seq][Iniciais] - Parceiro - Descrição.jpg
```

Onde:
- **AA**: Ano (2 dígitos) - ex: 26 para 2026
- **MM**: Mês (2 dígitos) - ex: 01 para Janeiro
- **DD**: Dia (2 dígitos) - ex: 19
- **[seq]**: Letra sequencial (a, b, c, d...) baseada no número de arquivos com a mesma data
- **[Iniciais]**: Iniciais do usuário - ex: MR, AB, JD
- **Parceiro**: Nome do fornecedor/cliente
- **Descrição**: Descrição da movimentação

## Exemplos Práticos

### Cenário 1: Primeiro lançamento do dia
**Data**: 19/01/2026  
**Usuário**: MR  
**Parceiro**: Loja ABC  
**Descrição**: Compra material  

**Resultado**: `260119aMR - Loja ABC - Compra material.jpg`

### Cenário 2: Segundo lançamento do mesmo dia
**Data**: 19/01/2026  
**Usuário**: MR  
**Parceiro**: Restaurante XYZ  
**Descrição**: Almoço equipe  

**Resultado**: `260119bMR - Restaurante XYZ - Almoço equipe.jpg`

### Cenário 3: Terceiro lançamento, usuário diferente
**Data**: 19/01/2026  
**Usuário**: AB  
**Parceiro**: Cliente 123  
**Descrição**: Venda produtos  

**Resultado**: `260119cAB - Cliente 123 - Venda produtos.jpg`

### Cenário 4: Lançamentos em dias diferentes
**Data**: 20/01/2026  
**Usuário**: MR  
**Parceiro**: Fornecedor Y  
**Descrição**: Pagamento fatura  

**Resultado**: `260120aMR - Fornecedor Y - Pagamento fatura.jpg`  
(Note que volta para 'a' porque é um dia diferente)

## Lógica de Sequenciamento

O sistema:

1. **Lê a pasta do Drive** antes de salvar cada arquivo
2. **Conta arquivos** que começam com o prefixo da data (AAMMDD)
3. **Calcula a letra**:
   - 0 arquivos encontrados → letra 'a' (primeiro do dia)
   - 1 arquivo encontrado → letra 'b' (segundo do dia)
   - 2 arquivos encontrados → letra 'c' (terceiro do dia)
   - E assim por diante...

## Vantagens

- ✅ **Ordenação cronológica**: Arquivos automaticamente ordenados por data
- ✅ **Sem conflitos**: Nunca haverá dois arquivos com o mesmo nome
- ✅ **Rastreabilidade**: Fácil identificar quem e quando lançou
- ✅ **Busca facilitada**: Procure por data, usuário ou parceiro
- ✅ **Sequência clara**: Veja quantos lançamentos houve em cada dia

## Limitações

- Suporta até 26 lançamentos por dia por usuário (a-z)
- Se precisar mais, o código pode ser estendido para usar 'aa', 'ab', etc.

## Caracteres Especiais

O sistema automaticamente remove ou substitui caracteres inválidos em nomes de arquivo:
- Remove: `< > : " / \ | ? *`
- Limita o tamanho de parceiro e descrição para evitar nomes muito longos
- Mantém espaços e acentos quando possível
