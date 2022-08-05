export class CarCache {
    constructor() {
        this.cars = [];
    }

    getAll() {
        return this.cars;
    }

    get(carId) {
        return this.cars.find(car => car.id === carId);
    }

    save(car) {
        if (Array.isArray(car)) {
            if (this.cars.length > 0) throw new Error('Can initialize cars cache only once.');
            this.cars = car;
            return;
        }

        const existingIndex = this.cars.findIndex(c => c.id === car.id);
        if (existingIndex > -1) {
            Object.assign(this.cars[existingIndex], car);
        } else {
            this.cars.push(car);
        }
    }

    delete(carId) {
        const existing = this.cars.findIndex(c => c.id === carId);
        if (existing > -1) {
            this.cars.splice(existing, 1);
        }
    }
}
