import Comment from "../../models/Comments.js";

const getComment = async (req,res) => {
    try {
        const {commentId} = req.params;

        const comment = await Comment.findById(commentId)
            .populate('author', 'username email profilePicture')

        const replies = await Comment.find({parentComment: commentId})
            .populate('author', 'username email profilePicture')
            .populate("replyingTo", "username");
        
        comment._doc.replies = replies;

        if(!comment){
            return res.status(404).json({message: "Comment Not Found!"});
        }

        res.json(comment);
        
    } catch (error) {
        res.status(500).json({message: "Server Error: "+ error.message});
    }
}

export default getComment;