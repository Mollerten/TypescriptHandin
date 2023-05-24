// import { books, categories } from '../data';
import {Args, Context, Owner, Pet} from '../types';
export default {

    owner: (parent:Pet, _args:never, context:Context) =>
        context.owners.find((owner) => owner.id === parent.ownerId),


}