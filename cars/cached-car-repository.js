/* Decorator pattern around CarRepository */
export class CachedCarRepository {
    constructor(carRepository, carCache) {
        this.carRepository = carRepository;
        this.carCache = carCache;
    }

    async getAllAsync() {
        let allCars = this.carCache.getAll();
        if (allCars.length > 0) {
            return allCars;
        }

        allCars = await this.carRepository.getAllAsync();
        this.carCache.save(allCars);
        return allCars;
    }

    async getAsync(carId) {
        const existingCar = this.carCache.get(carId);
        if (existingCar) {
            return existingCar;
        }

        const car = this.carRepository.getAsync(carId);
        if (!car) {
            return null;
        }

        this.carCache.save(car);
        return car;
    }

    async saveAsync(car) {
        await this.carRepository.saveAsync(car);
        this.carCache.save(car);
    }

    async deleteAsync(carId) {
        await this.carRepository.deleteAsync(carId);
        this.carCache.delete(carId);
    }
}
