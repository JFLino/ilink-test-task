import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { firstValueFrom } from 'rxjs';
import { Joke } from './models/joke.model';
import { User, UserDocument } from './schemas/user.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JokesService {
    constructor(private httpService: HttpService,
        private configService: ConfigService,
        @InjectModel(User.name) private userModel: Model<UserDocument>) {}

    getRandomJoke(): Promise<Joke>{
        let url = this.configService.get("API_RANDOM_JOKE");
        return firstValueFrom(this.httpService.get(url)).then(response=>response.data);
    }

    getJokesByKeyword(keyword: string): Promise<Joke[]>{
        let url = this.configService.get("API_JOKES_BY_KEYWORD");
        return firstValueFrom(this.httpService.get(url + keyword)).then(response=>response.data.result);
    }

    getJokeByCategory(category: string): Promise<Joke>{
        let url = this.configService.get("API_JOKE_BY_CATEGORY");
        return firstValueFrom(this.httpService.get(url + category)).then(response=>response.data);
    }

    getCategories(): Promise<string[]>{
        let url = this.configService.get("API_GET_ALL_CATEGORIES");
        return firstValueFrom(this.httpService.get(url)).then(response=>response.data);
    }

    async saveToDB(username: string, jokeId: string): Promise<string>{
        let result = '';
        let candidate = await this.userModel.findOne({username});
        if(candidate){
            if(!candidate.jokes.includes(jokeId)){
                candidate.jokes.push(jokeId);
                await candidate.save();
                result = "Joke added";
            }else result = "You already have added this joke";
        }else{
            let newUser = new this.userModel({username, jokes: [jokeId]});
            await newUser.save();
            result = "New user created and joke added";
        }
       
        return result;
    }

    async getSavedJokes(username: string): Promise<Joke[]>{
        let result: Joke[] = [];
        let candidate = await this.userModel.findOne({username});

        if(candidate && candidate.jokes){
            let url = this.configService.get("API_JOKE_BY_ID");
            
            for(let id of candidate.jokes){
                try{
                    let joke = await firstValueFrom(this.httpService.get(url + id)).then(response=>response.data);
                    result.push(joke);
                }catch(e){
                    console.log("Invalid value of jokeId!");
                }
            }
        }
        
        return result;
    }

}
