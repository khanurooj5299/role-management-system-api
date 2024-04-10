import mongoose from 'mongoose';
import rolesArray from '../../config/roles.js';

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    role: {
        type: String,
        enum: rolesArray
    },
    category: String,
    lastUpdated: Date,
    created: Date
});

const UserModel = mongoose.model('users',userSchema);

export default UserModel;