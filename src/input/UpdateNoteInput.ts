import { IsInt, Length, MaxLength } from "class-validator";
import { Note } from "../entities/Note";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateNoteInput implements Partial<Note> {
    @Field({ nullable: true })
    @MaxLength(50)
    title?: string

    @Field({ nullable: true })
    @Length(50, 1000)
    body?: string

    @Field({ nullable: true })
    @IsInt()
    userId?: number
}