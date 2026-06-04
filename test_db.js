const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from backend directory
dotenv.config({ path: path.join(__dirname, 'backend', '.env') });

const User = require('./backend/models/User');

async function checkUsers() {
    try {
        console.log('Connecting to MONGO_URI:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        
        const usersWithOverride = await User.find({ scanLimitOverride: { $ne: null } });
        console.log('Total users with override:', usersWithOverride.length);
        
        if (usersWithOverride.length > 0) {
            usersWithOverride.forEach(u => {
                console.log(`- User: ${u.email} | Limit: ${u.scanLimitOverride}`);
            });
        }
        
        const allUsers = await User.find().limit(5);
        console.log('\nSample Users (last 5):');
        allUsers.forEach(u => {
            console.log(`- User: ${u.email} | Override: ${u.scanLimitOverride}`);
        });

        await mongoose.disconnect();
    } catch (err) {
        console.error('Error:', err);
    }
}

checkUsers();
