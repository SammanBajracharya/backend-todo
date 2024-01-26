import { IsInt, IsNotEmpty, Length, MaxLength } from "class-validator";
import { Note } from "../entities/Note";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateNoteInput implements Partial<Note> {
    @Field()
    @MaxLength(50)
    title: string

    @Field()
    @Length(50, 1000)
    body: string

    @Field({ nullable: false })
    @IsInt()
    @IsNotEmpty()
    userId: number
}