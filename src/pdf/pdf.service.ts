import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

/**
 * https://stackoverflow.com/questions/67353683/puppeteer-custom-fonts-not-loading-in-pdf-but-do-appear-in-screenshots
 * https://github.com/puppeteer/puppeteer/issues/422
 */
@Injectable()
export class PdfService {
  async generatePdf() {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-web-security'],
    });
    const page = await browser.newPage();

    const tempHtmlPath = path.resolve(__dirname, 'index.html');
    const pdfPath = 'output.pdf';

    // Save HTML to a temporary file
    fs.writeFileSync(tempHtmlPath, fs.readFileSync('index.html'));

    // Convert HTML to PDF
    await page.goto(`file://${tempHtmlPath}`, { waitUntil: 'networkidle2' });
    await page.setViewport({ width: 794, height: 1122, deviceScaleFactor: 2 });
    await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });

    // Close the browser
    await browser.close();

    // Remove the temporary HTML file
    fs.unlinkSync(tempHtmlPath);

    return pdfPath;
  }
}
