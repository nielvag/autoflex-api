import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1770733186493 implements MigrationInterface {
  name = 'Init1770733186493';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "product" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "code" character varying(30) NOT NULL,
                "name" character varying(120) NOT NULL,
                "price" numeric(12, 2) NOT NULL,
                CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_99c39b067cfa73c783f0fc49a6" ON "product" ("code")
        `);
    await queryRunner.query(`
            CREATE TABLE "product_raw_material" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "product_id" uuid NOT NULL,
                "raw_material_id" uuid NOT NULL,
                "quantity_required" numeric(14, 3) NOT NULL,
                CONSTRAINT "PK_50fefa6281d64542c083a32a7d7" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_fab890e35caec03723a5435b0a" ON "product_raw_material" ("product_id", "raw_material_id")
        `);
    await queryRunner.query(`
            CREATE TABLE "raw-material" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "code" character varying(30) NOT NULL,
                "name" character varying(120) NOT NULL,
                "stock_quantity" numeric(14, 3) NOT NULL DEFAULT '0',
                CONSTRAINT "PK_0fe170d68a07d9ce3c58c44beca" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_4e69c2124d569f872dce276783" ON "raw-material" ("code")
        `);
    await queryRunner.query(`
            ALTER TABLE "product_raw_material"
            ADD CONSTRAINT "FK_4106246f8a7cbb389cdb73688cf" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "product_raw_material"
            ADD CONSTRAINT "FK_4ef61cbe6db1b3e3f0535759ac4" FOREIGN KEY ("raw_material_id") REFERENCES "raw-material"("id") ON DELETE RESTRICT ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "product_raw_material" DROP CONSTRAINT "FK_4ef61cbe6db1b3e3f0535759ac4"
        `);
    await queryRunner.query(`
            ALTER TABLE "product_raw_material" DROP CONSTRAINT "FK_4106246f8a7cbb389cdb73688cf"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_4e69c2124d569f872dce276783"
        `);
    await queryRunner.query(`
            DROP TABLE "raw-material"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_fab890e35caec03723a5435b0a"
        `);
    await queryRunner.query(`
            DROP TABLE "product_raw_material"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_99c39b067cfa73c783f0fc49a6"
        `);
    await queryRunner.query(`
            DROP TABLE "product"
        `);
  }
}
