import {MigrationInterface, QueryRunner} from "typeorm";

export class GenresFavMoies1646823523900 implements MigrationInterface {
    name = 'GenresFavMoies1646823523900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genres" DROP CONSTRAINT "FK_6059f3a850eb464a1a0b7b70bb1"`);
        await queryRunner.query(`ALTER TABLE "genres" RENAME COLUMN "userId" TO "create_date"`);
        await queryRunner.query(`CREATE TABLE "fav-movies" ("id" SERIAL NOT NULL, "movies_id" integer NOT NULL, "watched" boolean NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2e0b114ae9b527ace84a8cedf38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "create_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "genres" DROP COLUMN "create_date"`);
        await queryRunner.query(`ALTER TABLE "genres" ADD "create_date" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genres" DROP COLUMN "create_date"`);
        await queryRunner.query(`ALTER TABLE "genres" ADD "create_date" integer`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "create_date"`);
        await queryRunner.query(`DROP TABLE "fav-movies"`);
        await queryRunner.query(`ALTER TABLE "genres" RENAME COLUMN "create_date" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "genres" ADD CONSTRAINT "FK_6059f3a850eb464a1a0b7b70bb1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
