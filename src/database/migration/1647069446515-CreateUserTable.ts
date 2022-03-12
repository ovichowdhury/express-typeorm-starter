import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1647069446515 implements MigrationInterface {
  name = 'CreateUserTable1647069446515';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "mobile" character varying NOT NULL, "email" character varying NOT NULL, "gender" character varying NOT NULL, "createdBy" character varying NOT NULL, "createDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying, "updateDate" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "UQ_d376a9f93bba651f32a2c03a7d3" UNIQUE ("mobile"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
