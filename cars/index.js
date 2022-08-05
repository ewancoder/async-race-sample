import { CarRepository } from './car-repository.js';
import { CachedCarRepository } from './cached-car-repository.js';

export { CarCache } from './car-cache.js';

export function carRepositoryFactory(uri, carCache) {
    const repo = new CarRepository(uri);
    const cachedRepo = new CachedCarRepository(repo, carCache);

    return cachedRepo;
}
