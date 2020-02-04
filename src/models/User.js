import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  nickname: String,
  email: String,
  avatarUrl: String,
  birth: Date,
  emailVerified: {
    type: Boolean,
    default: false
  },
  verifyKey: String,
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  login: {
    type: Boolean,
    default: false
  }
});
UserSchema.plugin(passportLocalMongoose, { usernameField: "nickname" });
const model = mongoose.model("User", UserSchema);
export default model;
