const path = require('path');
const express = require('express');

const Pictures = require('../models/pictures');
const Comments = require('../models/comments');

exports.viewHomePage = (request, response, next) => {
    response.sendFile(path.join(__dirname, '../views/social.html'));
}


exports.postPicture = async (request, response, next) => {
    try {
        const { imageUrl, description } = request.body;
        const picture = await Pictures.create({
            imageUrl: imageUrl,
            description: description
        });
        response.status(201).json({ message: 'Picture posted successfully', picture: picture });
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'An error occurred while posting the picture' });
    }
}

exports.postComment = async (request, response, next) => {
    const pictureId = request.params.PictureId;
    try {
        const { comment } = request.body;
        const picture = await Pictures.findByPk(pictureId);
        const pictureComment = await picture.createComment({
            comment: comment
        })
        response.status(201).json({ message: 'Picture comment created successfully', comment: pictureComment });

    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'An error occurred while creating the comment' });
    }
}

exports.deleteComment = async (request, response, next) => {
    const commentId = request.params.CommentId;
    try {
        await Comments.destroy({ where: { id: commentId } });
        response.status(201).json({ message: 'Picture comment deleted successfully' });

    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'An error occurred while deleting the comment' });
    }
}

exports.getAllPictures = async (request, response, next) => {
    try {
        const allPictures = await Pictures.findAll();
        response.send(allPictures);
    } catch (error) {
        console.log(error);
    }
}

exports.getPictureComments = async (request, response, next) => {
    const pictureId = request.params.PictureId;
    try {
        const pictureComments = await Comments.findAll({
            where: { PictureId: pictureId },
            include: ['Picture']
        });
        response.send(pictureComments);

    } catch (error) {
        console.log(error);
    }
}

