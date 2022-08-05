import { carRepositoryFactory, CarCache } from './cars/index.js';
import { EngineManager, Race } from './race/index.js';

const main = document.getElementById('main');

const raceState = {
    cars: []
};

const carCache = new CarCache();
const repo = carRepositoryFactory('http://localhost:3000', carCache);
const engineManager = new EngineManager('http://localhost:3000', carCache);
const race = new Race(engineManager);

console.log(await repo.getAllAsync());
console.log(await repo.getAsync(2));
await repo.saveAsync({
    id: 2,
    name: 'name',
    color: 'color'
});
await repo.saveAsync({
    id: 10,
    name: 'name 2',
    color: 'color 2'
});

await race.performRaceAsync([1, 2, 3]);
