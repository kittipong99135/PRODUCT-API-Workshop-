const productSchema = require('../model/product');
const orderSchema = require('../model/order');
const product = require('../model/product');

exports.create = async(req, res) => {
    try {
        const addProduct = await productSchema(req.body).save();
        res.send(addProduct);
    } catch (error) {
        console.log(error + 'ERR! : @ controller -> product');
        res.status(500).send('Server Error!!');
    }
}
 
exports.list = async (req, res) => {
    try {
        const listProduct = await productSchema.find({}).exec();
        res.send(listProduct);
    } catch (error) {
        console.log(error + 'ERR! : @ controller -> product');
        res.status(500).send('Server Error!!');
    }
}

exports.read = async (req, res) => {
    try {
        const readProduct = await productSchema.findOne({_id:req.params.id}).exec();
        res.send(readProduct);
    } catch (error) {
        console.log(error + 'ERR! : @ controller -> product');
        res.status(500).send('Server Error!!');
    }
}

exports.update = async (req, res) => {
    try {
        const updateProduct = await productSchema
            .findOneAndUpdate({_id:req.params.id}, req.body, {new:true}).exec();
        res.send(updateProduct);
    } catch (error) {
        console.log(error + 'ERR! : @ controller -> product');
        res.status(500).send('Server Error!!');
    }
}

exports.remove = async (req, res) => {
    try {
        const removeOrder = await orderSchema
            .deleteMany({productId:req.params.id});
        const removeProduct = await productSchema
            .findOneAndDelete({_id:req.params.id}).exec();
        res.send(removeProduct);
    } catch (error) {
        console.log(error + 'ERR! : @ controller -> product');
        res.status(500).send('Server Error!!');
    }
}

exports.addOrder = async (req, res) => {
    try {   
        const detailProduct = await productSchema.findOne({_id:req.params.id});
        let quant = req.body.quan;
        console.log(quant);
        if(detailProduct.stock < quant){
            return res.send("Sory Not enough product: " + detailProduct.productName)
        }
        else{
            const updateQuantity = await productSchema
                .findOneAndUpdate({_id:req.params.id},
                    {stock:detailProduct.stock-quant, order:detailProduct.order+quant});
            
            let addOrder = new orderSchema({
                ownerId : req.user.id, 
                ownerName : req.user.User, 
                productId : detailProduct._id,
                productDetail: {
                    productName:detailProduct.productName,
                    productPrice:detailProduct.price
                }, 
                quanTity :quant,
                orderPrice:detailProduct.price* quant
            });
            addOrder.save();
            res.send(addOrder)
        }

        
    } catch (error) {
        console.log(error + 'ERR! : @ controller -> product');
        res.status(500).send('Server Error!!');
    }
}

exports.productOrder = async (req, res) => {
    try {
        if(req.user.Role != "admin"){
            const productOrder = await orderSchema.find({productId:req.params.id, ownerId:req.user.id});
            res.send(productOrder);
        }
        else{
            const productOrder = await orderSchema.find({productId:req.params.id});
            res.send(productOrder);
        }
    } catch (error) {
        console.log(error + 'ERR! : @ controller -> product');
        res.status(500).send('Server Error!!');
    }
}