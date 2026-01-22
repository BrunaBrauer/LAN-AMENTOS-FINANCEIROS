# 💰 Lançamentos Financeiros - PWA

Progressive Web App para registro de lançamentos financeiros com captura de fotos e sincronização com Google Apps Script.

## 📋 Características

- ✅ **PWA Real**: Funciona standalone sem barra de endereço
- 📱 **Instalável**: Pode ser instalado na tela inicial do celular
- 🔄 **Offline First**: Funciona sem internet e sincroniza quando voltar online
- 📸 **Captura de Fotos**: Captura e converte fotos em PDF
- ☁️ **Sincronização**: Sincroniza automaticamente com Google Drive e Sheets
- 🎨 **Design Moderno**: Interface responsiva e intuitiva

## 🚀 Como Configurar

### 1. Configurar o Backend (Google Apps Script)

1. Acesse [Google Apps Script](https://script.google.com/)
2. Crie um novo projeto
3. Cole o código do arquivo `Code.gs` no editor
4. Configure as IDs no início do arquivo:
   ```javascript
   const FOLDER_ID = 'SUA_PASTA_DO_DRIVE_ID';
   const SPREADSHEET_ID = 'SUA_PLANILHA_ID';
   ```

#### Como obter as IDs:

**Folder ID (Google Drive):**
- Abra a pasta no Google Drive
- Copie o ID da URL: `https://drive.google.com/drive/folders/[FOLDER_ID]`

**Spreadsheet ID (Google Sheets):**
- Abra a planilha no Google Sheets
- Copie o ID da URL: `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`

5. Faça o deploy:
   - Clique em **Implantar** > **Nova implantação**
   - Escolha tipo: **Aplicativo da Web**
   - Configurações:
     - Executar como: **Eu (sua conta)**
     - Quem tem acesso: **Qualquer pessoa** (para funcionar como API)
   - Clique em **Implantar**
   - **Copie a URL do aplicativo da web** (você vai precisar dela!)

### 2. Configurar o Frontend (GitHub Pages)

#### Opção A: Usando GitHub Pages (Recomendado)

1. Faça push do código para o repositório GitHub
2. Vá em **Settings** > **Pages**
3. Ative o GitHub Pages selecionando a branch `main` ou `master`
4. Aguarde alguns minutos até o site estar disponível
5. Acesse o URL: `https://[seu-usuario].github.io/app-da-bruna/`

**Nota sobre paths:**
- Se o nome do seu repositório for diferente de `app-da-bruna`, você precisa atualizar o `BASE_PATH` no arquivo `sw.js`:
  ```javascript
  const BASE_PATH = '/seu-repositorio-nome/';
  ```
- Os paths relativos em `manifest.json` já estão configurados corretamente

#### Opção B: Hospedagem Local (Para Testes)

```bash
# Instale um servidor HTTP simples
npm install -g http-server

# Execute na pasta do projeto
http-server -p 8080

# Acesse: http://localhost:8080
```

### 3. Conectar Frontend com Backend

1. Abra o arquivo `Index.html` no editor
2. Localize a linha com `API_URL`:
   ```javascript
   const API_URL = 'COLE_AQUI_A_URL_DO_SEU_APPS_SCRIPT';
   ```
3. Cole a URL que você copiou no passo 1.5:
   ```javascript
   const API_URL = 'https://script.google.com/macros/s/[SEU_ID]/exec';
   ```
4. Salve o arquivo e faça commit/push

### 4. Instalar o PWA no Celular

#### Android (Chrome):
1. Abra o app no navegador Chrome
2. Toque no menu (⋮) > "Adicionar à tela inicial"
3. O app será instalado como um aplicativo nativo

#### iOS (Safari):
1. Abra o app no navegador Safari
2. Toque no botão Compartilhar (⬆️)
3. Role para baixo e toque em "Adicionar à Tela Inicial"
4. O app será instalado como um aplicativo nativo

## 📱 Funcionalidades

### Novo Lançamento
- Capture fotos usando a câmera ou escolha da galeria
- Preencha os dados do lançamento:
  - Data
  - Parceiro/Fornecedor
  - Descrição
  - Tipo (Receita ou Gasto)
  - Status (Paga ou A Pagar/Receber)
  - Conta (BB, CE, CX)
  - Usuário (iniciais)
  - Valor

### Histórico
- Visualize todos os lançamentos salvos
- Sincronização automática com Google Drive
- Funcionamento offline com dados locais

### Funcionamento Offline
- Todos os lançamentos são salvos localmente primeiro
- Sincroniza automaticamente quando a conexão voltar
- Banner de status offline/online

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **PWA**: Service Worker, Web App Manifest
- **Backend**: Google Apps Script
- **Storage**: LocalStorage + Google Drive
- **PDF**: jsPDF
- **Hosting**: GitHub Pages

## 📁 Estrutura de Arquivos

```
app-da-bruna/
├── Index.html          # Interface principal do app
├── Code.gs             # Backend Google Apps Script
├── manifest.json       # Configuração PWA
├── sw.js              # Service Worker (cache offline)
├── icons/             # Ícones do PWA
│   ├── icon-192.png
│   └── icon-512.png
├── README.md          # Este arquivo
└── appsscript.json    # Configuração do Apps Script
```

## 🔧 Desenvolvimento

### Modificar o Frontend

1. Edite `Index.html` conforme necessário
2. Teste localmente usando um servidor HTTP
3. Faça commit e push para GitHub
4. GitHub Pages atualiza automaticamente

### Modificar o Backend

1. Edite o código no Google Apps Script editor
2. Salve (Ctrl+S)
3. Faça uma nova implantação (ou use a mesma URL)
4. As mudanças são aplicadas imediatamente

### Atualizar a Cache do Service Worker

Se fizer mudanças significativas, atualize a versão da cache em `sw.js`:

```javascript
const CACHE_NAME = 'lancamentos-v2'; // Incremente a versão
```

## ⚠️ Troubleshooting

### Erros no console do navegador

Se você ver erros como "Cannot use 'in' operator" ou "Document body not available yet" no console:
- Esses erros geralmente vêm de **extensões do navegador** (como Live Server, ad blockers, etc.)
- Eles **NÃO** afetam o funcionamento do app
- Para um ambiente de teste limpo, desative temporariamente as extensões do navegador
- Ou teste em modo anônimo/privado do navegador

### Página em branco / App não carrega

Se a página aparecer em branco:

1. **Limpe a cache do Service Worker:**
   - Abra DevTools (F12)
   - Vá em Application > Service Workers
   - Clique em "Unregister" em todos os Service Workers
   - Recarregue a página com Ctrl+Shift+R (ou Cmd+Shift+R no Mac)

2. **Limpe a cache do navegador:**
   - Chrome: Ctrl+Shift+Delete > Limpar cache
   - Ou acesse em modo anônimo para testar sem cache

3. **Verifique o console:**
   - Abra DevTools (F12) > Console
   - Procure por mensagens `[Init]` que mostram o processo de inicialização
   - Se ver "Failed to find required DOM elements", pode ser um problema de carregamento

4. **Force um hard reload:**
   - Segure Shift e clique em Recarregar
   - Ou pressione Ctrl+Shift+R (Cmd+Shift+R no Mac)

### App não sincroniza com Google Drive

1. Verifique se a URL do API_URL está correta no Index.html
2. Verifique se as IDs do FOLDER_ID e SPREADSHEET_ID estão corretas no Code.gs
3. Certifique-se de que a implantação do Apps Script está configurada como "Qualquer pessoa"

### Ícones não aparecem

1. Verifique se os arquivos estão em `icons/icon-192.png` e `icons/icon-512.png`
2. Se estiver usando GitHub Pages, verifique se os arquivos foram commitados
3. Limpe a cache do navegador e reinstale o PWA

### Service Worker não registra

1. PWA só funciona em HTTPS (exceto localhost)
2. Verifique o console do navegador para erros
3. Certifique-se de que o `sw.js` está na raiz do site

### Offline não funciona

1. Verifique se o Service Worker está registrado (DevTools > Application > Service Workers)
2. Limpe a cache e recarregue o app
3. Verifique se há erros no console

## 📝 Notas Importantes

- O app precisa ser acessado via HTTPS para funcionar como PWA (GitHub Pages já fornece HTTPS)
- Os dados locais são salvos no LocalStorage do navegador
- Se limpar os dados do navegador, os lançamentos não sincronizados serão perdidos
- As fotos são convertidas em PDF antes do upload para economizar espaço

## 📄 Licença

Este projeto é de código aberto e está disponível para uso pessoal e comercial.

## 👤 Autor

Desenvolvido para Bruna

## 🤝 Contribuindo

Sinta-se à vontade para abrir issues e pull requests para melhorias!
