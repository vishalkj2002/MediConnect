import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async(req, res) => {
    const {email, password, name, role, photo, gender} = req.body;
    try {
        let user = null;

        if (role === 'patient') {
            user = User.findOne({email});
        } else if (role === 'doctor') {
            user = Doctor.findOne({email});
        }

        // Check if user exists
        if (user) {
            return res.status(400).json({message: 'User already exists'});
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        if (role === 'patient') {
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            })
        }

        if (role === 'doctor') {
            user = new Doctor({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            })
        }

        await user.save();

        res.status(200).json({success: true, message: 'User successfully created'});
    } catch (error) {
        res.status(500).json({success: true, message: 'User successfully created'});
    }
}

export const login = async(req, res) => {
    try {

    } catch (error) {

    }
}