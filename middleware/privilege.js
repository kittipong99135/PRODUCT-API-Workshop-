exports.isAdmin = async(req, res, next ) => {
    try {
        const userRole = req.user.Role;
        
        if(userRole != "admin")
            return res.status(200).send('You do not have permission to access..');    

        next();
    } catch (error) {
        
    }
}

exports.approved = async(req, res, next ) => {
    try {
        const userStatus = req.user.Approve;
        
        if(!userStatus)
            return res.status(200).send('Your Username not approve..');    
        
        next();
    } catch (error) {
        
    }
}
