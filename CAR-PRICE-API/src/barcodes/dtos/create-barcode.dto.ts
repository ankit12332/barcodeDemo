import {IsString } from "class-validator";

export class CreateBarcodeDto{
    
    @IsString()
    name: string;
}