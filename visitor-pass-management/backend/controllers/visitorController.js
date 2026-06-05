const Visitor = require('../models/Visitor');

//  create Vistor 
exports.createVisitor = async (req, res) => {
       
    try{

        const hostId = req.user._id
        const {name, email, phone, host} = req.body;
        const photo = req.file ? `uploads/${req.file.filename}` : null
 
        const visitor = await Visitor.register(
            name, 
            email, 
            phone, 
            host,
            hostId,
            photo
            
    );

        res.status(201).json({
            message: 'Visitor created successfully',
            visitor
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
            
        })
    }


}


exports.getVisitors = async (req, res) => {
    
    try{
        // agr admin hai toh sb visitor
        if(req.user.role === "admin"){
            const visitors = await Visitor.find().sort({createdAt: -1});
           return res.status(200).json(
            visitors
        )
        }

         const visitors = await Visitor.find({
                hostId: req.user._id
            }).sort({createdAt: -1});
            res.status(200).json(visitors);
    }catch (error){
            res.status(404).json({message: error.message});
        }
} 




exports.getVisitorById = async (req, res) => {
    const {id} = req.params;

    try {
        const visitor = await Visitor.findById(id);

        if(!visitor){
            return res.status(404).json({
                error: 'Visitor not found'
            })
        }
        res.status(200).json(visitor);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}


exports.updateVisitor = async (req, res) => {
    const {id} = req.params;

    try {
        const visitor = await Visitor.findByIdAndUpdate(id, req.body, {new: true});

        if(!visitor){
            return res.status(404).json({
                error: 'Visitor not found'
            })
        }
        res.status(200).json({
            message: 'Visitor updated successfully',
            visitor
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

exports.deleteVisitor = async (req, res) => {
    const {id} = req.params;

    try {
        const visitor = await Visitor.findByIdAndDelete(id);
        if(!visitor){
            return res.status(404).json({
                error: 'Visitor not found'
            })
        }
        res.status(200).json({
            message: 'Visitor deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

exports.searchVisitors = async (req, res)=>{
    const {name, host, date} = req.query

    let query = {}

    if(name){
        query.name = { $regex:name, $options:"i" }
    }

    if(host){
        query.host = { $regex:host, $options:"i" }
    }

    if(date){
        query.createdAt = {
            $gte: new Date(date),
            $lte: new Date(date + "T23:59:59")
        }
    }

    const visitors = await Visitor.find(query)

    res.status(200).json(visitors)
}