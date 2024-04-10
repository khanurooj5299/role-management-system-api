import mongoose from 'mongoose';
import roles from '../../config/roles.js';

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    role: {
        type: String,
        enum: roles
    },
    category: String,
    lastUpdated: Date,
    created: Date
});

const UserModel = mongoose.model('users',userSchema);

export default UserModel;