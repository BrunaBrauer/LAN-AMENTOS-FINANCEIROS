# Exemplos de Nomenclatura de Arquivos

Este documento demonstra como funciona a lógica de nomenclatura dos arquivos.

## Formato

```
AAMMDD[seq][Iniciais] [TIPO] DESCRIÇÃO - PARCEIRO - R$ VALOR.jpg
```

Onde:
- **AA**: Ano (2 dígitos) - ex: 26 para 2026
- **MM**: Mês (2 dígitos) - ex: 01 para Janeiro
- **DD**: Dia (2 dígitos) - ex: 19
- **[seq]**: Letra sequencial (a, b, c, d...) baseada no número de arquivos com a mesma data
- **[Iniciais]**: Iniciais do usuário - BB (Bruna Brauer), BR (Ivan Braga Ramos), AB (Ana Braga)
- **[TIPO]**: [GTO] para Gasto ou [REC] para Receita
- **DESCRIÇÃO**: Descrição da movimentação (em MAIÚSCULAS)
- **PARCEIRO**: Nome do fornecedor/cliente (em MAIÚSCULAS)
- **VALOR**: Valor monetário no formato brasileiro

## Exemplos Práticos

### Cenário 1: Primeiro lançamento do dia - Gasto
**Data**: 19/01/2026  
**Usuário**: BB (Bruna Brauer)  
**Tipo**: Gasto  
**Descrição**: Conta paga Tula BB  
**Parceiro**: Kauesteel  
**Valor**: 1.226,61  

**Resultado**: `260119aBB [GTO] CONTA PAGA TULA BB - KAUESTEEL - R$ 1.226,61.jpg`

### Cenário 2: Segundo lançamento do mesmo dia - Receita
**Data**: 19/01/2026  
**Usuário**: BR (Ivan Braga Ramos)  
**Tipo**: Receita  
**Descrição**: Pagamento cliente  
**Parceiro**: Empresa XYZ  
**Valor**: 5.500,00  

**Resultado**: `260119bBR [REC] PAGAMENTO CLIENTE - EMPRESA XYZ - R$ 5.500,00.jpg`

### Cenário 3: Terceiro lançamento, usuário diferente
**Data**: 19/01/2026  
**Usuário**: AB (Ana Braga)  
**Tipo**: Gasto  
**Descrição**: Compra material escritório  
**Parceiro**: Papelaria Central  
**Valor**: 380,50  

**Resultado**: `260119cAB [GTO] COMPRA MATERIAL ESCRITORIO - PAPELARIA CENTRAL - R$ 380,50.jpg`

### Cenário 4: Lançamentos em dias diferentes
**Data**: 20/01/2026  
**Usuário**: BB (Bruna Brauer)  
**Tipo**: Receita  
**Descrição**: Venda serviço  
**Parceiro**: Cliente VIP  
**Valor**: 2.800,00  

**Resultado**: `260120aBB [REC] VENDA SERVICO - CLIENTE VIP - R$ 2.800,00.jpg`  
(Note que volta para 'a' porque é um dia diferente)

## Lógica de Sequenciamento

O sistema:

1. **Lê a pasta do Drive** antes de salvar cada arquivo
2. **Conta arquivos** que começam com o prefixo da data (AAMMDD)
3. **Calcula a letra**:
   - 0 arquivos encontrados → letra 'a' (primeiro do dia)
   - 1 arquivo encontrado → letra 'b' (segundo do dia)
   - 2 arquivos encontrados → letra 'c' (terceiro do dia)
   - ...
   - 25 arquivos encontrados → letra 'z' (26º do dia)
   - 26 arquivos encontrados → letras 'aa' (27º do dia)
   - 27 arquivos encontrados → letras 'ab' (28º do dia)
   - E assim por diante...

## Vantagens

- ✅ **Ordenação cronológica**: Arquivos automaticamente ordenados por data
- ✅ **Sem conflitos**: Nunca haverá dois arquivos com o mesmo nome
- ✅ **Rastreabilidade**: Fácil identificar quem e quando lançou
- ✅ **Busca facilitada**: Procure por data, usuário ou parceiro
- ✅ **Sequência clara**: Veja quantos lançamentos houve em cada dia

## Limitações

- Suporta praticamente ilimitados lançamentos por dia
- Sequência: a-z (26), depois aa-az (26), ba-bz (26), etc.
- Sistema escalável para alto volume de transações

## Caracteres Especiais

O sistema automaticamente remove ou substitui caracteres inválidos em nomes de arquivo:
- Remove: `< > : " / \ | ? *`
- Limita o tamanho de parceiro e descrição para evitar nomes muito longos
- Mantém espaços e acentos quando possível
