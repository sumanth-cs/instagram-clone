const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const RequireLogin = require("../middleware/RequireLogin");
const POST = mongoose.model("POST")

router.get("/allpost", RequireLogin, (req, res) => {
    POST.find()
        .populate("postedBy", "_id name Photo")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt")
        .then(post => res.json(post))
        .catch(err => console.log(err))
})

router.post("/createPost", RequireLogin, (req, res) => {
    const { body, pic } = req.body;
    console.log(pic)

    if (!body || !pic) {
        return res.status(422).json({ err: "please add all the fields" })
    }

    console.log(req.user)
    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user
    })

    post.save().then((result) => {
        return res.json({ post: result })
    }).catch(err => { console.log(err) })

})

router.get("/mypost", RequireLogin, (req, res) => {
    POST.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt")

        .then(mypost => {
            res.json(mypost)
        })

})

router.put("/like", RequireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    })
        .populate("postedBy", "_id name Photo")
        .exec((err, result) => {
            if (err) {
                res.status(422).json({ err: err })
            } else {
                res.json(result)
            }
        })
})

router.put("/dislike", RequireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    })
        .populate("postedBy", "_id name Photo")
        .exec((err, result) => {
            if (err) {
                res.status(422).json({ err: err })
            } else {
                res.json(result)
            }
        })
})

router.put("/comment", RequireLogin, (req, res) => {
    const comment = {
        comment: req.body.text,
        postedBy: req.user._id
    }
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    })
        .populate("postedBy", "_id name Photo")
        .populate("comments.postedBy", "_id name")
        .exec((err, result) => {
            if (err) {
                res.status(422).json({ err: err })
            } else {
                res.json(result)
            }
        })
})

router.delete("/deletepost/:postId", RequireLogin, (req, res) => {
    POST.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
            }
            if (post.postedBy._id.toString() == req.user._id.toString()) {
                post.remove()
                    .then(result => {
                        return res.json({ message: "successfully deleted" })
                    })
                    .catch(err => { console.log(err) })
            }

        })
})

//to show following post
router.get("/myfollowingpost", RequireLogin, (req, res) => {
    POST.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .then(posts => {
            res.json(posts)
        })
        .catch(err => { console.log(err) })
})
module.exports = router;