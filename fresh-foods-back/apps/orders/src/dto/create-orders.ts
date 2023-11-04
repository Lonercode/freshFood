import { IsString, IsNumber, IsNotEmpty, IsLongitude, IsLatitude, IsObject, ValidateNested, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
class locationDTO{
    @IsLongitude()
    @IsNotEmpty()
    longitude: number

    @IsLatitude()
    @IsNotEmpty()
    latitude: number

    @IsString()
    @IsNotEmpty()
    address: string

}

export class createOrdersDto{
    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => locationDTO)
    location: locationDTO

    @Min(6)
    @Max(30)
    @IsNumber()
    @IsNotEmpty()
    quantity: number

    @IsNumber()
    @IsNotEmpty()
    price: number

}