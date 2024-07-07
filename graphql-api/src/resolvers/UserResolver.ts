import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";

dotenv.config();
const { COOKIE_TTL, JWT_SECRET } = process.env;

@InputType()
class NewUserInput implements Partial<User> {
  @Field()
  mail: string;

  @Field()
  password: string;
}

function setCookie(ctx: any, key: string, value: string) {
  if (!COOKIE_TTL) throw new Error("Missing TTL conf key!");
  const myDate = new Date();
  const expiryTStamp = myDate.getTime() + Number(COOKIE_TTL);
  myDate.setTime(expiryTStamp);
  ctx.res.setHeader(
    "Set-Cookie",
    `${key}=${value};secure;httpOnly;SameSite=Strict;expires=${myDate.toUTCString()}`
  );
}
function getUserPublicProfile(user: User) {
  return {
    mail: user.mail,
    id: user.id,
    roles: user.roles,
  };
}
function getUserTokenContent(user: User) {
  return {
    id: user.id,
    roles: user.roles,
  };
}

@Resolver(User)
class UserResolver {
  @Query(() => [User])
  async getAllUsers() {
    return await User.find();
  }

  @Mutation(() => String)
  async login(@Arg("data") userData: NewUserInput, @Ctx() context: any) {
    try {
      if (!JWT_SECRET) throw new Error();
      const user = await User.findOneByOrFail({ mail: userData.mail });

      const isValid = await argon2.verify(
        user.hashedPassword,
        userData.password
      );
      if (!isValid) throw new Error();

      const token = jwt.sign(getUserTokenContent(user), JWT_SECRET);
      setCookie(context, "token", token);
      return JSON.stringify(getUserPublicProfile(user));
    } catch (err) {
      return err;
    }
  }

  @Mutation(() => String)
  async signup(@Arg("data") userData: NewUserInput, @Ctx() context: any) {
    try {
      if (!JWT_SECRET) throw new Error("Missing JWT secret env variable");

      const hashedPassword = await argon2.hash(userData.password);
      const user = await User.save({
        mail: userData.mail,
        hashedPassword,
      });
      const token = jwt.sign(getUserTokenContent(user), JWT_SECRET);
      setCookie(context, "token", token);
      return JSON.stringify(getUserPublicProfile(user));
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}

export default UserResolver;
