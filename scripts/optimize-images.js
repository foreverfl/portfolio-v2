const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

async function optimizeImages() {
  // Find all image files (including uppercase extensions)
  const imagePatterns = [
    'src/assets/images/**/*.{jpg,jpeg,JPG,JPEG,png,PNG}',
    'public/*.{jpg,jpeg,JPG,JPEG,png,PNG}'
  ];

  const formats = [
    { format: 'webp', quality: 85 },
    { format: 'avif', quality: 80 }
  ];

  // Define responsive sizes
  const sizes = [
    { width: 640, suffix: '-640' },
    { width: 960, suffix: '-960' },
    { width: 1280, suffix: '-1280' },
    { width: 1920, suffix: '-1920' }
  ];

  let totalOptimized = 0;
  let totalSaved = 0;
  let processedFiles = new Set();

  for (const pattern of imagePatterns) {
    const files = glob.sync(pattern, { nocase: true });

    for (const file of files) {
      // Skip if already processed (to handle case-insensitive duplicates)
      const normalizedPath = file.toLowerCase();
      if (processedFiles.has(normalizedPath)) {
        continue;
      }
      processedFiles.add(normalizedPath);

      const dir = path.dirname(file);
      const basename = path.basename(file, path.extname(file));

      try {
        const originalStats = await fs.stat(file);
        const originalSize = originalStats.size;
        const metadata = await sharp(file).metadata();

        // Create optimized versions for each format
        for (const { format, quality } of formats) {
          // Create original size version
          const outputPath = path.join(dir, `${basename}.${format}`);

          // Skip if already exists
          try {
            await fs.access(outputPath);
            console.log(`✓ ${outputPath} already exists, skipping...`);
          } catch {
            // File doesn't exist, proceed with conversion
            await sharp(file)
              [format]({ quality })
              .toFile(outputPath);

            const newStats = await fs.stat(outputPath);
            const saved = originalSize - newStats.size;
            totalSaved += saved;

            console.log(`✓ Created ${outputPath} (saved ${(saved / 1024).toFixed(1)}KB)`);
            totalOptimized++;
          }

          // Create responsive sizes (only if image is larger than target size)
          for (const { width, suffix } of sizes) {
            if (metadata.width && metadata.width > width) {
              const responsivePath = path.join(dir, `${basename}${suffix}.${format}`);

              try {
                await fs.access(responsivePath);
                console.log(`✓ ${responsivePath} already exists, skipping...`);
              } catch {
                // File doesn't exist, proceed with conversion
                await sharp(file)
                  .resize(width, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                  })
                  [format]({ quality })
                  .toFile(responsivePath);

                const newStats = await fs.stat(responsivePath);
                const saved = originalSize - newStats.size;
                totalSaved += saved;

                console.log(`✓ Created ${responsivePath} (${width}w, saved ${(saved / 1024).toFixed(1)}KB)`);
                totalOptimized++;
              }
            }
          }
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