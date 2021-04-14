import { truncate } from "fs";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class StudentSubject1617814853634 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'StudentSubject',
            columns:[
                {
                    name:'id',
                    type:'uuid',
                    isPrimary: true,
                },
                {
                    name:'student_id',
                    type: 'uuid'
                },
                {
                    name:'subject_id',
                    type:'uuid'
                },
                {
                    name:'created_at',
                    type:'timestamp',
                    default:'now()'
                },
            ],
            foreignKeys:[
                {
                    name:'FKStudent',
                    referencedColumnNames: ['id'],
                    referencedTableName: 'Student',
                    columnNames: ['student_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                },
                {
                    name:'FKSubject',
                    referencedColumnNames: ['id'],
                    referencedTableName: 'Subject',
                    columnNames: ['subject_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('StudentSubject')
    }

}
