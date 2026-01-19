// Configuration
const FOLDER_ID = 'YOUR_DRIVE_FOLDER_ID_HERE'; // Replace with your Google Drive folder ID

/**
 * Serves the HTML interface for the web app
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Lançamentos Financeiros')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Processes the form submission and saves the file to Drive
 * @param {Object} formData - Form data including image, date, partner, description, type, user
 * @return {Object} Result object with success status and message
 */
function processForm(formData) {
  try {
    // Get the folder
    const folder = DriveApp.getFolderById(FOLDER_ID);
    
    // Parse form data
    const date = new Date(formData.date);
    const partner = formData.partner;
    const description = formData.description;
    const type = formData.type;
    const userInitials = formData.user;
    const imageData = formData.image;
    
    // Generate filename with sequential logic
    const filename = generateFileName(folder, date, userInitials, partner, description);
    
    // Process image data (remove data URL prefix)
    const base64Data = imageData.split(',')[1];
    const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), 'image/jpeg', filename);
    
    // Save file to Drive
    const file = folder.createFile(blob);
    
    // Set file description with transaction details
    file.setDescription(`Tipo: ${type}\nParceiro: ${partner}\nDescrição: ${description}\nData: ${formatDate(date)}\nUsuário: ${userInitials}`);
    
    return {
      success: true,
      message: 'Lançamento salvo com sucesso!',
      filename: filename,
      fileId: file.getId()
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
 * Generates filename with sequential logic: AAMMDD[seq][Iniciais] - Parceiro - Desc.jpg
 * @param {Folder} folder - Drive folder
 * @param {Date} date - Transaction date
 * @param {string} initials - User initials
 * @param {string} partner - Partner name
 * @param {string} description - Transaction description
 * @return {string} Generated filename
 */
function generateFileName(folder, date, initials, partner, description) {
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
  
  // Sanitize partner and description (remove special characters)
  const sanitizedPartner = sanitizeFileName(partner);
  const sanitizedDesc = sanitizeFileName(description);
  
  // Build filename: AAMMDD[seq][Iniciais] - Parceiro - Desc.jpg
  const filename = `${datePrefix}${seqLetter}${initials} - ${sanitizedPartner} - ${sanitizedDesc}.jpg`;
  
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
