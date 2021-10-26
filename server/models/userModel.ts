import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Укажите Ваше имя"],
        trim: true,
        maxLength: [20, "Имя должно быть не больше 20-ти символов"]
    },
    account: {
        type: String,
        required: [true, "Укажите почту или номер телефона"],
        trim: true,
        unique: true
    },
    avatar: {
        type: String,
        default: 'https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG-Free-Download.png'
    },
    role: {
        type: String,
        default: 'user' // admin
    },
    type: {
        type: String,
        default: 'normal' // fast
    }
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema)