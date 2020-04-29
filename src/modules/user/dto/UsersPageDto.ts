import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { UserDto } from './UserDto';

export class UsersPageDto {
    @ApiProperty({
        type: UserDto,
        isArray: true,
    })
    readonly data: UserDto[];

    constructor(data: UserDto[]) {
        this.data = data;
    }
}
