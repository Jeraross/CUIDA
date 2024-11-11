const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs'); // Importa o módulo 'fs' para verificar a existência de arquivos
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:8000",
    viewportWidth: 1920,
    viewportHeight: 1080,
    watchForFileChanges: false,
    downloadsFolder: 'cypress/downloads',
    setupNodeEvents(on, config) {
      // Registrar as tasks readExcel e fileExists
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
        },
        fileExists(filePath) {
          const absolutePath = path.resolve(filePath);
          return fs.existsSync(absolutePath); // Retorna true ou false dependendo da existência do arquivo
        }
      });
    },
  },
});
