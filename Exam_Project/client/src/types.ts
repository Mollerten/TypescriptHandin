  type Owner = {
    id: string;
    name: string;
    age: number;
    pets: Pet[];
    comments: Comment[];
    blogposts: Blogpost[];
    email: string;
    password: string;
  }

  type Pet = {
    id: string;
    name: string;
    species: string;
    age: number;
    owner: Owner;
  }
  type Blogpost = {
    id: string;
    title: string;
    content: string;
    owner: Owner;
    comments: Comment[];
    imageurl: string;
  }
  type Comment = {
    id: string;
    content: string;
    blogpost: Blogpost;
    owner: Owner;
  }
export type {Pet, Owner, Blogpost, Comment}