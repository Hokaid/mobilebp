import { IsDateString, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { ProductInterface } from "../interfaces/product.interface";

export class ProductDTO implements ProductInterface {
    @IsNotEmpty()
    id: string;
    
    @MinLength(6)
    @MaxLength(100)
    name: string;
    
    @MinLength(10)
    @MaxLength(200)
    description: string;
    
    @IsNotEmpty()
    logo: string;
    
    @IsDateString()
    date_release: Date;
    
    @IsDateString()
    date_revision: Date;

    constructor(
        id: string,
        name: string,
        description: string,
        logo: string,
        date_release: Date,
        date_revision: Date
      ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.logo = logo;
        this.date_release = date_release;
        this.date_revision = date_revision;
      }
}