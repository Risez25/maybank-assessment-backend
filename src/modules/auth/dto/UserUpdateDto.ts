'use strict';

import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
} from 'class-validator';
import { Column } from 'typeorm';

export class UserUpdateDto {
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
}
