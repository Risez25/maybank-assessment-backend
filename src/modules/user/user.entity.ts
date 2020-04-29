import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../common/constants/role-type';
import { UserDto } from './dto/UserDto';
import { PasswordTransformer } from './password.transformer';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> {
    @Column({ nullable: true })
    username: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    skillsets: string;

    @Column({ nullable: true })
    hobby: string;

    @Column({ nullable: true, transformer: new PasswordTransformer() })
    password: string;

    dtoClass = UserDto;
}
