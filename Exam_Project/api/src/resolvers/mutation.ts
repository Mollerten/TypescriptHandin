import { Context, Args, Pet, Owner, Comment, Blogpost, Login } from '../types';
import PetModel from '../models/petModel';
import OwnerModel from '../models/ownerModel';
import BlogpostModel from '../models/blogpostModel';
import CommentModel from '../models/commentModel';
// @ts-ignore
import bcrypt from 'bcrypt';
import {comparePassword} from "../utility/comparePassword";
// @ts-ignore
import jwt from 'jsonwebtoken';

export default {
    createPet: async (_parent: never, { input }: Args, { pets }: Context) => {
        if ('species' in input) {
            try {
                const newPet = await PetModel.create(input);
                return newPet;
            } catch (error) {
                throw new Error('Failed to create pet');
            }
        } else {
            return null;
        }
    },

    createOwner: async (_parent: never, { input }: Args, { owners }: Context) => {
        if ('email' in input && 'name' in input && 'age' in input && 'password' in input) {
            try {
                const { email, name, age, password } = input;

                // Hash the password using bcrypt
                const hashedPassword = await bcrypt.hash(password, 10);

                // Create a new owner with the hashed password
                const newOwner = await OwnerModel.create({
                    name,
                    age,
                    email,
                    password: hashedPassword,
                });

                return newOwner;
            } catch (error) {
                throw new Error('Failed to create owner');
            }
        } else {
            return null;
        }
    },

    createBlogpost: async (_parent: never, { input }: Args, { blogposts }: Context) => {
        if ('imageurl' in input) {
            try {
                const newBlogpost = await BlogpostModel.create(input);
                return newBlogpost;
            } catch (error) {
                throw new Error('Failed to create blogpost');
            }
        } else {
            return null;
        }
    },

    createComment: async (_parent: never, { input }: Args, { comments }: Context) => {
        if ('blogpostId' in input) {
            try {
                const newComment = await CommentModel.create(input);
                return newComment;
            } catch (error) {
                throw new Error('Failed to create comment');
            }
        } else {
            return null;
        }
    },

    updateOwner: async (_parent: never, { id, input }: Args, { owners }: Context) => {
        try {
            const updatedOwner = await OwnerModel.findByIdAndUpdate(id, input, { new: true });
            return updatedOwner;
        } catch (error) {
            throw new Error('Failed to update owner');
        }
    },

    updatePet: async (_parent: never, { id, input }: Args, { pets }: Context) => {
        try {
            const updatedPet = await PetModel.findByIdAndUpdate(id, input, { new: true });
            return updatedPet;
        } catch (error) {
            throw new Error('Failed to update pet');
        }
    },

    updateBlogpost: async (_parent: never, { id, input }: Args, { blogposts }: Context) => {
        try {
            const updatedBlogpost = await BlogpostModel.findByIdAndUpdate(id, input, { new: true });
            return updatedBlogpost;
        } catch (error) {
            throw new Error('Failed to update blogpost');
        }
    },

    updateComment: async (_parent: never, { id, input }: Args, { comments }: Context) => {
        try {
            const updatedComment = await CommentModel.findByIdAndUpdate(id, input, { new: true });
            return updatedComment;
        } catch (error) {
            throw new Error('Failed to update comment');
        }
    },

    deleteOwner: async (_parent: never, { id }: Args, { owners }: Context) => {
        try {
            await OwnerModel.findByIdAndDelete(id);
            return true;
        } catch (error) {
            throw new Error('Failed to delete owner');
        }
    },

    deletePet: async (_parent: never, { id }: Args, { pets }: Context) => {
        try {
            await PetModel.findByIdAndDelete(id);
            return true;
        } catch (error) {
            throw new Error('Failed to delete pet');
        }
    },

    deleteBlogpost: async (_parent: never, { id }: Args, { blogposts }: Context) => {
        try {
            await BlogpostModel.findByIdAndDelete(id);
            return true;
        } catch (error) {
            throw new Error('Failed to delete blogpost');
        }
    },

    deleteComment: async (_parent: never, { id }: Args, { comments }: Context) => {
        try {
            await CommentModel.findByIdAndDelete(id);
            return true;
        } catch (error) {
            throw new Error('Failed to delete comment');
        }
    },

    login: async (_parent: never, { input }: Args, { owners }: Context) => {
        const secretKey = process.env.JWT_SECRET_KEY || 'default-secret-key';

        if ('email' in input && 'password' in input) {
            const { email, password } = input;

            try {
                const owner: Owner | null = await OwnerModel.findOne({ email });

                if (owner && (await comparePassword(password, owner.password))) {
                    // Generate JWT token
                    const token = jwt.sign({ ownerId: owner.id }, secretKey, {
                        expiresIn: '1h',
                    });

                    return {
                        success: true,
                        message: 'Login successful',
                        token: token,
                    };
                } else {
                    return {
                        success: false,
                        message: 'Invalid email or password',
                        token: null,
                    };
                }
            } catch (error) {
                throw new Error('Failed to login');
            }
        } else {
            return {
                success: false,
                message: 'Invalid input',
                token: null,
            };
        }
    },
};
