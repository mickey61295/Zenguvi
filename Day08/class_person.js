class Person {
    constructor(name, age, interests, job) {
        this.name = name;
        this.age = age;
        this.interests = interests;
        this.job = job;
    }
    getName() {
        return this.name;
    }
    getAge() {
        return this.age;
    }
    getInterests() {
        return this.interests;
    }
    getJob() {
        return this.job;
    }
}

person1 = new Person("John", 30, ["sports", "cooking"], "teacher");