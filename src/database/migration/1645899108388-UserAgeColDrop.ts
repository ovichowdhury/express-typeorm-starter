import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAgeColDrop1645899108388 implements MigrationInterface {
  name = 'UserAgeColDrop1645899108388';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "age" integer NOT NULL`);
  }
}
