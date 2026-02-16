const imageKit = require('@imagekit/nodejs');

const ImageKitClient = new imageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(file){
    const result = await ImageKitClient.files.upload({
        file,
        fileName: "music_" + Date.now(),
        folder: "/role-based-authentication-project"
    })
    return result;
}

module.exports = uploadFile;