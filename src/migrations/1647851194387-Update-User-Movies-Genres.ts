import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserMoviesGenres1647851194387 implements MigrationInterface {
    name = 'UpdateUserMoviesGenres1647851194387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genres" DROP CONSTRAINT "FK_6059f3a850eb464a1a0b7b70bb1"`);
        await queryRunner.query(`CREATE TABLE "fav-movies" ("id" SERIAL NOT NULL, "movies_id" integer NOT NULL, "watched" boolean NOT NULL DEFAULT false, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_2e0b114ae9b527ace84a8cedf38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "genres" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "genres" ADD "create_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "genres" ADD "usersId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "create_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "genres" DROP COLUMN "genre_id"`);
        await queryRunner.query(`ALTER TABLE "genres" ADD "genre_id" integer array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "genres" ADD CONSTRAINT "FK_b49199c7f1e9fe004c3f3247fcb" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fav-movies" ADD CONSTRAINT "FK_fffa47c28c8ef50a73f28f7e5a6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fav-movies" DROP CONSTRAINT "FK_fffa47c28c8ef50a73f28f7e5a6"`);
        await queryRunner.query(`ALTER TABLE "genres" DROP CONSTRAINT "FK_b49199c7f1e9fe004c3f3247fcb"`);
        await queryRunner.query(`ALTER TABLE "genres" DROP COLUMN "genre_id"`);
        await queryRunner.query(`ALTER TABLE "genres" ADD "genre_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "create_date"`);
        await queryRunner.query(`ALTER TABLE "genres" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "genres" DROP COLUMN "create_date"`);
        await queryRunner.query(`ALTER TABLE "genres" ADD "userId" integer`);
        await queryRunner.query(`DROP TABLE "fav-movies"`);
        await queryRunner.query(`ALTER TABLE "genres" ADD CONSTRAINT "FK_6059f3a850eb464a1a0b7b70bb1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
