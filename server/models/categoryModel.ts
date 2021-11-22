import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Укажите название категории'],
			trim: true,
			unique: true,
			maxlength: [50, 'Максимальная длина названия 50 символов'],
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('Category', categorySchema);
