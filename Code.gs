// Configuration
const FOLDER_ID = 'YOUR_DRIVE_FOLDER_ID_HERE'; // Replace with your Google Drive folder ID
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your Google Spreadsheet ID

/**
 * Serves the HTML interface for the web app
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Lançamentos Financeiros')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Processes the form submission and saves the PDF file to Drive
 * @param {Object} formData - Form data including pdfData, date, partner, description, type, user, value, status, account
 * @return {Object} Result object with success status and message
 */
function processForm(formData) {
  try {
    // Get the folder
    const folder = DriveApp.getFolderById(FOLDER_ID);
    
    // Parse form data - fix date parsing to avoid timezone issues
    const dateParts = formData.date.split('-'); // YYYY-MM-DD
    const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    const partner = formData.partner;
    const description = formData.description;
    const type = formData.type;
    const status = formData.status;
    const account = formData.account;
    const userInitials = formData.user;
    const value = formData.value;
    const pdfData = formData.pdfData; // Single PDF file
    
    // Generate filename (always PDF now)
    const filename = generateFileName(folder, date, userInitials, partner, description, type, value, status, account);
    
    // Process PDF data (remove data URL prefix)
    const base64Data = pdfData.split(',')[1];
    const mimeType = 'application/pdf';
    const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), mimeType, filename);
    
    // Save file to Drive
    const file = folder.createFile(blob);
    
    // Set file description with transaction details
    file.setDescription(`Tipo: ${type}\nStatus: ${status}\nConta: ${account}\nParceiro: ${partner}\nDescrição: ${description}\nData: ${formatDate(date)}\nUsuário: ${userInitials}\nValor: R$ ${value}`);
    
    // Save to spreadsheet
    saveToSpreadsheet(date, partner, description, type, userInitials, value, filename, file.getUrl());
    
    return {
      success: true,
      message: `Lançamento salvo com sucesso!`,
      filename: filename,
      fileId: file.getUrl()
    };
  } catch (error) {
    Logger.log('Error in processForm: ' + error.toString());
    return {
      success: false,
      message: 'Erro ao salvar: ' + error.toString()
    };
  }
}

/**
 * Generates filename with sequential logic: AAMMDD[seq][Iniciais] [TYPE] CONTA [STATUS] TULA [ACCOUNT] - DESCRIPTION - PARTNER - R$ VALUE.pdf
 * @param {Folder} folder - Drive folder
 * @param {Date} date - Transaction date
 * @param {string} initials - User initials
 * @param {string} partner - Partner name
 * @param {string} description - Transaction description
 * @param {string} type - Transaction type (Receita or Gasto)
 * @param {string} value - Transaction value
 * @param {string} status - Payment status (PAGA or A_PAGAR_RECEBER)
 * @param {string} account - Financial account (BB, CE, CX)
 * @return {string} Generated filename
 */
function generateFileName(folder, date, initials, partner, description, type, value, status, account) {
  // Format date as AAMMDD (year month day in 2 digits each)
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const datePrefix = year + month + day;
  
  // Count existing files with the same date prefix
  const files = folder.getFiles();
  let count = 0;
  
  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();
    
    // Check if file starts with the date prefix
    if (fileName.startsWith(datePrefix)) {
      count++;
    }
  }
  
  // Generate sequential letter (0='a', 1='b', 2='c', ..., 26='aa', 27='ab', etc.)
  let seqLetter = '';
  if (count < 26) {
    // Single letter a-z
    seqLetter = String.fromCharCode(97 + count);
  } else {
    // Multiple letters for counts >= 26: aa, ab, ac, etc.
    const firstLetter = String.fromCharCode(97 + Math.floor(count / 26) - 1);
    const secondLetter = String.fromCharCode(97 + (count % 26));
    seqLetter = firstLetter + secondLetter;
  }
  
  // Type prefix: [GTO] for Gasto, [REC] for Receita
  const typePrefix = type === 'Gasto' ? '[GTO]' : '[REC]';
  
  // Status text: determines PAGA/PAGAR/RECEBER
  let statusText;
  if (status === 'PAGA') {
    statusText = 'PAGA';
  } else {
    // A_PAGAR_RECEBER
    if (type === 'Gasto') {
      statusText = 'PAGAR';
    } else {
      statusText = 'RECEBER';
    }
  }
  
  // Sanitize and uppercase partner and description
  const sanitizedPartner = sanitizeFileName(partner).toUpperCase();
  const sanitizedDesc = sanitizeFileName(description).toUpperCase();
  
  // Format value with thousands separator (1.000,00)
  const formattedValue = formatCurrency(value);
  
  // Build filename: AAMMDD[seq][Iniciais] [TYPE] CONTA [STATUS] TULA [ACCOUNT] - DESCRIPTION - PARTNER - R$ VALUE.pdf
  let filename = `${datePrefix}${seqLetter}${initials} ${typePrefix} CONTA ${statusText} TULA ${account} - ${sanitizedDesc} - ${sanitizedPartner}`;
  if (formattedValue) {
    filename += ` - ${formattedValue}`;
  }
  filename += '.pdf'; // Always PDF now
  
  return filename;
}

