const PDFDocument = require('pdfkit');
const fs = require('fs');

const generarPDF = async (data, modelName, res, tableHeaders) => {
    try {
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(`${modelName}List.pdf`));
        const currentDate = new Date();
        doc.text(currentDate.toISOString(), 450, 20, { align: 'right' });
        doc.fontSize(18).text(`Lista de ${modelName}`, { align: 'center' });

        const columnWidths = Array(tableHeaders.length).fill(100);
        doc.fillColor("white");
        doc.rect(50, 100, columnWidths.reduce((acc, width) => acc + width, 0), 20).fillAndStroke("gray", "black");
        doc.fillColor("black");

        tableHeaders.forEach((header, index) => {
            doc.text(header, 60 + columnWidths.slice(0, index).reduce((acc, width) => acc + width, 0), 105);
        });

        doc.moveDown();

        let x = 60;
        let y = 140;

        data.forEach((item, rowIndex) => {
            const dataObject = item.get({ plain: true });

            tableHeaders.forEach((header, index) => {
                const cellValue = dataObject[header] || '';
                doc.text(cellValue, x, y);
                x += columnWidths[index];
            });

            y += 20;
            x = 60;
        });

        doc.end();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${modelName}List.pdf`);
        fs.createReadStream(`${modelName}List.pdf`).pipe(res);
    } catch (error) {
        console.error(`Error al generar el PDF de ${modelName}:`, error);
        res.status(500).json({ success: false, error: `Error al generar el PDF de ${modelName}: ${error.message}` });
    }
};

module.exports = {
    generarPDF,
};
