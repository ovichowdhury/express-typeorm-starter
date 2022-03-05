import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1646498528925 implements MigrationInterface {
  name = 'CreateTableUser1646498528925';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "mobile" character varying NOT NULL, "email" character varying NOT NULL, "gender" character varying NOT NULL, "createdBy" character varying NOT NULL, "createDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying, "updateDate" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "UQ_29fd51e9cf9241d022c5a4e02e6" UNIQUE ("mobile"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
