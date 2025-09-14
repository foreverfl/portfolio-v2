#!/usr/bin/env node

const { default: lighthouse } = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const config = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0
    },
    screenEmulation: {
      mobile: false,
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      disabled: false
    }
  }
};

async function runLighthouse(url) {
  let chrome;

  try {
    // Launch Chrome
    chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage']
    });

    const options = {
      logLevel: 'info',
      output: ['html', 'json'],
      port: chrome.port
    };

    // Run Lighthouse
    const runnerResult = await lighthouse(url, options, config);

    // Create reports directory
    const reportsDir = path.join(__dirname, '..', 'lighthouse-reports');
    await fs.mkdir(reportsDir, { recursive: true });

    // Save reports
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const htmlPath = path.join(reportsDir, `report-${timestamp}.html`);
    const jsonPath = path.join(reportsDir, `report-${timestamp}.json`);

    await fs.writeFile(htmlPath, runnerResult.report[0]);
    await fs.writeFile(jsonPath, runnerResult.report[1]);

    // Parse and display scores
    const lhr = runnerResult.lhr;
    console.log('\n🚀 Lighthouse Score Report\n');
    console.log('=' .repeat(50));

    const categories = lhr.categories;
    const scores = {
      'Performance': categories.performance.score * 100,
      'Accessibility': categories.accessibility.score * 100,
      'Best Practices': categories['best-practices'].score * 100,
      'SEO': categories.seo.score * 100
    };

    Object.entries(scores).forEach(([category, score]) => {
      const emoji = score >= 90 ? '✅' : score >= 50 ? '⚠️' : '❌';
      const color = score >= 90 ? '\x1b[32m' : score >= 50 ? '\x1b[33m' : '\x1b[31m';
      console.log(`${emoji} ${category}: ${color}${score.toFixed(0)}%\x1b[0m`);
    });

    console.log('=' .repeat(50));
    console.log(`\n📊 Full report saved to: ${htmlPath}`);
    console.log(`📈 JSON data saved to: ${jsonPath}\n`);

    // Show top opportunities for improvement
    if (lhr.audits) {
      const opportunities = Object.values(lhr.audits)
        .filter(audit => audit.details?.type === 'opportunity' && audit.score < 1)
        .sort((a, b) => (b.details?.overallSavingsMs || 0) - (a.details?.overallSavingsMs || 0))
        .slice(0, 5);

      if (opportunities.length > 0) {
        console.log('\n💡 Top Opportunities for Improvement:\n');
        opportunities.forEach((opp, idx) => {
          const savings = opp.details?.overallSavingsMs || 0;
          console.log(`${idx + 1}. ${opp.title}`);
          if (savings > 0) {
            console.log(`   Potential savings: ${(savings / 1000).toFixed(2)}s`);
          }
          if (opp.description) {
            console.log(`   ${opp.description.substring(0, 100)}...`);
          }
          console.log();
        });
      }
    }

    // Show failing audits
    const failingAudits = Object.values(lhr.audits)
      .filter(audit => audit.score === 0 && audit.details?.type !== 'opportunity')
      .slice(0, 5);

    if (failingAudits.length > 0) {
      console.log('\n⚠️  Issues to Fix:\n');
      failingAudits.forEach((audit, idx) => {
        console.log(`${idx + 1}. ${audit.title}`);
        if (audit.description) {
          console.log(`   ${audit.description.substring(0, 100)}...`);
        }
        console.log();
      });
    }

    return scores;

  } catch (error) {
    console.error('Error running Lighthouse:', error);
    process.exit(1);
  } finally {
    if (chrome) {
      await chrome.kill();
    }
  }
}

// Main execution
async function main() {
  const url = process.argv[2] || 'http://localhost:4173/portfolio-v2/';

  console.log(`\n🔍 Running Lighthouse audit on: ${url}`);
  console.log('This may take a moment...\n');

  const scores = await runLighthouse(url);

  // Exit with error if any score is below threshold
  const threshold = 80;
  const failedCategories = Object.entries(scores)
    .filter(([_, score]) => score < threshold);

  if (failedCategories.length > 0) {
    console.log(`\n❌ Some categories are below ${threshold}% threshold`);
    process.exit(1);
  } else {
    console.log(`\n✅ All categories meet the ${threshold}% threshold!`);
    process.exit(0);
  }
}

main().catch(console.error);