import {MigrationInterface, QueryRunner} from "typeorm";

export class Genre1646820451174 implements MigrationInterface {
    name = 'Genre1646820451174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genres" DROP CONSTRAINT "FK_6059f3a850eb464a1a0b7b70bb1"`);
        await queryRunner.query(`CREATE TABLE "fav-movies" ("id" SERIAL NOT NULL, "moviesId" integer NOT NULL, "watched" boolean NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2e0b114ae9b527ace84a8cedf38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "genres_users_users" ("genresId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_eec34202d46f3930d5000b601ff" PRIMARY KEY ("genresId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3cc9436d4b53051af926b32a63" ON "genres_users_users" ("genresId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2a524fa51d1e2926ae993bb4d1" ON "genres_users_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "users_genres_genres" ("usersId" integer NOT NULL, "genresId" integer NOT NULL, CONSTRAINT "PK_c588f8ecebd5458ebccb22cbba1" PRIMARY KEY ("usersId", "genresId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f0cbb7657af9ca796fb4a29024" ON "users_genres_genres" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_77275ad816ec68eaa54578f358" ON "users_genres_genres" ("genresId") `);
        await queryRunner.query(`CREATE TABLE "users_fav_movies_fav-movies" ("usersId" integer NOT NULL, "favMoviesId" integer NOT NULL, CONSTRAINT "PK_f3f40063e44e8d7827c0232556b" PRIMARY KEY ("usersId", "favMoviesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fc9d58f0435e89e6a048ffac6a" ON "users_fav_movies_fav-movies" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_10b3651f82fac838a0738105fe" ON "users_fav_movies_fav-movies" ("favMoviesId") `);
        await queryRunner.query(`CREATE TABLE "fav-movies_users_users" ("favMoviesId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_2f83676a7b90fa3af98497b44fa" PRIMARY KEY ("favMoviesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f53b3e501dcb0a79f0392166de" ON "fav-movies_users_users" ("favMoviesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_988abbf0bd4c780cbfc10ef3f4" ON "fav-movies_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "genres" DROP COLUMN "genre_id"`);
        await queryRunner.query(`ALTER TABLE "genres" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "genres" ADD "genreId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "genres" ADD "createDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "genres_users_users" ADD CONSTRAINT "FK_3cc9436d4b53051af926b32a636" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "genres_users_users" ADD CONSTRAINT "FK_2a524fa51d1e2926ae993bb4d1b" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_genres_genres" ADD CONSTRAINT "FK_f0cbb7657af9ca796fb4a290241" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_genres_genres" ADD CONSTRAINT "FK_77275ad816ec68eaa54578f3583" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_fav_movies_fav-movies" ADD CONSTRAINT "FK_fc9d58f0435e89e6a048ffac6a3" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_fav_movies_fav-movies" ADD CONSTRAINT "FK_10b3651f82fac838a0738105fed" FOREIGN KEY ("favMoviesId") REFERENCES "fav-movies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "fav-movies_users_users" ADD CONSTRAINT "FK_f53b3e501dcb0a79f0392166de3" FOREIGN KEY ("favMoviesId") REFERENCES "fav-movies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "fav-movies_users_users" ADD CONSTRAINT "FK_988abbf0bd4c780cbfc10ef3f43" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fav-movies_users_users" DROP CONSTRAINT "FK_988abbf0bd4c780cbfc10ef3f43"`);
        await queryRunner.query(`ALTER TABLE "fav-movies_users_users" DROP CONSTRAINT "FK_f53b3e501dcb0a79f0392166de3"`);
        await queryRunner.query(`ALTER TABLE "users_fav_movies_fav-movies" DROP CONSTRAINT "FK_10b3651f82fac838a0738105fed"`);
        await queryRunner.query(`ALTER TABLE "users_fav_movies_fav-movies" DROP CONSTRAINT "FK_fc9d58f0435e89e6a048ffac6a3"`);
        await queryRunner.query(`ALTER TABLE "users_genres_genres" DROP CONSTRAINT "FK_77275ad816ec68eaa54578f3583"`);
        await queryRunner.query(`ALTER TABLE "users_genres_genres" DROP CONSTRAINT "FK_f0cbb7657af9ca796fb4a290241"`);
        await queryRunner.query(`ALTER TABLE "genres_users_users" DROP CONSTRAINT "FK_2a524fa51d1e2926ae993bb4d1b"`);
        await queryRunner.query(`ALTER TABLE "genres_users_users" DROP CONSTRAINT "FK_3cc9436d4b53051af926b32a636"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createDate"`);
        await queryRunner.query(`ALTER TABLE "genres" DROP COLUMN "createDate"`);
        await queryRunner.query(`ALTER TABLE "genres" DROP COLUMN "genreId"`);
        await queryRunner.query(`ALTER TABLE "genres" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "genres" ADD "genre_id" integer NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_988abbf0bd4c780cbfc10ef3f4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f53b3e501dcb0a79f0392166de"`);
        await queryRunner.query(`DROP TABLE "fav-movies_users_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_10b3651f82fac838a0738105fe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fc9d58f0435e89e6a048ffac6a"`);
        await queryRunner.query(`DROP TABLE "users_fav_movies_fav-movies"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_77275ad816ec68eaa54578f358"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f0cbb7657af9ca796fb4a29024"`);
        await queryRunner.query(`DROP TABLE "users_genres_genres"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2a524fa51d1e2926ae993bb4d1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3cc9436d4b53051af926b32a63"`);
        await queryRunner.query(`DROP TABLE "genres_users_users"`);
        await queryRunner.query(`DROP TABLE "fav-movies"`);
        await queryRunner.query(`ALTER TABLE "genres" ADD CONSTRAINT "FK_6059f3a850eb464a1a0b7b70bb1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
