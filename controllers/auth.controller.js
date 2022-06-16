const authService = require('../services/auth.service');

const serverError = {
    message : 'Something went wrong',
    success : false,
    data : {}
}

const signup = async (req,res) => {
    const response = await authService.createUser(req.body);
    if(!response){
        return res.status(500).json(serverError);
    }
    console.log("Response", response);
    if(response.error){
        return res.status(400).json({
            message: response.error,
            success: false,
            data: {},
            error : response.details
        })
    }
    return res.status(200).json({
        message: 'Successfully signed up',
        success: true,
        data: response
    })
}

const signin = async (req,res) => {
    const user = await authService.getUserByEmail(req.body.email);
    if(!user){
        return res.status(404).json({
            message: 'No User found by Email',
            success: false,
        })
    }
    console.log("User lolololol", user);
    if(user.error){
        return res.status(500).json(serverError);
    }
    console.log(authService.checkPassword(req.body.password, user.password));
    if(!authService.checkPassword(req.body.password, user.password)){
        return res.status(400).json({
            message : 'Incorrect Password',
            success : false
        })
    }
    const token = authService.createToken({id: user.id, email: user.email});
    console.log("token", token);
    if(!token){
        return res.status(500).json(serverError);
    }

    return res.status(200).json({
        message : 'Signed in Successfully',
        data : token,
        success : true
    })

}

module.exports = {
    signup,
    signin
}