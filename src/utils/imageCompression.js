/**
 * Compress and resize an image file
 * @param {File} file - The image file to compress
 * @param {number} maxWidth - Maximum width (default: 1920)
 * @param {number} maxHeight - Maximum height (default: 1080)
 * @param {number} quality - JPEG quality 0-1 (default: 0.8)
 * @param {number} maxSizeKB - Maximum file size in KB (default: 1500KB to account for base64 overhead)
 * @returns {Promise<File>} - Compressed image file
 */
export async function compressImage(file, maxWidth = 1920, maxHeight = 1080, quality = 0.8, maxSizeKB = 1500) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Calculate new dimensions
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        // Create canvas and draw resized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob with compression
        const compressRecursive = (currentQuality) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to compress image'));
                return;
              }

              const sizeKB = blob.size / 1024;
              
              // If size is acceptable or quality is too low, return
              if (sizeKB <= maxSizeKB || currentQuality <= 0.1) {
                // Convert blob back to File
                const compressedFile = new File([blob], file.name, {
                  type: blob.type || 'image/jpeg',
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                // Reduce quality and try again
                compressRecursive(currentQuality - 0.1);
              }
            },
            'image/jpeg',
            currentQuality
          );
        };

        compressRecursive(quality);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

