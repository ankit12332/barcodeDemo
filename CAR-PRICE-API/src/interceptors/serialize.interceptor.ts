import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { UseInterceptors } from "@nestjs/common/decorators";
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";

export function Serialize(dto: any){
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto:any) {}

    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return handler.handle().pipe(
            map((data:any) => {
                return plainToClass(this.dto, data,{
                    excludeExtraneousValues: true,
                })
            })
        )
    }
    
}