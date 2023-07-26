import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function CommentCard() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments from API
    fetch("http://localhost:5000/api/v1/comments")
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.log(error));
  }, []);
  const handleDelete = (commentId) => {
    // Delete comment with the given ID
    // Implement your delete logic here
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);

    console.log(`Deleting comment with ID: ${commentId}`);
  };

  return (
    <div>
      {comments.map((comment) => (
        <Card key={comment.id} variant="outlined">
          <CardContent>
            <Typography variant="h6">Name: {comment.name}</Typography>
            <Typography variant="h6">Email: {comment.email}</Typography>
            <Typography variant="h6">Reason: {comment.reason}</Typography>
            <Typography variant="body1">Details: {comment.details}</Typography>
            <Typography variant="body1">
              Date: {new Date(comment.createdAt).getDate()}{" "}
              {new Date(comment.createdAt).toLocaleString("default", {
                month: "long",
              })}{" "}
              {new Date(comment.createdAt).getFullYear()}
            </Typography>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(comment.id)}
            >
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default CommentCard;
