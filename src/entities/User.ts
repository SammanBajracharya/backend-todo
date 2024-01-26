import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Note } from "./Note";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => Date, { defaultValue: new Date()})
    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt = new Date()

    @Field()
    @Column({ nullable: false })
    username: string

    @Field(() => [Note])
    @OneToMany(() => Note, note => note.user)
    notes: Note[];
}