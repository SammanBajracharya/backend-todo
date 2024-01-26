import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { User } from "./User";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Note extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => Date, { defaultValue: new Date()})
    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt = new Date()

    @Field(() => Date, { defaultValue: new Date()})
    @UpdateDateColumn()
    updatedAt = new Date()

    @Field()
    @Column()
    title: string

    @Field()
    @Column()
    body: string

    @Field(() => User)
    @ManyToOne(() => User, user => user.notes)
    @JoinColumn({ name: "userId" })
    user: User
}