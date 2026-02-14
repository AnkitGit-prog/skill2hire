const pdf = require('pdf-parse');

console.log('Type of pdf:', typeof pdf);

async function testPdf() {
    try {
        const buffer = Buffer.from('test');
        console.log('Calling pdf(buffer)...');
        // This will likely fail with "Invalid PDF structure" but that confirms the function works
        await pdf(buffer);
    } catch (e) {
        console.log('Error (Expected if pdf works):', e.message);
    }
}

testPdf();
