import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    role: String,
    category: String,
    lastUpdated: Date,
    created: Date
});

const UserModel = mongoose.model('users',userSchema);

export default UserModel;