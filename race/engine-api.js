export class EngineManager {
    constructor(uri, carCache) {
        this.uri = uri;
        this.carCache = carCache;
    }

    async startEngineAsync(carId) {
        const car = this.carCache.get(carId);
        if (!car) return;

        const response = await fetch(`${this.uri}/engine?id=${carId}&status=started`, {
            method: 'PATCH'
        });
        const json = await response.json();

        car.status = 'started';
        car.velocity = json.velocity;
        car.distance = json.distance;

        console.log('Started engine, velocity', carId, car.velocity);
    }

    async stopEngineAsync(carId) {
        const car = this.carCache.get(carId);
        if (!car) return;

        await fetch(`${this.uri}/engine?id=${carId}&status=stopped`, {
            method: 'PATCH'
        });

        car.status = 'stopped';

        console.log('Stopped engine', carId);
    }

    async driveAsync(carId) {
        const car = this.carCache.get(carId);
        if (!car) return;

        const response = await fetch(`${this.uri}/engine?id=${carId}&status=drive`, {
            method: 'PATCH'
        });

        if (response.status === 200) {
            console.log('Finished driving', car.id);
            return car;
        } else {
            console.log('Engine died', car.id);
            throw new Error('Engine died');
        }
    }
}
