import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Joke {

  @Field(type=>[String])
  categories: [String];

  @Field()
  created_at: string;

  @Field()
  icon_url: string;

  @Field()
  id: string;

  @Field()
  updated_at: string;

  @Field()
  url: string;

  @Field()
  value: string;
}