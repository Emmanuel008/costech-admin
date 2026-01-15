/**
 * Strips HTML tags from a string for preview purposes
 * @param {string} html - HTML string
 * @param {number} maxLength - Maximum length for preview
 * @returns {string} - Plain text preview
 */
export function stripHtmlTags(html) {
  if (!html) return '';
  
  // Create a temporary div element
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  
  // Get text content and trim
  return tmp.textContent || tmp.innerText || '';
}

/**
 * Truncates text to a maximum length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text with ellipsis if needed
 */
export function truncateText(text, maxLength = 100) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Gets a plain text preview from HTML
 * @param {string} html - HTML string
 * @param {number} maxLength - Maximum length for preview
 * @returns {string} - Plain text preview
 */
export function getHtmlPreview(html, maxLength = 100) {
  const plainText = stripHtmlTags(html);
  return truncateText(plainText, maxLength);
}

/**
 * Converts plain text with line breaks to HTML paragraphs
 * @param {string} text - Plain text with line breaks
 * @returns {string} - HTML with paragraph tags
 */
export function textToHtml(text) {
  if (!text) return '';
  
  // If text already contains HTML tags, return as is
  if (text.includes('<') && text.includes('>')) {
    return text;
  }
  
  // Trim the text first
  const trimmedText = text.trim();
  if (!trimmedText) return '';
  
  // Split by double line breaks (paragraphs)
  const paragraphs = trimmedText.split(/\n\s*\n/).filter(p => p.trim());
  
  if (paragraphs.length === 0) {
    // If no double line breaks, check for single line breaks
    if (trimmedText.includes('\n')) {
      // Single line breaks become <br> tags within one paragraph
      const content = trimmedText.replace(/\n/g, '<br>');
      return `<p>${content}</p>`;
    }
    // No line breaks, just wrap in paragraph
    return `<p>${trimmedText}</p>`;
  }
  
  // Convert each paragraph to <p> tag
  return paragraphs
    .map(para => {
      // Replace single line breaks within paragraph with <br>
      const content = para.trim().replace(/\n/g, '<br>');
      return `<p>${content}</p>`;
    })
    .join('\n');
}

/**
 * Converts HTML paragraphs to plain text with line breaks
 * @param {string} html - HTML string with paragraph tags
 * @returns {string} - Plain text with line breaks
 */
export function htmlToText(html) {
  if (!html) return '';
  
  // Create a temporary div element
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  
  // Get all paragraph elements
  const paragraphs = tmp.querySelectorAll('p');
  
  if (paragraphs.length === 0) {
    // If no paragraphs, return text content with line breaks preserved
    return tmp.textContent || tmp.innerText || '';
  }
  
  // Convert each paragraph to text, separated by double line breaks
  return Array.from(paragraphs)
    .map(p => {
      // Replace <br> tags with line breaks
      const content = p.innerHTML.replace(/<br\s*\/?>/gi, '\n');
      // Strip any remaining HTML tags
      const textDiv = document.createElement('div');
      textDiv.innerHTML = content;
      return textDiv.textContent || textDiv.innerText || '';
    })
    .filter(text => text.trim())
    .join('\n\n');
}
