import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { QueryExpressionMap } from "typeorm/query-builder/QueryExpressionMap";

export class SurveysStudents1617813737979 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'SurveysStudent',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'student_id',
                    type: 'uuid',
                },
                {
                    name: 'survey_id',
                    type: 'uuid',
                },
                {
                    name: 'value',
                    type: 'number',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
            foreignKeys:[
                {
                    name:'FKStudent',
                    referencedTableName: 'Student',
                    referencedColumnNames: ['id'],
                    columnNames: ['student_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                {
                    name:'FKSurvey',
                    referencedTableName: 'Survey',
                    referencedColumnNames: ['id'],
                    columnNames: ['survey_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('SurveysStudent')
    }

}
