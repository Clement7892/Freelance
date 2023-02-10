const mongoose = require('mongoose');

const missionSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    totalAmount: {
        type: Number,
        require: true
    },
    dateStart: {
        type: Date,
        require: true,
    },
    dateFinish: {
        type: Date,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    skill: { 
        type: String,
        require: true
    },
    job: {
        type: String,
        require: true 
    },
    participant: {
        type: String
    }
},
    {
        timestamps: true
    }
)  

module.exports = mongoose.model('Mission', missionSchema);