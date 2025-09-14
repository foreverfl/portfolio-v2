const fs = require('fs').promises;
const path = require('path');

async function updateTranslationImages() {
  const locales = ['en', 'kr', 'jp'];

  for (const locale of locales) {
    const filePath = path.join('public', 'locales', locale, 'translation.json');

    try {
      // Read the JSON file
      const content = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(content);

      // Update experience images
      if (data.experiences) {
        data.experiences.forEach(exp => {
          if (exp.imageUrl) {
            // Convert experience images to webp
            exp.imageUrl = exp.imageUrl.replace(/\.jpg$/i, '.webp');
          }
        });
      }

      // Update project images
      if (data.projects) {
        data.projects.forEach(proj => {
          if (proj.imageUrl) {
            // Convert project images to webp
            proj.imageUrl = proj.imageUrl.replace(/\.png$/i, '.webp');
          }
        });
      }

      // Write the updated JSON back
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`✓ Updated ${locale}/translation.json`);

    } catch (error) {
      console.error(`✗ Error updating ${locale}/translation.json:`, error.message);
    }
  }

  console.log('\n🎉 Translation files updated!');
}

updateTranslationImages().catch(console.error);