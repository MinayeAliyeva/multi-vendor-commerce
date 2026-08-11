const mongoose = require('mongoose');

const getDatabaseConfig = () => {
    const dbMode = process.env.DB_MODE || process.env.mode

    if (dbMode === 'pro') {
        return {
            label: 'Production',
            url: process.env.DB_PRO_URL
        }
    }

    return {
        label: 'Local',
        url: process.env.DB_LOCAL_URL
    }
}

module.exports.dbConnect = async() => {
    const { label, url } = getDatabaseConfig()

    if (!url) {
        throw new Error(`${label} database URL is missing`)
    }

    await mongoose.connect(url, { serverSelectionTimeoutMS: 10000 })
    console.log(`${label} database connect...`)
}
