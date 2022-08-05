export class Race {
    constructor(engineManager) {
        this.engineManager = engineManager;
    }

    async performRaceAsync(carsIds) {
        if (!Array.isArray(carsIds)) {
            carsIds = [ carsIds ];
        }

        console.log('Racing with', carsIds);

        // Step 1. Turn the engines on.
        await Promise.all(carsIds.map(carId => this.engineManager.startEngineAsync(carId)));

        // Step 2. Start driving.
        const winner = await Promise.any(carsIds.map(carId => this.engineManager.driveAsync(carId)));

        // TODO: Handle the winner.
        console.log('Winner', winner);

        // Step 3. Turn off all engines.
        await Promise.all(carsIds.map(carId => this.engineManager.driveAsync(carId.id)));
    }
}