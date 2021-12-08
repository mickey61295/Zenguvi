class UberPrice {
    constructor(distance, time) {
        this.distance = distance;
        this.time = time;
    }
    calculatePrice() {
        console.log(`Price for riding ${this.distance} for ${this.time} is `,this.distance * 0.25 + this.time * 0.5);
    }
}


ride1 = new UberPrice(2, 30);
ride1.calculatePrice();
