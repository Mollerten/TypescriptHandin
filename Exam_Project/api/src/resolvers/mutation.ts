import { Context, Args, Login } from '../types';
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Pet from '../models/petModel';
import Owner from '../models/ownerModel';
import Blogpost from '../models/blogpostModel';
import Comment from '../models/commentModel';
import dotenv from 'dotenv';


dotenv.config({ path: './config.env' });






export default {


    createPet: async (_parent: never, { input }: Args, { pets }: Context) => {
        if ('species' in input) {
            try {
                const { name, species, age, ownerId } = input;
                const owner = await Owner.findById(ownerId).populate('pets');
                const imageUrl = "https://cataas.com/cat";

                if (!owner) {
                    throw new Error('Owner not found');
                }

                const newPet = await Pet.create({
                    name,
                    species,
                    age,
                    imageUrl,
                    owner
                });

                // TODO: find a solution so we don't have to use @ts-ignore
                // @ts-ignore
                owner.pets.push(newPet);
                await owner.save();

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

                // Hash the password
                const hashedPassword = await bcrypt.hash(password, 10);

                // TODO: replace this with an image upload
                const imageUrl = `https://robohash.org/${name}.png`;

                // Create a new owner with the hashed password
                const newOwner = await Owner.create({
                    name,
                    age,
                    email,
                    password: hashedPassword,
                    imageUrl
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
        if ('title' in input && 'content' in input) {
            try {
                const { title, content, ownerId } = input;
                const owner = await Owner.findById(ownerId).populate('blogposts');

                if (!owner) {
                    throw new Error('Owner not found');
                }

                // TODO: replace this with an image upload
                const imageurl = "https://cataas.com/cat";


                const blogpost = await Blogpost.create({
                    title,
                    content,
                    owner,
                    imageurl

                });

                // @ts-ignore
                owner.blogposts.push(blogpost);
                await owner.save();

               return blogpost;

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
                const { content, blogpostId, ownerId } = input;

                const blogpost = await Blogpost.findById(blogpostId).populate('comments');
                const owner = await Owner.findById(ownerId).populate('comments');

                if (!owner) {
                    throw new Error('Owner not found');
                }
                if (!blogpost) {
                    throw new Error('Blogpost not found');
                }

                const comment = await Comment.create({
                    content,
                    blogpost,
                    owner
                });


                // @ts-ignore
                owner.comments.push(comment);
                await owner.save();
                // @ts-ignore
                blogpost.comments.push(comment);
                await blogpost.save();

                return comment;
            } catch (error) {
                throw new Error('Failed to create comment');
            }
        } else {
            return null;
        }
    },

    updateOwner: async (_parent: never, { id, input }: Args, { owners }: Context) => {
        try {
            const updatedOwner = await Owner.findByIdAndUpdate(id, input, { new: true });
            return updatedOwner;
        } catch (error) {
            throw new Error('Failed to update owner');
        }
    },

    updatePet: async (_parent: never, { id, input }: Args, { pets }: Context) => {
        try {
            const updatedPet = await Pet.findByIdAndUpdate(id, input, { new: true });
            return updatedPet;
        } catch (error) {
            throw new Error('Failed to update pet');
        }
    },

    updateBlogpost: async (_parent: never, { id, input }: Args, { blogposts }: Context) => {
        try {
            const updatedBlogpost = await Blogpost.findByIdAndUpdate(id, input, { new: true });
            return updatedBlogpost;
        } catch (error) {
            throw new Error('Failed to update blogpost');
        }
    },

    updateComment: async (_parent: never, { id, input }: Args, { comments }: Context) => {
        try {
            const updatedComment = await Comment.findByIdAndUpdate(id, input, { new: true });
            return updatedComment;
        } catch (error) {
            throw new Error('Failed to update comment');
        }
    },

    deleteOwner: async (_parent: never, { id }: Args, { owners }: Context) => {
        try {
            await Owner.findByIdAndDelete(id);
            return true;
        } catch (error) {
            throw new Error('Failed to delete owner');
        }
    },

    deletePet: async (_parent: never, { id }: Args, { pets }: Context) => {
        try {
            await Pet.findByIdAndDelete(id);
            return true;
        } catch (error) {
            throw new Error('Failed to delete pet');
        }
    },

    deleteBlogpost: async (_parent: never, { id }: Args, { blogposts }: Context) => {
        try {
            const blogpost = await Blogpost.findById(id);

            if (!blogpost) {
                throw new Error('Blogpost not found');
            }

            const owner = await Owner.findOneAndUpdate(
                { _id: blogpost.owner },
                { $pull: { blogposts: blogpost._id } },
                { new: true }
            );

            if (!owner) {
                throw new Error('Owner not found');
            }

            await Comment.deleteMany({ blogpost: blogpost._id });

            await Blogpost.deleteOne({ _id: blogpost._id });

            return true;
        } catch (error) {
            throw new Error('Failed to delete blogpost');
        }
    },

    deleteComment: async (_parent: never, { id }: Args, { comments, blogposts }: Context) => {
        try {
            const comment = await Comment.findById(id);

            if (!comment) {
                throw new Error('Comment not found');
            }

            const blogpost = await Blogpost.findOneAndUpdate(
                { _id: comment.blogpost },
                { $pull: { comments: comment._id } },
                { new: true }
            );

            if (!blogpost) {
                throw new Error('Blogpost not found');
            }

            await Comment.deleteOne({ _id: comment._id });

            return true;
        } catch (error) {
            throw new Error('Failed to delete comment');
        }
    },


    login: async (_parent: never, { input }: Args, { login }: Context) => {

        if ('email' in input && 'password' in input) {
        try {
            const secret = process.env.JWT_SECRET;
            const expires = process.env.JWT_EXPIRES_IN;
            const { email, password } = input;

            // Fetch owner from the database based on the email
            const owner = await Owner.findOne({ email });
            if (!owner) {
                throw new Error('Invalid email');
            }

            // compare the password with the hashed password
            const isPasswordValid = await bcrypt.compare(password, owner.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            // shit works, don't remove below comment...
            // @ts-ignore
            const token = jwt.sign({ ownerId: owner._id }, secret, {
                expiresIn: expires,
            });

            return { success: true, token, message: 'Login successful' };

        } catch (error) {
            console.error(error);
            return { success: false, token: null, message: 'Invalid email or password' };

        }
        }
    },

    // login: async (_parent: never, { input }: Args, { owners }: Context) => {
    //     const secretKey = process.env.JWT_SECRET_KEY || 'default-secret-key';
    //
    //     if ('email' in input && 'password' in input) {
    //         const { email, password } = input;
    //
    //         try {
    //             const owner: typeof Owner | null = await Owner.findOne({ email });
    //
    //             if (owner && (await comparePassword(password, owner.password))) {
    //                 // Generate JWT token
    //                 const token = jwt.sign({ ownerId: owner.id }, secretKey, {
    //                     expiresIn: '1h',
    //                 });
    //
    //                 return {
    //                     success: true,
    //                     message: 'Login successful',
    //                     token: token,
    //                 };
    //             } else {
    //                 return {
    //                     success: false,
    //                     message: 'Invalid email or password',
    //                     token: null,
    //                 };
    //             }
    //         } catch (error) {
    //             throw new Error('Failed to login');
    //         }
    //     } else {
    //         return {
    //             success: false,
    //             message: 'Invalid input',
    //             token: null,
    //         };
    //     }
    // },
};
