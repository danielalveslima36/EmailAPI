import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuid} from 'uuid';
import { Student } from "./Student";
import { Survey } from "./Survey";
@Entity('SurveysStudent')
class SurveyStudent {

    @PrimaryColumn()
    readonly id: string;

    @ManyToOne(() =>Student)
    @JoinColumn({name: 'student_id'})  
    student: Student
   

    @ManyToOne(() =>Survey)
    @JoinColumn({name: 'survey_id'})   
    survey: Survey

    @Column()
    student_id: string

    
    @Column()
    survey_id: string

    @Column()
    value: number

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if(!this.id){
            this.id = uuid()
        }
    }
}

export {SurveyStudent}