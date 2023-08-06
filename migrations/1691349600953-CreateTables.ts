import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1691349600953 implements MigrationInterface {
    name = 'CreateTables1691349600953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fav_artists" ("id" SERIAL NOT NULL, "artistId" uuid NOT NULL, "userId" uuid, CONSTRAINT "UQ_35f499a7b3985a3f5d380e10345" UNIQUE ("artistId", "userId"), CONSTRAINT "PK_e57499b114b13031b5a5ac8f95c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fav_albums" ("id" SERIAL NOT NULL, "albumId" uuid NOT NULL, "userId" uuid, CONSTRAINT "UQ_9598152cda3b71b830f8e4806e9" UNIQUE ("albumId", "userId"), CONSTRAINT "PK_6c77bca2014469e107d68d25187" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fav_tracks" ("id" SERIAL NOT NULL, "trackId" uuid NOT NULL, "userId" uuid, CONSTRAINT "UQ_744ca07255c7bdc1dfef6b46b84" UNIQUE ("trackId", "userId"), CONSTRAINT "PK_5288c864aa552bb91690d9c4297" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fav_artists" ADD CONSTRAINT "FK_21e66697c43b6d290c5399b2ed9" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fav_artists" ADD CONSTRAINT "FK_17844fcab01eb6575089844ab18" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fav_albums" ADD CONSTRAINT "FK_ac4dea5b76301b78dff5694082c" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fav_albums" ADD CONSTRAINT "FK_3141e2da97239ef37dd1bf7039d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fav_tracks" ADD CONSTRAINT "FK_f4cb2de72e74ece6f47487b40e6" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fav_tracks" ADD CONSTRAINT "FK_81de804985f76d9787dca89220f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fav_tracks" DROP CONSTRAINT "FK_81de804985f76d9787dca89220f"`);
        await queryRunner.query(`ALTER TABLE "fav_tracks" DROP CONSTRAINT "FK_f4cb2de72e74ece6f47487b40e6"`);
        await queryRunner.query(`ALTER TABLE "fav_albums" DROP CONSTRAINT "FK_3141e2da97239ef37dd1bf7039d"`);
        await queryRunner.query(`ALTER TABLE "fav_albums" DROP CONSTRAINT "FK_ac4dea5b76301b78dff5694082c"`);
        await queryRunner.query(`ALTER TABLE "fav_artists" DROP CONSTRAINT "FK_17844fcab01eb6575089844ab18"`);
        await queryRunner.query(`ALTER TABLE "fav_artists" DROP CONSTRAINT "FK_21e66697c43b6d290c5399b2ed9"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`DROP TABLE "fav_tracks"`);
        await queryRunner.query(`DROP TABLE "fav_albums"`);
        await queryRunner.query(`DROP TABLE "fav_artists"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "artist"`);
    }

}
