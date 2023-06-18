type Person = {
    id: string;
    name: string;
    email: string;
    age: number;
    phone: string;
    address: Address;
    imageUrl: string;
};

type Address = {
    id: string;
    street: string;
    city: string;
};


export type {Person, Address }