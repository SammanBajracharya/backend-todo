import { CreateUserInput } from "../input/CreateUserInput";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { Note } from "../entities/Note";

@Resolver(User)
export class UserResolver {
    @Query(() => [User])
    users() {
        return User.find({ 
            relations: { 
                notes: true 
            }  
        })
    }

    @Query(() => User)
    user(@Arg("id", () => Int) id: number) {
        return User.findOne({ 
            where: { id }, 
            relations: { 
                notes: true 
            } 
        })
    }

    @Mutation(() => User)   
    async createUser(@Arg("data", () => CreateUserInput) data: CreateUserInput): Promise<User> {
        const user = User.create({
            ...data
        });
        await user.save();
        return user;
    }

    @Mutation(() => User)
    async updateUser(
        @Arg("userId", () => Int) userId: number, 
        @Arg("updatedData", () => CreateUserInput) updatedData: CreateUserInput
    ): Promise<User> {
        const user = await User.findOne({ where: { id: userId } })
        if (!user) throw new Error("User not found!")

        const notes = await Note.find({ where: { user: { id: userId } } })
        
        Object.assign(user, updatedData, { notes })
        await user.save()
        return user
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg("id", () => Int) id: number): Promise<Boolean> {
        const user = await User.findOne({ where: { id } })
        if (!user) throw new Error("User not found!")
        await user.remove()
        return true
    }
}