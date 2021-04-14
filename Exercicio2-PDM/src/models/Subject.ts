import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid} from 'uuid';

@Entity('Subject')
class Subject {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    workload: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export {Subject}