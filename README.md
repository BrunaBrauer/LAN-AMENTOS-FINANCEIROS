# 💰 Lançamentos Financeiros - Web App

App mobile PWA para lançamento de movimentações financeiras com captura de fotos, conversão para PDF e armazenamento automatizado no Google Drive.

## 📋 Funcionalidades

### Interface e Experiência do Usuário
- **Interface Fullscreen/Standalone**: Design otimizado como app nativo, ocupando 100% da tela
- **PWA (Progressive Web App)**: Pode ser instalado na tela inicial do dispositivo
- **Material Design**: Interface moderna e flat com animações suaves
- **Header Fixo**: Barra superior fixa com título e badge de sincronização
- **Tabs Sticky**: Navegação entre "Novo Lançamento" e "Histórico"
- **Toast Notifications**: Notificações elegantes com feedback visual de sucesso/erro
- **Vibração**: Feedback háptico ao salvar com sucesso (quando suportado pelo dispositivo)
- **Progress Bar**: Indicador visual de progresso durante o upload

### Captura de Fotos
- **Captura Sequencial**: Tire múltiplas fotos em sequência diretamente da câmera
- **Botão de Câmera**: Botão dedicado para abrir a câmera do dispositivo
- **Botão de Galeria**: Selecione múltiplas fotos da galeria de uma vez
- **Preview de Fotos**: Visualize todas as fotos capturadas antes de enviar
- **Remoção Individual**: Remova fotos específicas antes do envio
- **Confirmação**: Após cada foto, opção de tirar mais fotos

### Conversão e Armazenamento
- **Conversão Automática para PDF**: Todas as fotos são convertidas em um único arquivo PDF multi-página
- **jsPDF**: Biblioteca integrada para geração de PDF no frontend
- **Otimização de Imagens**: Imagens são dimensionadas para caber nas páginas A4
- **Arquivo Único**: Um único PDF com todas as fotos ao invés de múltiplos arquivos JPG
- **Nomenclatura Automática**: PDF salvo com padrão `AAMMDD[seq][Iniciais] [TIPO] CONTA [STATUS] TULA [ACCOUNT] - DESCRIÇÃO - PARCEIRO - R$ VALOR.pdf`

### Histórico e Sincronização
- **localStorage**: Histórico persistente offline no dispositivo
- **Sincronização Automática**: Sincroniza com a planilha do Google Sheets quando online
- **Indicadores Visuais**: Distingue itens sincronizados de pendentes
- **Badge de Contador**: Badge no header mostrando quantidade de itens não sincronizados
- **Merge de Dados**: Combina histórico local e remoto na visualização

### Campos do Formulário
- Data da movimentação
- Parceiro (fornecedor/cliente)
- Descrição detalhada
- Tipo: Receita ou Gasto
- Status: PAGA ou À PAGAR/RECEBER
- Conta Financeira: CX, BB ou CE
- Usuário (dropdown): Bruna Brauer (BB), Ivan Braga Ramos (BR), Adriana Tardin Brauer Braga (AB)
- Valor monetário (com formatação automática de milhares)

### Nomenclatura Inteligente
- **Tipo no Nome**: [GTO] para Gastos e [REC] para Receitas
- **Status Dinâmico**: Mostra PAGA, PAGAR (gastos) ou RECEBER (receitas)
- **Texto em Maiúsculas**: Descrição e parceiro automaticamente convertidos para maiúsculas
- **Formatação de Valor**: Separador de milhares automático (ex: R$ 1.000,00)
- **Sequenciamento Inteligente**: Gera letras sequenciais (a, b, c...) para múltiplos lançamentos na mesma data

## 🚀 Como Implantar

### 1. Criar um novo projeto no Google Apps Script

