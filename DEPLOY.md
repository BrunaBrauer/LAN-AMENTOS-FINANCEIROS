# 🚀 Guia Rápido de Implantação

## Passo a Passo Simplificado

### 1️⃣ Preparação (5 minutos)

1. **Criar pasta no Google Drive**:
   - Acesse [drive.google.com](https://drive.google.com)
   - Crie uma nova pasta: "Lançamentos Financeiros"
   - Copie o ID da pasta (está na URL da pasta)

2. **Criar projeto no Apps Script**:
   - Acesse [script.google.com](https://script.google.com)
   - Clique em "Novo projeto"

### 2️⃣ Configuração (10 minutos)

1. **Adicionar código backend** (Code.gs):
   ```
   - Copie todo o conteúdo do arquivo Code.gs
   - Cole no editor, substituindo o código padrão
   - Na linha 2, substitua YOUR_DRIVE_FOLDER_ID_HERE pelo ID da sua pasta
   ```

2. **Adicionar interface HTML** (Index.html):
   ```
   - Clique no + ao lado de "Arquivos"
   - Selecione "HTML"
   - Nomeie como "Index" (sem extensão)
   - Cole o conteúdo do arquivo Index.html
   ```

3. **Adicionar configuração** (appsscript.json):
   ```
   - Clique em "Configurações do projeto" (ícone de engrenagem)
   - Marque "Mostrar arquivo de manifesto 'appsscript.json'"
   - Volte ao editor
   - Cole o conteúdo do arquivo appsscript.json
   ```

### 3️⃣ Implantação (5 minutos)

1. **Implantar como Web App**:
   ```
   - Clique em "Implantar" > "Nova implantação"
   - Clique no ícone ⚙️ > Selecione "Web app"
   - Configurações:
     * Executar como: Eu
     * Acesso: Qualquer pessoa (ou conforme necessário)
   - Clique em "Implantar"
   ```

2. **Autorizar permissões**:
   ```
   - Clique em "Autorizar acesso"
   - Escolha sua conta Google
   - Clique em "Avançado" > "Ir para..."
   - Clique em "Permitir"
   ```

3. **Copiar URL**:
   ```
   - Copie o URL do Web App gerado
   - Este é o link para acessar o aplicativo
   ```

### 4️⃣ Uso no Mobile (2 minutos)

1. **Abrir no celular**:
   - Cole o URL no navegador do celular
   - Teste o aplicativo

2. **Adicionar à tela inicial** (opcional mas recomendado):
   
   **iPhone/iPad**:
   ```
   - Abra no Safari
   - Toque no ícone de compartilhar (quadrado com seta)
   - Role para baixo e toque em "Adicionar à Tela de Início"
   - Nomeie como "Lançamentos" e toque em "Adicionar"
   ```
   
   **Android**:
   ```
   - Abra no Chrome
   - Toque no menu (três pontos)
   - Toque em "Adicionar à tela inicial"
   - Confirme
   ```

## ✅ Teste Rápido

Após implantar, faça um teste:

1. Abra o app
2. Preencha todos os campos
3. Tire uma foto
4. Clique em "Salvar Lançamento"
5. Verifique se o arquivo apareceu na pasta do Drive

## 🔧 Solução de Problemas

### Erro: "Script function not found: doGet"
**Solução**: Certifique-se de que o arquivo Code.gs foi salvo corretamente

### Erro: "Unauthorized"
**Solução**: Refaça a autorização em "Implantar" > "Gerenciar implantações"

### Erro: "Cannot read folder"
**Solução**: Verifique se o FOLDER_ID está correto no Code.gs

### A foto não aparece
**Solução**: Certifique-se de permitir acesso à câmera no navegador

### Arquivo não salva no Drive
**Solução**: 
1. Execute a função `testFolderAccess()` no Apps Script
2. Verifique se você tem permissão de escrita na pasta
3. Confirme que o ID da pasta está correto

## 📋 Checklist de Implantação

- [ ] Pasta criada no Google Drive
- [ ] ID da pasta copiado
- [ ] Projeto criado no Apps Script
- [ ] Code.gs adicionado e configurado com FOLDER_ID
- [ ] Index.html adicionado
- [ ] appsscript.json configurado
- [ ] Web app implantado
- [ ] Permissões autorizadas
- [ ] URL copiado
- [ ] Teste realizado com sucesso
- [ ] App adicionado à tela inicial do celular

## 🎯 Próximos Passos

Após implantação bem-sucedida:

1. Compartilhe o URL com sua equipe
2. Configure permissões adequadas de acesso
3. Crie backups periódicos da pasta do Drive
4. Monitore o uso e espaço no Drive

## 💡 Dicas

- **Performance**: Para muitos arquivos, considere organizar por mês em subpastas
- **Segurança**: Configure "Apenas pessoas específicas" se quiser restringir acesso
- **Backup**: Ative o backup automático do Google Drive
- **Organização**: Use as descrições dos arquivos para filtros avançados

## 📞 Contato

Se precisar de ajuda adicional:
1. Revise este guia cuidadosamente
2. Verifique os logs de erro no Apps Script (View > Logs)
3. Teste a função `testFolderAccess()` para diagnosticar problemas de acesso
