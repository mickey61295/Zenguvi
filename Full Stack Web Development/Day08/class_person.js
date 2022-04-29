class Person {
    constructor(name, age, interests, job) {
        this.name = name;
        this.age = age;
        this.interests = interests;
        this.job = job;
    }
    getName() {
        console.log('Name: ', this.name);
    }
    getAge() {
        console.log('Age: ', this.age);
    }
    getInterests() {
        console.log('Interests: ', this.interests);
    }
    getJob() {
        console.log('Job: ', this.job);
    }
}

person1 = new Person("John", 30, ["sports", "cooking"], "teacher");
person1.getName();
person1.getAge();
person1.getInterests();
person1.getJob();