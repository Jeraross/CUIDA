const ExcelJS = require('exceljs');
const path = require('path');
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:8000",
    viewportWidth: 1920,
    viewportHeight: 1080,
    watchForFileChanges: false,
    downloadsFolder: 'cypress/downloads',
    setupNodeEvents(on, config) {
      // Registrar a task readExcel
      on('task', {
        async readExcel(filePath) {
          const absolutePath = path.resolve(filePath);
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.readFile(absolutePath);
          const worksheet = workbook.worksheets[0];
          const rows = [];

          worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            rows.push(row.values);
          });

          return rows;
        }
      });
    },
  },
});
