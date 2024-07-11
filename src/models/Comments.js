import { Schema, model, models } from "mongoose";

const reqString = {
  type: String,
  required: true,
};

const schema = new Schema({
  name: reqString,
  comment: reqString,
  date: reqString,
  slug: reqString,
});

const Comments = models.comments || model("comments", schema);

export default Comments;

// Methods
// Likes
// schema.methods.compareLike = async function (clientIP) {
//   try {
//     // compare all likes in db with clientIP.
//     // if match in found, return true + the index of the matching IP
//     for (let i = 0; i < this.likes.length; i++) {
//       let isMatch = await bcrypt.compare(clientIP, this.likes[i]);
//       if (isMatch) return { isMatch: true, index: i };
//     }
//     return { isMatch: false, index: null };
//   } catch (error) {
//     console.log("Error while comparing like to db: ", error.message);
//     return error;
//   }
// };

// schema.methods.addLike = async function (clientIP) {
//   try {
//     // hash to IP for security
//     const salt = await bcrypt.genSalt(Number(process.env.SALT));
//     const hashedIP = await bcrypt.hash(clientIP, salt);

//     // push it to the db
//     await this.likes.push(hashedIP);
//     await this.save();
//   } catch (error) {
//     console.log("Error while adding like to db: ", error.message);
//     return error;
//   }
// };

// schema.methods.removeLike = async function (index) {
//   try {
//     await this.likes.splice(index, 1);
//     await this.save();
//   } catch (error) {
//     console.log("Error while removing like from db: ", error.message);
//     return error;
//   }
// };

// schema.methods.getComments = async function () {
//   return await this.likes;
// };

// schema.methods.countLikes = async function () {
//   return await this.likes.length;
// };
