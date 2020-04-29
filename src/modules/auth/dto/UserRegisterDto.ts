'use strict';

import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    MinLength,
} from 'class-validator';
import { Column } from 'typeorm';

export class UserRegisterDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly username: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly phone: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly skillsets: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly hobby: string;

    @IsString()
    @MinLength(6)
    @ApiProperty({ minLength: 6 })
    readonly password: string;
}
