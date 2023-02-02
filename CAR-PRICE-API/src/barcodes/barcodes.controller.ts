/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { Barcode } from './barcode.entity';
import { BarcodesService } from './barcodes.service';
import { CreateBarcodeDto } from './dtos/create-barcode.dto';

@Controller('barcode')
export class BarcodesController {
  constructor(private barcodesService: BarcodesService) {}

  @Post('/items')
  async createProduct(@Body() body: CreateBarcodeDto): Promise<Barcode> {
    return this.barcodesService.createBarcode(body.name);
  }
}
