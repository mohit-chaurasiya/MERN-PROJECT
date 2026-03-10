const Visitor = require('../models/Visitor');

//  create Vistor 
exports.createVisitor = async (req, res) => {
    try{
        const {name, email, purpose, host} = req.body;

        const visitor = await Visitor.create({name, email, purpose, host});

        res.status(201).json({
            message: 'Visitor created successfully',
            visitor
        })
    } catch (error) {
        res.status(400).json({
            message: 'Error creating visitor',
            error
        })
    }
}


exports.getVisitors = async (req, res) => {
    
        const visitors = await Visitor.find().sort({createdAt: -1});
        res.status(200).json(
            visitors
        )
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