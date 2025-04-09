const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// ---- 🔧 Parse CLI arguments ----
const args = process.argv.slice(2);
const getArg = (key, defaultValue) => {
  const match = args.find(arg => arg.startsWith(`--${key}=`));
  return match ? match.split('=')[1] : defaultValue;
};

const browser = getArg('browser', 'chrome');
const headed = getArg('headed', 'true') === 'true';
const singleFile = getArg('file', null);
const retryCount = parseInt(getArg('retryCount', '1'), 10);
const retryDelay = parseInt(getArg('retryDelay', '3000'), 10); // in ms
const mochawesomeReportDir = path.join(__dirname, 'cypress', 'report', 'mochawesome-report');

// 🧹 Clear mochawesome-report directory
if (fs.existsSync(mochawesomeReportDir)) {
  fs.rmSync(mochawesomeReportDir, { recursive: true, force: true });
  console.log('🧹 Cleared existing mochawesome-report contents.');
}

const testFolder = './cypress/e2e';
const testFiles = singleFile
  ? [singleFile]
  : fs.readdirSync(testFolder).filter(f => f.endsWith('.cy.js'));

const results = [];

const runTest = async (file, timestamp) => {
  const testName = path.basename(file, path.extname(file));
  const testFilePath = path.join(testFolder, file);
  const jsonReport = `cypress/report/mochawesome-report/${testName}-report-${timestamp}.json`;
  const htmlOutputDir = `cypress/report/html/${testName}`;
  const defaultReport = 'cypress/report/mochawesome-report/mochawesome.json';

  console.log(`\n🚀 Running test: ${file} on browser: ${browser} (${headed ? 'headed' : 'headless'})\n`);

  try {
    const runCommand = `npx cypress run -s ${testFilePath} ${headed ? '--headed' : '--headless'} -b ${browser} ` +
      `--reporter mochawesome --reporter-options reportDir=cypress/report/mochawesome-report,overwrite=true,html=false,json=true --env retries=2`;
    execSync(runCommand, { stdio: 'inherit' });
  } catch {
    if (fs.existsSync(defaultReport)) {
      fs.renameSync(defaultReport, jsonReport);
    }
    return '❌ Failed';
  }

  if (fs.existsSync(defaultReport)) {
    fs.renameSync(defaultReport, jsonReport);
    console.log(`✅ JSON report saved as: ${jsonReport}`);
  } else {
    console.error(`❌ Report JSON not found: ${defaultReport} (test may have crashed or was interrupted)`);
    return '❌ Failed';
  }

  if (fs.existsSync(htmlOutputDir)) {
    fs.rmSync(htmlOutputDir, { recursive: true, force: true });
    console.log(`🧹 Cleaned old HTML report folder: ${htmlOutputDir}`);
  }

  try {
    console.log(`📄 Generating HTML report for: ${testName}`);
    execSync(`npx marge "${jsonReport}" -f ${testName}-report -o "${htmlOutputDir}"`, { stdio: 'inherit' });
    console.log(`✅ HTML report saved at: ${htmlOutputDir}/${testName}-report.html`);

    const open = await import('open').then(mod => mod.default);
    await open(`${htmlOutputDir}/${testName}-report.html`);
  } catch (error) {
    console.error(`❌ Failed to generate or open HTML report for ${testName}:`, error.message);
  }

  return '✅ Passed';
};

const mergeAllReports = async (jsonReports, outputDir) => {
  const mergedJsonPath = path.join(mochawesomeReportDir, 'merged-output.json');
  fs.rmSync(outputDir, { recursive: true, force: true });

  try {
    const mergeCommand = `npx mochawesome-merge ${jsonReports.map(f => `"${f}"`).join(' ')} > "${mergedJsonPath}"`;
    execSync(mergeCommand, { stdio: 'inherit', shell: true });
    console.log(`🧬 Merged JSON created at: ${mergedJsonPath}`);

    execSync(`npx marge "${mergedJsonPath}" -f merged-summary-report -o "${outputDir}"`, { stdio: 'inherit' });
    console.log(`📊 Merged report saved at: ${outputDir}/merged-summary-report.html`);

    const open = await import('open').then(mod => mod.default);
    await open(`${outputDir}/merged-summary-report.html`);
  } catch (err) {
    console.error('❌ Failed to merge or generate merged summary report', err);
  }
};

(async () => {
  const failedTests = [];

  for (const file of testFiles) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const status = await runTest(file, timestamp);
    results.push({ file, status });
    if (status === '❌ Failed') {
      failedTests.push(file);
    }
  }

  if (failedTests.length > 0) {
    console.log(`\n🔁 Retrying failed tests up to ${retryCount} time(s) with ${retryDelay}ms delay...\n`);

    for (const file of failedTests) {
      for (let attempt = 1; attempt <= retryCount; attempt++) {
        console.log(`🔄 Retry attempt ${attempt} for test: ${file}`);
        await new Promise(res => setTimeout(res, retryDelay));

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const status = await runTest(file, timestamp);
        results.push({ file: `${file} (retry ${attempt})`, status });

        if (status === '✅ Passed') break;
      }
    }
  }

  console.log('\n📋 Final Test Result Summary:');
  console.table(results);

  const allJsonReports = fs.readdirSync(mochawesomeReportDir)
    .filter(file => file.endsWith('.json'))
    .map(f => path.join(mochawesomeReportDir, f));

  if (allJsonReports.length > 0) {
    const mergedReportOutput = 'cypress/report/html/merged';
    await mergeAllReports(allJsonReports, mergedReportOutput);
  }

  console.log(`\n🎉 All individual and merged test reports generated in: cypress/report/html/`);
})();