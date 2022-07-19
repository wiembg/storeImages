const { cloudinary } = require('./utils/cloudinary');
const express = require('express');
const app = express();
var cors = require('cors');

app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));//allow parse json data 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
//list of public files in this folder

app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dev_setups',
        });
        console.log(uploadResponse);
        res.json({ msg: 'Uploaded successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

const port =   process.env.PORT || 3001;
app.listen(port, () => {
    console.log('listening on 3001');
});
