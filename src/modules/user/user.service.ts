import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { FileNotImageException } from '../../exceptions/file-not-image.exception';
import { IFile } from '../../interfaces/IFile';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { UsersPageDto } from './dto/UsersPageDto';
import { UsersPageOptionsDto } from './dto/UsersPageOptionsDto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { UserUpdateDto } from 'modules/auth/dto/UserUpdateDto';

@Injectable()
export class UserService {
    constructor(
        public readonly userRepository: UserRepository,
        public readonly validatorService: ValidatorService,
        public readonly awsS3Service: AwsS3Service,
    ) {}

    /**
     * Find single user
     */
    findOne(findData: FindConditions<UserEntity>): Promise<UserEntity> {
        return this.userRepository.findOne(findData);
    }
    async findByUsernameOrEmail(
        options: Partial<{ username: string; email: string }>,
    ): Promise<UserEntity | undefined> {
        const queryBuilder = this.userRepository.createQueryBuilder('user');

        if (options.email) {
            queryBuilder.orWhere('user.email = :email', {
                email: options.email,
            });
        }
        if (options.username) {
            queryBuilder.orWhere('user.username = :username', {
                username: options.username,
            });
        }

        return queryBuilder.getOne();
    }

    async createUser(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
        const user = this.userRepository.create({ ...userRegisterDto });

        return this.userRepository.save(user);
    }

    async getUsers(): Promise<UsersPageDto> {
        const users = await this.userRepository.find();
        return new UsersPageDto(users.toDtos());
    }

    async updateUser(userUpdateDto: UserUpdateDto): Promise<UserUpdateDto> {
        let updateUser = await this.userRepository.findOne({
            email: userUpdateDto.email,
        });
        updateUser.username = userUpdateDto.username;
        updateUser.email = userUpdateDto.email;
        updateUser.hobby = userUpdateDto.hobby;
        updateUser.phone = userUpdateDto.phone;
        updateUser.skillsets = userUpdateDto.skillsets;
        await this.userRepository.save(updateUser);
    }
}
