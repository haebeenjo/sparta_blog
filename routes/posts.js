const express = require("express");
const router = express.Router();

const Posts = require("../schemas/post.js");

// 게시물 작성
router.post("/", async(req, res) => {
    try {
        const {title, writer, password, contents} = req.body;
        if (title.length === 0){
            return res.status(400).json({"message": "내용을 입력해주세요."});
        }
        await Posts.create({title, writer, password, contents});
        res.status(200).json({"message": "게시글을 생성하였습니다."});   
    } catch(err) {
        return res.status(400).json({"message": "데이터 형식이 올바르지 않습니다."});
    }
});

// 전체 게시글 목록 조회
router.get("/", async(req, res) => {
    const posts = await Posts.find({}, {'__v':false,'password':false, 'contents':false,'updatedAt':false}).sort({'createdAt':-1});
    res.json({posts});
});

// 게시글 상세 조회
router.get('/:postId', async (req, res) => {
    try {
        const { postId } = req.params;

        const posts = await Posts.findOne({ _id: postId });

        res.status(200).json({posts});    
    } catch(err){
        return res.status(400).json({"message": "데이터 형식이 올바르지 않습니다."});
    }    
});

// 게시물 수정
router.put("/:postId", async(req, res) => {
    try{
        const { postId } = req.params;
        const {password, title, contents} = req.body;

        const post = await Posts.findOne({ _id: postId });
        if (password !== post.password) {
            return res.status(400).json ({
                success: false,
                errorMessage: "비밀번호가 올바르지 않습니다."
            })
        }
        await Posts.updateOne({ _id: postId },{$set: {title:title,contents:contents}});
        return res.status(200).json({"message": "게시글을 수정하였습니다."});
    } catch (err){
        return res.status(400).json({"message": "데이터 형식이 올바르지 않습니다."});
    }
    
})

// 게시물 삭제
router.delete("/:postId", async(req, res) => {
    try {
        const { postId } = req.params;
        const { password } = req.body;

        const post = await Posts.findOne({ _id:postId });
        if (password !== post.password) {
            return res.status(400).json ({
                success: false,
                errorMessage: "비밀번호가 올바르지 않습니다."
            })
        }
        if (!Posts) {
            return res.status(400).json ({
                success: false,
                errorMessage: "데이터 조회에 실패하였습니다."
            })
        }
        await Posts.deleteOne({ _id:postId });
        res.status(200).json({"message": "게시글을 삭제하였습니다."});
    } catch (err) {
        return res.status(400).json({"message": "데이터 형식이 올바르지 않습니다."});
    }
});

module.exports = router;