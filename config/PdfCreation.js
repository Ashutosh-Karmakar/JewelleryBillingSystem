const fs = require('fs');
// const pdf = require('pdf-creation-node')
const path = require('path');
const options = require('./pdfFormatter')
const FinalData = require('../main')

const generatePDF = async (req, res, next, FinalData) => {
    const html = fs.readFileSync(path.join(__dirname, '../views/template.html'), 'utf-8');
    const filename = Math.random() + '_doc' + '.pdf';
    const document = {
        html: html,
        data : {
            products: FinalData
        },
        path: './Bills/' + filename
    }
    pdf.create(document, options)
    .then(res => {
        console.log(res)
    }).catch(error => {
        console.log(error)
    });
    const filepathname = 'http://localhost:8000/Bills/' + filename;
    res.render('download', {
        path:filepathname
    });
}

module.exports = {
    generatePDF
}