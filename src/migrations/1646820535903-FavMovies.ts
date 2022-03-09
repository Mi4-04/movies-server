import {MigrationInterface, QueryRunner} from "typeorm";

export class FavMovies1646820535903 implements MigrationInterface {
    name = 'FavMovies1646820535903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fav-movies" RENAME COLUMN "moviesId" TO "movieId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fav-movies" RENAME COLUMN "movieId" TO "moviesId"`);
    }

}
