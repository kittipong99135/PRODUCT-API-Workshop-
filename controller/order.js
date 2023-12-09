const orderSchema = require('../model/order');
const productSchema = require('../model/product');

exports.create = async(req, res) => {
    try {
        let checkProduct = {};
        let listOrderArr = [];
        let priceSumary = 0;

        for(let i = 0 ; i < req.body.orderList.length; i++){
            checkProduct = await productSchema
                .findOne({_id:req.body.orderList[i].list});

            if(checkProduct.stock > 0){
                await productSchema
                    .findOneAndUpdate({_id:req.body.orderList[i].list},
                        {stock:checkProduct.stock-req.body.orderList[i].qtity});
                listOrderArr.push(
                    {
                        "list":req.body.orderList[i].list, 
                        "product":checkProduct.productName,
                        "quantity":req.body.orderList[i].qtity,
                        "price":checkProduct.price*req.body.orderList[i].qtity
                    }
                );
                priceSumary += checkProduct.price;
            }
            else{
                return res.send("Sory Not enough " + checkProduct.productName);
            }        
        }
        let newOrder = new orderSchema({
            ownerOrder: req.user.id,
            orderList: listOrderArr,
            Delivery:false
        });

        await newOrder.save();
        res.send(newOrder);
    } catch (error) {
        console.log(error + 'ERR! : @control -> order');
        res.status(500).send('Server Eooror!!');
    }
}

exports.read = async(req, res) => {
    try {
        if(req.user.Role != "admin"){
            const readOrder = await orderSchema.find({ownerId:req.user.id});
            res.send(readOrder);
        }
        else{
            const readOrder = await orderSchema.find({});
            res.send(readOrder);
        }
    } catch (error) {
        console.log(error + 'ERR! : @control -> order');
        res.status(500).send('Server Eooror!!');
    }
}

exports.remove = async(req, res) => {
    try {
        const thisOrder = await orderSchema.findOne({_id:req.params.id});
        const productDetail = await productSchema.findOne({_id:thisOrder.productId});
        const productUpdate = await productSchema
            .findOneAndUpdate({_id:thisOrder.productId},
                {
                    order: productDetail.order - thisOrder.quanTity,
                    stock: productDetail.stock + thisOrder.quanTity
                });
        const orderRemove = await orderSchema.findOneAndDelete({_id:req.params.id});
        console.log(orderRemove);
        res.send('Remove Order Success...');
    } catch (error) {
        console.log(error + 'ERR! : @control -> order');
        res.status(500).send('Server Eooror!!');
    }
}

exports.confirmOrder = async(req, res) => {
    try {
        const thisOrder = await orderSchema.findOne({_id: req.params.id});
        
        if(thisOrder.ownerId != req.user.id)
            return res.send('Is not Your Order...');
        
        const thisProduct = await productSchema.findOne({_id: thisOrder.productId});
        const updateProduct = await productSchema
            .findOneAndDelete({_id: thisOrder.productId},
                {order: thisProduct.order - thisOrder.quanTity,});
        const confirmOrder = await orderSchema.findOneAndDelete({_id: req.params.id});
        res.send(updateProduct);

    } catch (error) {
        console.log(error + 'ERR! : @control -> order');
        res.status(500).send('Server Eooror!!');
    }
}