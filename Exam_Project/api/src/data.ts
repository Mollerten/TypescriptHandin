const pets = [
  {
    id: '1',
    name: 'Fido',
    species: 'Dog',
    age: 2,
    ownerId: '1',
  },
  {
    id: '2',
    name: 'Fifi',
    species: 'Cat',
    age: 1,
    ownerId: '2',
  },
  {
    id: '3',
    name: 'Goldie',
    species: 'Fish',
    age: 3,
    ownerId: '1',
  }
];

const owners = [
    {
        id: '1',
        name: 'John',
        age: 30,
        email: 'john@gmail.com',
        password: '123456'

    },
    {
        id: '2',
        name: 'Jane',
        age: 28,
        email: 'jane@gmail.com',
        password: '123456'
    }
];

const blogposts = [
    {
        id: '1',
        title: 'My first blogpost',
        content: 'This is my first blogpost',
        ownerId: '1',
    },
    {
        id: '2',
        title: 'My second blogpost',
        content: 'This is my second blogpost',
        ownerId: '2',
    }
]

const comments = [
    {
        id: '1',
        content: 'This is my first comment',
        blogpostId: '1',
        ownerId: '1',
    },
    {
        id: '2',
        content: 'This is my second comment',
        blogpostId: '1',
        ownerId: '2',
    }
]

export {
    pets,
    owners,
    blogposts,
    comments
};

