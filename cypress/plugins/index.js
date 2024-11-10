// cypress/plugins/index.js
const ExcelJS = require('exceljs');
const path = require('path');

module.exports = (on, config) => {
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
};
