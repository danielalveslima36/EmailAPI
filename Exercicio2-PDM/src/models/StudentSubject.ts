import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Subject } from "./Subject";
import { Student } from "./Student";
import {v4 as uuid} from 'uuid';

@Entity('StudentSubject')
class StudentSubject {
    @PrimaryColumn()
    readonly id: string;

    @ManyToOne(() => Student)
    @JoinColumn({name: 'student_id'}) 
    student: Student;

    @ManyToOne(() => Subject)
    @JoinColumn({name: 'subject_id'})
    subject: Subject;

    @Column()
    student_id: string;

    @Column()
    subject_id: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export {StudentSubject}