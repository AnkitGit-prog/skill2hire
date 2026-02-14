const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log('MongoDB Connected');

        const adminExists = await User.findOne({ username: 'Hello' });
        if (adminExists) {
            console.log('Admin user already exists. Updating role to admin...');
            adminExists.role = 'admin';
            await adminExists.save();
            console.log('User role updated to admin.');
        } else {
            const admin = new User({
                username: 'Hello',
                password: 'Hello123',
                role: 'admin'
            });
            await admin.save();
            console.log('Admin user created: Hello / Hello123 with role admin');
        }

        mongoose.connection.close();
    })
    .catch(err => {
        console.error(err);
        mongoose.connection.close();
    });
