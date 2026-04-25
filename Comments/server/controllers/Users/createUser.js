import User from "../../models/User.js";
import bcrypt from 'bcrypt';

const createUser = async (req,res) => {
    try{
        const {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({message: "All Fields are requird."})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({message: "User already exists."})
        }

        const user = await User.create({username,email,password:hashedPassword});

        res.status(201).json({
            message: "User Created Successful",
            user,

        });
    }catch(error){
        res.status(500).json({message: "Server Error: "+ error.message});
    }
}

export default createUser;