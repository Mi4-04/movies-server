import { MigrationInterface, QueryRunner } from 'typeorm';

export class FavMovies1646400107807 implements MigrationInterface {
  name = 'FavMovies1646400107807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "fav-movies" ("id" SERIAL NOT NULL, "movies_id" integer NOT NULL, "watched" boolean NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_2e0b114ae9b527ace84a8cedf38" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "genres" ADD "createDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "createDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav-movies" ADD CONSTRAINT "FK_fffa47c28c8ef50a73f28f7e5a6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fav-movies" DROP CONSTRAINT "FK_fffa47c28c8ef50a73f28f7e5a6"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createDate"`);
    await queryRunner.query(`ALTER TABLE "genres" DROP COLUMN "createDate"`);
    await queryRunner.query(`DROP TABLE "fav-movies"`);
  }
}
