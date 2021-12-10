const mongoose = require('mongoose')

    mongoose.connect('mongodb://localhost:27017/chatappDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      const userSchema = mongoose.Schema({
          id : String,
          username : String,
          room : String
      });
      const User = mongoose.model('user',userSchema);

const saveUser = (id,username,room)=>{
  const user = new User({
        id,
        username ,
        room
    });
    user.save()
}

const currentUser = async (id)=>{
   console.log(id);
    const user = await User.findOne({id : id}).exec();
    return user

}
const deleteUser = async (id)=>{
    console.log(id);
     const user = await User.findOneAndDelete({id : id}).exec();
     return user
 
 }

 const getRoomAndUser= async (room)=>{
    const users = await User.find({room : room}).exec();
    return users
 }

module.exports = {saveUser,currentUser,deleteUser,getRoomAndUser};

