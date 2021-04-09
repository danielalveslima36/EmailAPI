import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Surveys1617812564419 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Survey',
            columns:[
                {
                    name:'id',
                    type:'uuid',
                    isPrimary: true,
                },
                {
                    name:'title',
                    type:'varchar',
                },
                {
                    name:'description',
                    type:'varchar'
                },
                {
                    name:'created_id',
                    type:'timestamp',
                    default:'now()',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Survey')
    }

}
