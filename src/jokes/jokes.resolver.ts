import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Joke } from './models/joke.model';
import { JokesService } from './jokes.service';

@Resolver()
export class JokesResolver {
    constructor(private jokesService: JokesService) {}

    @Query(returns => Joke, {name: 'jokeByCategory', description: 'Returns a joke belonging to a specific category'})
    async getJokeByCategory(@Args('category') category: string) {
        let result = await this.jokesService.getJokeByCategory(category);

        return result;
    }
    
    @Query(returns => [Joke], {name: 'jokesByKeyword', description: 'Search for jokes by keyword'})
    async getJokesByKeyword(@Args('keyword') keyword: string) {
        let result: Joke[] = await this.jokesService.getJokesByKeyword(keyword);

        return result;
    }

    @Query(returns => [Joke], {name: 'jokes', description: 'Random jokes (you need to specify the number of jokes)'})
    async getCats(@Args('number') num: number) {
        let result: Joke[] = [];

        for(let i = 0; i < num; i++)
            result.push(await this.jokesService.getRandomJoke())

        return result;
    }

    @Query(returns => Joke, {name: 'joke', description: 'Get random joke'})
    async getJoke() {
        let result = await this.jokesService.getRandomJoke();

        return result;
    }

    @Query(returns => [String], {name: 'categories', description: 'Get all categories'})
    async getCategories() {
        let result = await this.jokesService.getCategories();

        return result;
    }

    @Mutation(returns => String, {name: 'add', description: 'Add joke to DB (you need to specify id of joke and username)'})
    async addJoke(@Args({ name: 'username'}) username: string, @Args({ name: 'jokeId'}) jokeId: string) {
        return this.jokesService.saveToDB(username, jokeId);
    }

    @Query(returns => [Joke], {name: 'savedJokes', description: 'Get your saved jokes (you need to specify your username)'})
    async getSavedJokes(@Args('username') username: string) {  
        return this.jokesService.getSavedJokes(username);
    }
}
