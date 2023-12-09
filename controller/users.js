const userSchema = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.regis = async (req, res) => {
    try {
        let { Username, Password } = req.body;

        let newUser = await userSchema.findOne({Username}).exec();

        if(newUser)
            return res.send('Username invalid');

        const salt = await bcrypt.genSalt(10);
        
        user = new userSchema({
            Username: Username, 
            Password: Password,
            Role: "user",
            Approve: false
        });

        user.Password = await bcrypt.hash(Password, salt);

        user.save();
        res.send(user);
    } catch (error) {
        console.log(error +  'ERR! : @ controller -> users');
        res.status(500).send('Server Error');
    }
}

exports.login = async(req, res) => {
    try {
        const { Username , Password } = req.body;

        const loginUser = await userSchema
            .findOneAndUpdate({Username:Username}, {new: true});

        if(loginUser){
            const matchPassword  = await bcrypt.compare(Password, loginUser.Password);
            if(matchPassword){

                let payLoad = {
                    id:loginUser._id,
                    User:loginUser.Username, 
                    Role:loginUser.Role,
                    Approve: loginUser.Approve
                }



                jwt.sign(payLoad, process.env.JWT_KEY, {expiresIn: 21600}, (err, token) => {
                    if(err) throw err;
                    res.json({token, payLoad});
                    
                    console.log(token);
                });
            }
            else{
                return res.status(500).send('Password invalid..');
            }
        }
        else{
            return res.status(500).send('Username invalid..');
        }
            
    } catch (error) {
        console.log(error +  'ERR! : @ controller -> users');
        res.status(500).send('Server Error');
    }
}

exports.remove = async(req, res) => {
    try {
        const removeUser = await userSchema.findOneAndDelete({_id: req.params.id}).exec();
        res.send(removeUser);
    } catch (error) {
        console.log(error +  'ERR! : @ controller -> users');
        res.status(500).send('Server Error');
    }
}

exports.approve = async(req, res) => {
    try {
        const waitApprove = await userSchema.find({Approve: false}).exec();
        res.send(waitApprove);
    } catch (error) {
        console.log(error +  'ERR! : @ controller -> users');
        res.status(500).send('Server Error');
    }
}

exports.userApprove = async(req, res) => {
    try {
        const user = await userSchema.findOne({_id:req.params.id});
        res.send(user);
    } catch (error) {
        console.log(error +  'ERR! : @ controller -> users');
        res.status(500).send('Server Error');
    }
}

exports.confirmUser = async(req, res) => {
    try {
        const user = await userSchema.findOneAndUpdate({_id:req.params.id}, {Approve:true});
        res.send(user);
    } catch (error) {
        console.log(error +  'ERR! : @ controller -> users');
        res.status(500).send('Server Error');
    }
}