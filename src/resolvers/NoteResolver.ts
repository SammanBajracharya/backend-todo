import { CreateNoteInput } from "../input/CreateNoteInput";
import { UpdateNoteInput } from "../input/UpdateNoteInput";
import { Note } from "../entities/Note";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";

@Resolver(Note)
export class NoteResolver {
    @Query(() => [Note])
    async notes(): Promise<Note[]> {
        return await Note.find({ 
            relations: {
                user : true
            } 
        });
    }

    @Query(() => Note)
    async note(@Arg("id", () => Int) id: number): Promise<Note | null> {
        const note = await Note.findOne({ 
            where: { id }, 
            relations: {
                user : true
            }  
        })
        if (!note) throw new Error("Note Not Found!!")
        return note
    }

    @Query(() => [Note])
    userNotes(@Arg("userId", () => Int) userId: number): Promise<Note[]> {
        return Note.findBy({ 
            user: { 
                id: userId 
            }
          })
    }

    @Mutation(() => Note)
    async createNote(@Arg("data", () => CreateNoteInput) data: CreateNoteInput): Promise<Note> {
        const user = await User.findOne({ where: { id: data.userId } })
        if (!user) throw new Error("User Not Found!!!")
        const createdNote = Note.create({
            ...data,
            user
        })
        await Note.save(createdNote)
        return createdNote
    }

    @Mutation(() => Note)
    async updateNote(
        @Arg("noteId", () => Int) noteId: number, 
        @Arg("updatedData", () => UpdateNoteInput) updatedData: UpdateNoteInput
    ): Promise<Note> {
        const note = await Note.findOne({ where: { id: noteId } });
        if (!note) throw new Error("Note Not Found!!!");

        const user = await User.findOne({ where: { id: updatedData.userId } });
        if (!user) throw new Error("User Not Found!!!");

        Object.assign(note, updatedData, { user });
        await note.save();
        return note;
    }

    @Mutation(() => Boolean)
    async deleteNote(@Arg("noteId", () => Int) noteId: number): Promise<Boolean> {
        const note = await Note.findOne({ where: { id: noteId } })
        if (!note) throw new Error("Note Not Found!!!")
        await note.remove()
        return true
    }
}