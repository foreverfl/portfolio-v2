const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

async function convertProjectImages() {
  const pattern = 'src/assets/images/projects/*.png';
  const files = glob.sync(pattern);

  const formats = [
    { format: 'webp', quality: 90 },
    { format: 'avif', quality: 85 }
  ];

  let totalConverted = 0;
  let totalSaved = 0;

  for (const file of files) {
    const dir = path.dirname(file);
    const basename = path.basename(file, path.extname(file));

    try {
      const originalStats = await fs.stat(file);
      const originalSize = originalStats.size;
      console.log(`\nProcessing ${basename}.png (${(originalSize / 1024).toFixed(0)}KB)`);

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

        await sharp(file)
          [format]({ quality })
          .toFile(outputPath);

        const newStats = await fs.stat(outputPath);
        const saved = originalSize - newStats.size;
        totalSaved += saved;
        totalConverted++;

        console.log(`  ✓ Created ${format} (${(newStats.size / 1024).toFixed(0)}KB, saved ${(saved / 1024).toFixed(0)}KB)`);
      }
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  }

  console.log(`\n🎉 Converted ${totalConverted} images`);
  console.log(`   Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`);
}

convertProjectImages().catch(console.error);