import { BarcodesController } from './barcodes.controller';
import { BarcodesService } from './barcodes.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barcode } from './barcode.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Barcode])],
    controllers: [BarcodesController],
    providers: [BarcodesService],
})
export class BarcodesModule {}
