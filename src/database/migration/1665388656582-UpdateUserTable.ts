import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserTable1665388656582 implements MigrationInterface {
  name = 'UpdateUserTable1665388656582';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "age" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
  }
}