/**
 * Sanitizes a string for use in filename
 * @param {string} str - String to sanitize
 * @return {string} Sanitized string
 */
function sanitizeFileName(str) {
  // Remove or replace special characters that are invalid in filenames
  return str
    .replace(/[<>:"/\\|?*]/g, '') // Remove invalid characters
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()
    .substring(0, 50); // Limit length
}

/**
 * Formats date as DD/MM/YYYY
 * @param {Date} date - Date to format
 * @return {string} Formatted date string
 */
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Formats currency with thousands separator
 * @param {string} value - Value to format (e.g., "1226,61")
 * @return {string} Formatted currency (e.g., "R$ 1.226,61")
 */
function formatCurrency(value) {
  if (!value) return '';
  
  // Remove any existing formatting
  let cleanValue = value.replace(/[^\d,]/g, '');
  
  // Split integer and decimal parts
  const parts = cleanValue.split(',');
  let integerPart = parts[0];
  const decimalPart = parts[1] || '';
  
  // Add thousands separator
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  // Combine with decimal part
  const formatted = decimalPart ? `${integerPart},${decimalPart}` : integerPart;
  
  return `R$ ${formatted}`;
}

/**
 * Saves transaction data to spreadsheet
 * @param {Date} date - Transaction date
 * @param {string} partner - Partner name
 * @param {string} description - Description
 * @param {string} type - Type (Receita/Gasto)
 * @param {string} user - User initials
 * @param {string} value - Value
 * @param {string} filename - File name
 * @param {string} fileUrl - File URL
 */
function saveToSpreadsheet(date, partner, description, type, user, value, filename, fileUrl) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // If this is the first entry, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Data', 'Parceiro', 'Descrição', 'Tipo', 'Usuário', 'Valor', 'Arquivo', 'Link']);
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
    }
    
    // Add the transaction data
    sheet.appendRow([
      formatDate(date),
      partner,
      description,
      type,
      user,
      formatCurrency(value),
      filename,
      fileUrl
    ]);
  } catch (error) {
    Logger.log('Error saving to spreadsheet: ' + error.toString());
    // Don't throw error - file is already saved to Drive
  }
}

/**
 * Gets list of transactions from spreadsheet for history display
 * @param {number} limit - Maximum number of records to return
 * @return {Object} Result with transaction list
 */
function getFileHistory(limit = 50) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    const lastRow = sheet.getLastRow();
    
    if (lastRow <= 1) {
      return {
        success: true,
        files: []
      };
    }
    
    // Get data (skip header row)
    const startRow = Math.max(2, lastRow - limit + 1);
    const numRows = lastRow - startRow + 1;
    const data = sheet.getRange(startRow, 1, numRows, 8).getValues();
    
    // Convert to objects and reverse (newest first)
    const fileList = data.reverse().map(row => ({
      date: row[0],
      partner: row[1],
      description: row[2],
      type: row[3],
      user: row[4],
      value: row[5],
      name: row[6],
      url: row[7]
    }));
    
    return {
      success: true,
      files: fileList
    };
  } catch (error) {
    Logger.log('Error in getFileHistory: ' + error.toString());
    return {
      success: false,
      message: 'Erro ao carregar histórico: ' + error.toString()
    };
  }
}

/**
 * Test function to verify folder access
 * @return {Object} Test result
 */
function testFolderAccess() {
  try {
    const folder = DriveApp.getFolderById(FOLDER_ID);
    return {
      success: true,
      folderName: folder.getName(),
      message: 'Folder access OK'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error accessing folder: ' + error.toString()
    };
  }
}
