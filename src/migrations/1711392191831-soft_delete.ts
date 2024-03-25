import { MigrationInterface, QueryRunner } from "typeorm";

export class SoftDelete1711392191831 implements MigrationInterface {
    name = 'SoftDelete1711392191831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD "code" character varying`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "date_payment" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "amountPayments" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "amountPayments"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "date_payment"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "code"`);
    }

}
