type Pet = {
    id: string;
    name: string;
    species: string;
    age: number;
    ownerId: string;
};

type Owner = {
    id: string;
    name: string;
    age: number;
    email: string;
    password: string;
};

type Blogpost = {
    id: string;
    title: string;
    content: string;
    ownerId: string;
    imageurl: string;
};

type Comment = {
    id: string;
    content: string;
    blogpostId: string;
    ownerId: string;
};


type Context = {
    pets: Pet[];
    owners: Owner[];
    blogposts: Blogpost[];
    comments: Comment[];
};

type Login = {
    email: string;
    password: string;
}

type Args = {
    id: string;

    input: Owner | Pet | Comment | Blogpost | Login;
};

export type { Context, Args, Pet, Owner, Comment, Blogpost, Login};