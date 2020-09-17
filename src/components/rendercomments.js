import React from "react";

export const RenderComments = ({ comments, showComments }) => {
    if (!showComments) {
        return <div />
    }
    if (comments.length === 0) {
        return <p>No comments</p>;
    }

    const cloneComments = comments.slice();
    const newArray = cloneComments.slice((cloneComments.length - 2), cloneComments.length)

    return newArray.map(comment => (
        <div className="comment" key={comment.id}>
            <p className="name">{comment.name} says:</p>
            <strong>{comment.body}</strong>
        </div>
    ));
};
