import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from 'typeorm';

@Entity()
export default class TodoEntity {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public text!: string;
    @Column()
    public isDone!: boolean;
}
