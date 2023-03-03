const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');

const multer = require('multer');

dotenv.config();
app.use(express.json());

mongoose
	.connect(process.env.MONGO_URL)
	.then(console.log('Connected to MongoDB'))
	.catch((err) => console.err(err));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'assets');
	},
	filename: (req, file, cb) => {
		cb(null, 'hat.png');
	},
});

const upload = multer({ storage: storage });

// app.use('/', (req, res) => {
// 	console.log('Welcome to my server');
// 	res.json('Welcome to my MongoDB Blog Server');
// });
app.post('/upload', upload.single('file'), (req, res) => {
	res.status(200).json('file has been uploaded');
});
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/posts', postRoute);
app.use('/categories', categoryRoute);

app.listen('8000', () => {
	console.log('Server is running');
});
