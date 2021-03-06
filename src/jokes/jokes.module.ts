import { Module } from '@nestjs/common';
import { JokesResolver } from './jokes.resolver';
import { JokesService } from './jokes.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [HttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [JokesResolver, JokesService]
})
export class JokesModule {}
