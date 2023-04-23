const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
    roomId: {
        type: String,
        required: true,
        unique: true,
        minLength: 10,
        maxLength: 10
    },
    passcode: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 6
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    lastAccesedAt: {
        type: Date
    }
});

const Room = mongoose.model('Room', roomSchema);

const createNewRoom = (roomId, passcode, creator) => {
    const newRoom = new Room({roomId, passcode, creator});
    return newRoom.save();
}


module.exports = {
    createNewRoom,
}
