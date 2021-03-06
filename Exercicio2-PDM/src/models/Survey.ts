import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid} from 'uuid'

@Entity('Survey')
class Survey {
    
    @PrimaryColumn()
    readonly id: string;

    @Column()
    title: string;

    @Column()
    description: string

    @CreateDateColumn()
    created_id: Date

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export {Survey}