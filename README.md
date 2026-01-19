# 💰 Lançamentos Financeiros - Web App

App mobile para lançamento de movimentações financeiras com captura de fotos e armazenamento automatizado no Google Drive.

## 📋 Funcionalidades

- **Interface Mobile Responsiva**: Design otimizado para dispositivos móveis com tabs
- **Campos do Formulário**:
  - Data da movimentação
  - Parceiro (fornecedor/cliente)
  - Descrição detalhada
  - Tipo: Receita ou Gasto
  - Usuário (dropdown): Bruna Brauer (BB), Ivan Braga Ramos (BR), Ana Braga (AB)
  - Valor monetário
  - Foto (câmera ou galeria)
- **Nomenclatura Automática**: Arquivos salvos com padrão `AAMMDD[seq][Iniciais] [TIPO] DESCRIÇÃO - PARCEIRO - R$ VALOR.jpg`
- **Tipo no Nome**: [GTO] para Gastos e [REC] para Receitas
- **Texto em Maiúsculas**: Descrição e parceiro automaticamente convertidos para maiúsculas
- **Sequenciamento Inteligente**: Gera letras sequenciais (a, b, c...) para múltiplos lançamentos na mesma data
- **Armazenamento no Drive**: Salvamento automático em pasta configurável
- **Histórico**: Aba para visualizar todos os arquivos salvos no Drive

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

### 3. Configurar a pasta do Google Drive

1. Crie uma pasta no Google Drive onde os arquivos serão salvos
2. Abra a pasta e copie o ID da URL:
   - URL exemplo: `https://drive.google.com/drive/folders/1ABC...XYZ`
   - O ID é: `1ABC...XYZ`
3. No arquivo `Code.gs`, substitua `YOUR_DRIVE_FOLDER_ID_HERE` pelo ID copiado:
   ```javascript
   const FOLDER_ID = '1ABC...XYZ'; // Seu ID aqui
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
2. Adicione o site à tela inicial para acesso rápido:
   - **iOS**: Safari > Compartilhar > Adicionar à Tela de Início
   - **Android**: Chrome > Menu > Adicionar à tela inicial

## 📱 Como Usar

1. **Aba "Novo Lançamento"**:
   - Selecione a data (padrão: hoje)
   - Digite o nome do parceiro
   - Descreva a movimentação
   - Escolha o tipo (Receita ou Gasto)
   - Selecione o usuário no dropdown (BB, BR ou AB)
   - Informe o valor (ex: 1.226,61)
   - Toque na área de foto para tirar ou selecionar imagem
   - Clique em "Salvar Lançamento"

2. **Aba "Histórico"**:
   - Visualize todos os arquivos salvos
   - Clique em qualquer arquivo para abri-lo no Drive
   - Veja data e hora de criação

## 📂 Padrão de Nomenclatura

Os arquivos são salvos seguindo o padrão:

```
AAMMDD[seq][Iniciais] [TIPO] DESCRIÇÃO - PARCEIRO - R$ VALOR.jpg
```

**Exemplo**:
- Primeiro lançamento do dia 19/01/2026 por BB: `260119aBB [GTO] CONTA PAGA - KAUESTEEL - R$ 1.226,61.jpg`
- Segundo lançamento do mesmo dia por BR: `260119bBR [REC] PAGAMENTO CLIENTE - EMPRESA XYZ - R$ 5.500,00.jpg`
- Terceiro lançamento: `260119cAB [GTO] COMPRA MATERIAL - PAPELARIA - R$ 380,50.jpg`

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
- Design mobile-first
- Captura de foto via câmera
- Validação de formulário
- Feedback visual
- Animações e transições suaves

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
