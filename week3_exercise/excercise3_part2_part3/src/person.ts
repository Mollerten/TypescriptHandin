export class Person {
    name: string;
    age: number;
    occupation: string;
    private_salary: number;

    constructor(name: string, age: number, occupation: string, salary: number = 0) {
        this.name = name;
        this.age = age;
        this.occupation = occupation;
        this.private_salary = salary;
    }

    introduce(): string {
        return `Hello, my name is ${this.name} and I am a ${this.occupation}. I earn ${this.private_salary}$`;
    }

    incrementAge(): void {
        this.age++;
    }

    setSalary(salary: number): void {
        this.private_salary = salary;
    }

    getSalary(): number {
        return this.private_salary;
    }
}
