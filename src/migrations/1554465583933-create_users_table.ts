import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1554465583933 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE "users"
            (
                "id"            serial,
                "created_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                "updated_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                "username"    character varying,
                "email"     character varying,
                "phone"        character varying,
                "skillsets"          character varying,
                "hobby"         character varying,
                "password"      character varying
            )`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE "users"');
    }
}
