// convert-images.ts
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images');
const quality = 80;

interface ImageConfig {
  [filename: string]: number[];
}

const imageConfig: ImageConfig = {
  'hero-bg.jpg': [640, 1024, 1920],
  'training.jpg': [640, 1024],
  'technology.jpg': [640, 1024],
  'community1.jpg': [640, 1024],
  'farming1.jpg': [640, 1024],
  'harvest1.jpg': [640, 1024],
  'youth.jpg': [640, 1024],
  'innovation.jpg': [640, 1024],
  'community-banner.jpg': [640, 1024, 1920]
};

async function convertImages(): Promise<void> {
  console.log('🔄 Converting images to WebP...\n');

  let totalSavingsBytes = 0;
  let processedCount = 0;

  for (const [filename, widths] of Object.entries(imageConfig)) {
    const inputPath = path.join(imagesDir, filename);
    
    try {
      await fs.access(inputPath);
    } catch {
      console.log(`⚠️  Skipping ${filename} (not found)`);
      continue;
    }

    const baseName = path.basename(filename, '.jpg');
    console.log(`📱 Converting ${filename}...`);

    const originalBuffer = await fs.readFile(inputPath);
    const originalSizeBytes = originalBuffer.length;
    const originalSizeKB = Math.round(originalSizeBytes / 1024);

    console.log(`   📏 Original: ${originalSizeKB}KB`);

    for (const width of widths) {
      const outputFilename = `${baseName}-${width}.webp`;
      const outputPath = path.join(imagesDir, outputFilename);

      // Skip if exists
      try {
        await fs.access(outputPath);
        console.log(`  ⏭️  ${outputFilename} (already exists)`);
        continue;
      } catch {
        /* File doesn't exist - continue */
      }

      try {
        const processedImage = await sharp(originalBuffer)
          .resize(width)
          .webp({ quality })
          .toBuffer();

        await fs.writeFile(outputPath, processedImage);

        const savingsPercent = ((1 - processedImage.length / originalSizeBytes) * 100);
        const savingsBytes = originalSizeBytes - processedImage.length;
        totalSavingsBytes += savingsBytes;
        processedCount++;

        const newSizeKB = Math.round(processedImage.length / 1024);
        console.log(`  ✅ ${outputFilename.padEnd(28)} ${newSizeKB}KB (${savingsPercent.toFixed(1)}% ↓)`);
      } catch (_error) {
        console.log(`  ❌ ${outputFilename.padEnd(28)} Failed to process`);
      }
    }
    console.log('');
  }

  console.log('🎉 Conversion complete!');
  console.log(`📊 Created: ${processedCount} images | Saved: ${(totalSavingsBytes / 1024 / 1024).toFixed(2)}MB`);

  // Show results
  try {
    const files = await fs.readdir(imagesDir);
    const newWebpFiles = files.filter(f => f.match(/-\d+\.webp$/)).sort();
    
    if (newWebpFiles.length > 0) {
      console.log('\n✅ New responsive WebP files:');
      for (const f of newWebpFiles.slice(0, 15)) {
        const stats = await fs.stat(path.join(imagesDir, f));
        const sizeKB = (stats.size / 1024).toFixed(1);
        console.log(`  📄 ${f.padEnd(28)} ${sizeKB}KB`);
      }
      if (newWebpFiles.length > 15) {
        console.log(`  ... and ${newWebpFiles.length - 15} more`);
      }
    }
  } catch {
    console.log('ℹ️  Could not list results');
  }
}

convertImages();
