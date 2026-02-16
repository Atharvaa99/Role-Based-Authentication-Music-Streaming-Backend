const musicModel = require('../models/music.model');
const jwt = require('jsonwebtoken');
const {uploadFile} = require('../services/storage.service');
const albumModel = require('../models/album.model');

async function createMusic(req,res){

    const {title} = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'));

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id
    })

    res.status(201).json({
        message: "Music added",
        music
    })
}

async function createAlbum(req,res){
 
    const {title, musicIds} = req.body;

    const album = await albumModel.create({
        title,
        artist: req.user.id,
        musics: musicIds
    })
    res.status(201).json({
        message: "Album created successfully"
    })
}

async function getAllMusics(req,res){

    const musics = await musicModel
        .find()
        .limit(20);
    
    res.status(200).json({
        message: "Music fetched successfully",
        musics
    })
}

async function getAllAlbums(req,res){

    const album = await albumModel.find().select("title artist -music").populate("artist","username");
    
    res.status(200).json({
        message: "Music fetched successfully",
        album
    })
}

async function getAlbumById(req,res){

    const albumId = req.params.albumId;

    const album = await albumModel.findById(albumId).populate("artis","userName email").populate("music");

    return res.status(200).json({
        message: "Album fetched successfully",
        album
    })

}


module.exports ={createMusic, createAlbum, getAllMusics, getAllAlbums,getAlbumById}