1. Acesse [script.google.com](https://script.google.com)
2. Clique em "Novo projeto"
3. Nomeie o projeto como "Lançamentos Financeiros"

### 2. Adicionar os arquivos

1. **Renomeie o arquivo Code.gs padrão**:
   - Cole o conteúdo do arquivo `Code.gs` deste repositório

2. **Adicione o arquivo HTML**:
   - Clique em `+` ao lado de "Arquivos"
   - Selecione "HTML"
   - Nomeie como "Index"
   - Cole o conteúdo do arquivo `Index.html` deste repositório

### 3. Configurar Google Drive e Planilha

1. **Criar pasta no Google Drive** onde os PDFs serão salvos
2. Abra a pasta e copie o ID da URL:
   - URL exemplo: `https://drive.google.com/drive/folders/1ABC...XYZ`
   - O ID é: `1ABC...XYZ`

3. **Criar uma planilha do Google Sheets** para o histórico
4. Abra a planilha e copie o ID da URL:
   - URL exemplo: `https://docs.google.com/spreadsheets/d/1XYZ...ABC/edit`
   - O ID é: `1XYZ...ABC`

5. No arquivo `Code.gs`, substitua os IDs:
   ```javascript
   const FOLDER_ID = '1ABC...XYZ'; // ID da pasta Drive
   const SPREADSHEET_ID = '1XYZ...ABC'; // ID da planilha
   ```

### 4. Implantar como Web App

1. Clique em "Implantar" > "Nova implantação"
2. Clique no ícone de engrenagem ⚙️ e selecione "Web app"
3. Configure:
   - **Descrição**: Lançamentos Financeiros v1
   - **Executar como**: Eu (seu e-mail)
   - **Quem tem acesso**: Qualquer pessoa (ou conforme sua necessidade)
4. Clique em "Implantar"
5. Autorize o aplicativo quando solicitado
6. Copie o URL do Web App gerado

### 5. Usar o aplicativo

1. Acesse o URL do Web App em seu dispositivo móvel
2. **Instalar como PWA** (Recomendado):
   - **iOS**: Safari > Compartilhar > Adicionar à Tela de Início
   - **Android**: Chrome > Menu > Adicionar à tela inicial
   - O app aparecerá como um aplicativo nativo, sem bordas do navegador

## 📱 Como Usar

### Aba "Novo Lançamento"

1. **Preencha os dados**:
   - Selecione a data (padrão: hoje)
   - Digite o nome do parceiro
   - Descreva a movimentação
   - Escolha o tipo (Receita ou Gasto)
   - Selecione o status (PAGA ou À PAGAR/RECEBER)
   - Escolha a conta financeira (CX, BB ou CE)
   - Selecione o usuário no dropdown (BB, BR ou AB)
   - Informe o valor (será formatado automaticamente: ex: 1.000,00)

2. **Adicione fotos**:
   - **Câmera**: Clique no botão "📷 Tirar Foto"
     - Tire a primeira foto
     - Confirme se quer tirar mais fotos
     - Repita até ter todas as fotos necessárias
   - **Galeria**: Clique no botão "🖼️ Galeria"
     - Selecione múltiplas fotos de uma vez
   - Visualize todas as fotos no preview
   - Remova fotos individuais clicando no × se necessário

3. **Salvar**:
   - Clique em "Salvar Lançamento"
   - Acompanhe o progresso na barra de loading
   - Aguarde a notificação toast de sucesso
   - O dispositivo irá vibrar (se suportado)
   - O item é salvo localmente e sincronizado automaticamente

### Aba "Histórico"

- Visualize todos os lançamentos salvos
- Itens sincronizados aparecem com badge "✓ Sincronizado"
- Itens pendentes aparecem com badge "⏳ Pendente" em fundo amarelo
- Badge no header mostra quantos itens aguardam sincronização
- Clique em qualquer arquivo para abri-lo no Drive

## 📂 Padrão de Nomenclatura

Os arquivos PDF são salvos seguindo o padrão:

```
AAMMDD[seq][Iniciais] [TIPO] CONTA [STATUS] TULA [ACCOUNT] - DESCRIÇÃO - PARCEIRO - R$ VALOR.pdf
```

Onde:
- **AAMMDD**: Ano, mês e dia (2 dígitos cada)
- **[seq]**: Letra sequencial (a, b, c, ...)
- **[Iniciais]**: BB, BR ou AB
- **[TIPO]**: [GTO] para Gasto ou [REC] para Receita
- **[STATUS]**: PAGA, PAGAR ou RECEBER (depende do tipo e status)
- **[ACCOUNT]**: CX, BB ou CE

**Exemplos**:
- Primeiro lançamento do dia 19/01/2026 por BB, gasto pago: `260119aBB [GTO] CONTA PAGA TULA CX - COMPRA MATERIAL - FORNECEDOR ABC - R$ 1.226,61.pdf`
- Segundo lançamento do mesmo dia por BR, receita a receber: `260119bBR [REC] CONTA RECEBER TULA BB - PAGAMENTO CLIENTE - EMPRESA XYZ - R$ 5.500,00.pdf`
- Terceiro lançamento, gasto a pagar: `260119cAB [GTO] CONTA PAGAR TULA CE - CONTA LUZ - CEMIG - R$ 380,50.pdf`

### Lógica de Sequenciamento

O sistema:
1. Lê todos os arquivos na pasta do Drive
2. Conta quantos começam com o prefixo da data (AAMMDD)
3. Gera a letra sequencial: 0='a', 1='b', 2='c', etc.
4. Garante que não haverá conflitos de nomes

## 🛠️ Estrutura dos Arquivos

### Code.gs
Backend do Google Apps Script contendo:
- `doGet()`: Serve a interface HTML
- `processForm()`: Processa e salva os dados
- `generateFileName()`: Gera o nome do arquivo com lógica sequencial
- `sanitizeFileName()`: Limpa caracteres inválidos
- Funções auxiliares para formatação

### Index.html
Interface HTML responsiva com:
- Design fullscreen/standalone para parecer app nativo
- PWA com meta tags e manifest.json
- jsPDF integrado via CDN para conversão de imagens em PDF
- Captura sequencial de fotos via câmera
- Preview e gerenciamento de múltiplas fotos
- localStorage para persistência offline
- Toast notifications com animações Material Design
- Progress bar durante upload
- Validação de formulário
- Feedback visual e háptico

## ✨ Novidades da Versão Atual

### Interface PWA Fullscreen
- App ocupa 100% da tela, sem bordas ou container centralizado
- Header fixo no topo com título e badge de sincronização
- Tabs fixas para navegação fluida
- Design Material Design moderno e flat
- Pode ser instalado na tela inicial como app nativo

### Captura Sequencial de Fotos
- Botão dedicado "📷 Tirar Foto" para câmera
- Botão "🖼️ Galeria" para seleção múltipla
- Após cada foto da câmera, pergunta se quer tirar mais
- Preview de todas as fotos antes do envio
- Remoção individual de fotos

### Conversão Automática para PDF
- Todas as fotos são convertidas em um único PDF multi-página
- Usa jsPDF para geração no frontend
- Imagens otimizadas para caber em páginas A4
- Um único arquivo PDF ao invés de múltiplos JPGs

### Histórico Offline com localStorage
- Cada lançamento é salvo localmente primeiro
- Sincronização automática com Google Sheets quando online
- Badge mostra quantidade de itens não sincronizados
- Histórico permanece disponível mesmo offline
- Indicadores visuais de status de sincronização

### Feedback Visual Aprimorado
- Toast notifications elegantes ao salvar
- Animação de checkmark no sucesso
- Progress bar durante o upload
- Vibração do dispositivo ao salvar (quando suportado)
- Animações suaves em toda a interface

## 🔒 Segurança

- Os dados são armazenados no seu Google Drive
- Apenas usuários autorizados podem acessar (configure nas permissões)
- Imagens e informações ficam privadas na sua conta
- Sem servidor externo - tudo dentro do ecossistema Google

## 🔄 Atualizações

Para atualizar o aplicativo:
1. Faça as alterações no código
2. Vá em "Implantar" > "Gerenciar implantações"
3. Clique no ícone de edição ✏️
4. Selecione "Nova versão"
5. Clique em "Implantar"

## 📞 Suporte

Para problemas ou dúvidas:
- Verifique se o FOLDER_ID está correto
- Confirme as permissões de acesso ao Drive
- Use a função `testFolderAccess()` no Apps Script para testar

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente.
