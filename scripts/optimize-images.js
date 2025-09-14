const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

async function optimizeImages() {
  // Find all image files
  const imagePatterns = [
    'src/assets/images/**/*.{jpg,jpeg,png}',
    'public/*.{jpg,jpeg,png}'
  ];

  const formats = [
    { format: 'webp', quality: 85 },
    { format: 'avif', quality: 80 }
  ];

  let totalOptimized = 0;
  let totalSaved = 0;

  for (const pattern of imagePatterns) {
    const files = glob.sync(pattern);

    for (const file of files) {
      const dir = path.dirname(file);
      const basename = path.basename(file, path.extname(file));

      try {
        const originalStats = await fs.stat(file);
        const originalSize = originalStats.size;

        // Create optimized versions
        for (const { format, quality } of formats) {
          const outputPath = path.join(dir, `${basename}.${format}`);

          // Skip if already exists
          try {
            await fs.access(outputPath);
            console.log(`✓ ${outputPath} already exists, skipping...`);
            continue;
          } catch {
            // File doesn't exist, proceed with conversion
          }

          await sharp(file)
            [format]({ quality })
            .toFile(outputPath);

          const newStats = await fs.stat(outputPath);
          const saved = originalSize - newStats.size;
          totalSaved += saved;

          console.log(`✓ Created ${outputPath} (saved ${(saved / 1024).toFixed(1)}KB)`);
          totalOptimized++;
        }
      } catch (error) {
        console.error(`✗ Error processing ${file}:`, error.message);
      }
    }
  }

  console.log(`\n🎉 Optimization complete!`);
  console.log(`   Converted ${totalOptimized} images`);
  console.log(`   Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`);
}

optimizeImages().catch(console.error);