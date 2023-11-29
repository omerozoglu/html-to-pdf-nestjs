import { Controller, Get } from '@nestjs/common';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get('generate-pdf')
  async generatePdf(): Promise<string> {
    const pdfPath = await this.pdfService.generatePdf();
    return `PDF generated and saved at: ${pdfPath}`;
  }
}
