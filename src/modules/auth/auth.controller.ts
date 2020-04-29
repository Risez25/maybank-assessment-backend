import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    Put,
    Delete,
    Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    ApiBearerAuth,
    ApiConsumes,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';

import { AuthUser } from '../../decorators/auth-user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { IFile } from '../../interfaces/IFile';
import { UserDto } from '../user/dto/UserDto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/LoginPayloadDto';
import { UserLoginDto } from './dto/UserLoginDto';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { UserUpdateDto } from './dto/UserUpdateDto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        public readonly userService: UserService,
        public readonly authService: AuthService,
    ) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: LoginPayloadDto,
        description: 'User info with access token',
    })
    async userLogin(
        @Body() userLoginDto: UserLoginDto,
    ): Promise<LoginPayloadDto> {
        const userEntity = await this.authService.validateUser(userLoginDto);

        const token = await this.authService.createToken(userEntity);
        return new LoginPayloadDto(userEntity.toDto(), token);
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
    async userRegister(
        @Body() userRegisterDto: UserRegisterDto,
    ): Promise<UserDto> {
        const createdUser = await this.userService.createUser(userRegisterDto);
        return createdUser.toDto();
    }

    @Delete('delete/:email')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'User Has Been Deleted' })
    async deleteUser(@Param('email') email: string): Promise<string> {
        const deleteUser = await this.userService.deleteUser(email);
        return { message: deleteUser };
    }

    @Put('update')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: UserUpdateDto,
        description: 'SuccessFully Update User',
    })
    async updateUser(@Body() userUpdateDto: UserUpdateDto): Promise<UserDto> {
        const updateUser = await this.userService.updateUser(userUpdateDto);
        return updateUser.toDto();
    }
}
