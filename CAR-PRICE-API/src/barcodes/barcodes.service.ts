/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Barcode } from './barcode.entity';

@Injectable()
export class BarcodesService {
    private barcodeNumberLength = 2;
    constructor(@InjectRepository(Barcode) private barcodeRepository: Repository<Barcode>){}

    async createBarcode(name: string): Promise<Barcode> {
      const barcode = new Barcode();
      barcode.name = name;
  
      const date = new Date();
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
  
      while (true) {
        const count = await this.barcodeRepository.count({
          where: {
            barcode: Like(`(${year},${month},${day})%`),
          },
        });
  
        const number = ('0'.repeat(this.barcodeNumberLength) + (count + 1)).slice(-this.barcodeNumberLength);
        barcode.barcode = `(${year},${month},${day})${number}`;
  
        const barcodeExists = await this.barcodeRepository.findOne({where:{ barcode: barcode.barcode }});
        if (!barcodeExists) {
          break;
        }
  
        this.barcodeNumberLength++;
      }
  
      return this.barcodeRepository.save(barcode);
      }
}
