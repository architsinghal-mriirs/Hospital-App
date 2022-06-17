const {Roles} = require('../models/index');

const getAdminRole = async () => {
    try{
    const role = await Roles.findOne({
        where:{
            name : 'Admin'
        }
    })
    return role
    }catch(err){
        console.log("Something went wrong", err);
    }
}

const getDoctorRole = async () => {
    try{
    const role = await Roles.findOne({
        where:{
            name : 'Doctor'
        }
    })
    return role
    }catch(err){
        console.log("Something went wrong", err);
    }
}

const getPatientRole = async () => {
    try{
    const role = await Roles.findOne({
        where:{
            name : 'Patient'
        }
    })
    console.log("Role is", role);
    return role
    }catch(err){
        console.log("Something went wrong", err);
    }
}

module.exports = {
    getAdminRole,
    getDoctorRole,
    getPatientRole
}