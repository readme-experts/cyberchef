import { Injectable } from "@nestjs/common";

import { PrismaService } from '.././prisma.service';
import { UserRepository } from '../../database/repositories/user';

const prisma = new PrismaService();
const user = new UserRepository(prisma);

@Injectable()
export class UserService {
    async addUser(regData) {
            const newUser = await user.add(regData)
            return newUser
    }
    async findUser(username) {
        const specificUser = await user.find(username)
        return specificUser
    }

    async addRecipe(recipeData) {
        const userFavRecipe = await user.addRecipe(recipeData)
        return userFavRecipe
    }

    async getRecipes(recipeData) {
        const userFavRecipes = await user.findRecipes(recipeData)
        return userFavRecipes
    }

    async deleteRecipe(recipeData) {
        const deleteRecipe = await user.deleteRecipe(recipeData)
        return deleteRecipe
    }
}