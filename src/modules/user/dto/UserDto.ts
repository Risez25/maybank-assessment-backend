'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { RoleType } from '../../../common/constants/role-type';
import { AbstractDto } from '../../../common/dto/AbstractDto';
import { UserEntity } from '../user.entity';

export class UserDto extends AbstractDto {
    @ApiPropertyOptional()
    username: string;

    @ApiPropertyOptional()
    email: string;

    @ApiPropertyOptional()
    phone: string;

    @ApiPropertyOptional()
    skillsets: string;

    @ApiPropertyOptional()
    hobby: string;

    constructor(user: UserEntity) {
        super(user);
        this.username = user.username;
        this.email = user.email;
        this.phone = user.phone;
        this.skillsets = user.skillsets;
        this.hobby = user.hobby;
    }
}
