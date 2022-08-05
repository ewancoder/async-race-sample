export class CarRepository {
    constructor(uri) {
        this.uri = uri;
    }

    async getAllAsync() {
        const response = await fetch(`${this.uri}/garage`);
        const json = await response.json();

        return json;
    }

    async getAsync(carId) {
        const response = await fetch(`${this.uri}/garage/${carId}`);

        if (response.status !== 200) {
            return null;
        }

        return await response.json();
    }

    async saveAsync(car) {
        const exists = await this.getAsync(car.id);
        const body = JSON.stringify(car);

        if (!exists) {
            const response = await fetch(`${this.uri}/garage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });
            const json = await response.json();
            car.id = json.id;
            return;
        }

        await fetch(`${this.uri}/garage/${car.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        });
    }

    async deleteAsync(carId) {
        await fetch(`${this.uri}/garage/${carId}`, {
            method: 'DELETE'
        });
    }
}
