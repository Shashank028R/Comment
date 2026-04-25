import User from '../../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUser = async (req,res)=> {
    try{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "All Fields are requird."})
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({message: "User Not Found."})
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({message: "Wrong Password"});
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

    res.json({
        message: "User Login Successful",
        id: user._id,
        username: user.username,
        email: user.email,
        token
    })


    }catch(error){
        res.status(500).json({message: "Server Error: "+ error.message});
    }


}

export default loginUser;