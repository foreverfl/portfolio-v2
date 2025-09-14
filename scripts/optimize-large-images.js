const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeLargeImages() {
  // Target large images first
  const largeImages = [
    'src/assets/images/tera.JPEG',
    'src/assets/images/borame-park.JPEG',
    'src/assets/images/sky-park.JPEG',
    'src/assets/images/sakura.JPEG',
    'src/assets/images/about/beef-brisket.jpeg',
    'src/assets/images/about/seafood-steamed.jpeg',
    'src/assets/images/about/hinoki-steamed.jpeg',
    'src/assets/images/about/motsunabe.jpeg',
    'src/assets/images/about/sea-snail-soup.jpeg'
  ];

  const formats = [
    { format: 'webp', quality: 85 },
    { format: 'avif', quality: 80 }
  ];

  let totalSaved = 0;

  for (const file of largeImages) {
    try {
      await fs.access(file);
    } catch {
      console.log(`File not found: ${file}`);
      continue;
    }

    const dir = path.dirname(file);
    const basename = path.basename(file, path.extname(file)).toLowerCase();

    try {
      const originalStats = await fs.stat(file);
      const originalSize = originalStats.size;
      console.log(`\nProcessing ${file} (${(originalSize / 1024 / 1024).toFixed(2)}MB)`);

      for (const { format, quality } of formats) {
        const outputPath = path.join(dir, `${basename}.${format}`);

        // Check if already exists
        try {
          await fs.access(outputPath);
          console.log(`  ✓ ${format} version already exists`);
          continue;
        } catch {
          // File doesn't exist, proceed
        }

        // Resize to max 1920px width while maintaining aspect ratio
        await sharp(file)
          .resize(1920, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          [format]({ quality })
          .toFile(outputPath);

        const newStats = await fs.stat(outputPath);
        const saved = originalSize - newStats.size;
        totalSaved += saved;

        console.log(`  ✓ Created ${format} version (${(newStats.size / 1024 / 1024).toFixed(2)}MB, saved ${(saved / 1024 / 1024).toFixed(2)}MB)`);
      }
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  }

  console.log(`\n🎉 Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`);
}

optimizeLargeImages().catch(console.error);