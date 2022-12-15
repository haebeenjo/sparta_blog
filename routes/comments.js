const express = require("express");
const router = express.Router();

const Comments = require("../schemas/comment.js");
const Posts = require("../schemas/post.js");

// 댓글 작성
router.post("/:postId", async(req, res) => {
    try {
        const { postId } = req.params;
        const {writer, contents, password} = req.body;

        const comments = await Posts.findOne({ _id: postId});
        if (contents.length === 0){
            return res.status(400).json({"message": "댓글 내용을 입력해주세요."});
        }
        await Comments.create({postId, writer, contents, password});
        res.status(200).json({"message": "댓글을 생성하였습니다."});   
    } catch (err) {
        return res.status(400).json({"message": "데이터 형식이 올바르지 않습니다."});
    }
});

// 댓글 목록 조회
router.get("/:postId", async(req,res) => {
    try{
        const { postId } = req.params;

        const comments = await Comments.find({ postId },{'__v':false,'updatedAt':false,'password':false}).sort({'createdAt':-1});
        res.json({comments});
    } catch (err) {
        return res.status(400).json({"message": "데이터 형식이 올바르지 않습니다."});
    } 
});

// 댓글 수정
router.put("/:commentsId", async(req, res) => {
    try{
        const { commentsId } = req.params;
        const {contents, password} = req.body;

        const comments = await Comments.findOne({ _id: commentsId });
        if (password != comments.password) {
            return res.status(400).json ({
                success: false,
                errorMessage: "비밀번호가 올바르지 않습니다."
            })
        }
        if (!Comments) {
            return res.status(400).json ({
                success: false,
                errorMessage: "댓글 내용을 입력해주세요."
            })
        }
        await Comments.updateOne({_id:commentsId},{$set: {contents:contents}});
        return res.status(200).json({"message": "댓글을 수정하였습니다."});
    } catch (err){
        return res.status(400).json({"message": "데이터 형식이 올바르지 않습니다."});
    }
    
});

// 댓글 삭제
router.delete("/:commentsId", async(req, res) => {
    try {
        const {commentsId } = req.params;
        const {password} = req.body;

        const comments = await Comments.findOne({ _id: commentsId });
        if (password != comments.password) {
            return res.status(400).json ({
                success: false,
                errorMessage: "비밀번호가 올바르지 않습니다."
            })
        }
        if (!Comments) {
            return res.status(400).json ({
                success: false,
                errorMessage: "데이터 조회에 실패하였습니다."
            })
        }
        await Comments.deleteOne({ _id:commentsId });
        res.status(200).json({"message": "게시글을 삭제하였습니다."});
    } catch (err) {
        return res.status(400).json({"message": "데이터 형식이 올바르지 않습니다."});
    }
});


module.exports = router;