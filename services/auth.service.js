const {User} = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const role = require('../services/roles.service');  

const createUser = async (userData) => {
    try{
        const user = await User.create(userData);
        const patientRole = await role.getPatientRole();
        await user.addRoles(patientRole);
        return user;
    } catch(err){
        console.log(err);
        if(err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeValidationError') {
        return {
            error : err.message,
            details: err.errors[0].message
        }
    }
    }
}

const getUserByEmail = async(userEmail) => {
    try{
        const user = await User.findOne({
            where:{
                email : userEmail
            }
        })

        console.log("User", user);
        return user;
    }catch(err){
        console.log(err);
        return {
            error : err.message
        }
    }
}

const checkPassword = (userPassword, encryptedPassword) => {
    return bcrypt.compareSync(userPassword, encryptedPassword);
}

const createToken = (user) => {
    try{
   return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '2 days'
    })
}catch(err){
    console.log(err);
}
}

const verifyToken = (token) => {
    try{
    const response = jwt.verify(token, process.env.JWT_SECRET);
    return response;
    }catch(err){
        console.log(err);
    }
}

const updateUserRole = async (role, userId) => {
    try{
    const user = await User.findByPk(userId);
    if(role == 'Admin' || role == 'admin'){
        const adminRole = await role.getAdminRole();
        user.addRoles(adminRole);
    }else if(role == 'Doctor' || role == 'doctor'){
        const doctorRole = await role.getDoctorRole();
        user.addRoles(doctorRole);
    }
    return user;
    }catch(err){
        console.log("Something went wrong", err);
    }
}

module.exports = {
    createUser,
    getUserByEmail,
    checkPassword,
    createToken,
    verifyToken,
    updateUserRole
}