import {Column, CreateDateColumn, Entity, PrimaryColumn} from 'typeorm';
import {v4 as uuid} from 'uuid'
@Entity('Student')
class Student {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    password: string

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export {Student}