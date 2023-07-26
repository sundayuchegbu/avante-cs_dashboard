import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Add,
  Delete,
  Edit,
} from "@mui/icons-material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-hot-toast";

const Base_Url = "https://avante-css.onrender.com";
const GET_POST = "/api/v1/posts";
const CREATE_POST = "/api/v1/post";
const UPDATE_POST = "/api/v1/post/";

const CardComponent = () => {
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState([]);
  const [showFields, setShowFields] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updateData, setUpdateData] = useState({
    postId: "",
    title: "",
    caption: "",
    description: "",
    showDescription: false,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(Base_Url + GET_POST);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const toggleDescription = (index) => {
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];
      updatedPosts[index].showDescription =
        !updatedPosts[index].showDescription;
      return updatedPosts;
    });
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedImage(file);
      setFileToBase64(file);
    }
  };

  const setFileToBase64 = (img) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(img);
    fileReader.onloadend = () => {
      setImage(fileReader.result);
    };
  };

  const handleInputChange = (event) => {
    setUpdateData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCreateCard = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("title", updateData.title);
      formData.append("caption", updateData.caption);
      formData.append("description", updateData.description);
      formData.append("showDescription", updateData.showDescription);
      const data = { ...updateData, ...{ image } };
      console.log(data);
      const user = JSON.parse(localStorage.getItem("account"));
      try {
        const response = await axios.post(Base_Url + CREATE_POST, data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(formData);
        setPosts((prevPosts) => [...prevPosts, response.data.data]);
        setSelectedImage(null);
        setUpdateData({
          postId: "",
          title: "",
          caption: "",
          description: "",
          showDescription: false,
        });
        toast.success("Card created succesfully");
        setShowFields(false);
      } catch (error) {
        console.error("Error creating card:", error);
        toast.error(error);
      }
    }
  };

  const handleDeleteCard = async (index) => {
    const user = JSON.parse(localStorage.getItem("account"));
    try {
      const postId = posts[index]._id;
      await axios.delete(`${Base_Url}/api/v1/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setPosts((prevPosts) => {
        const updatedPosts = [...prevPosts];
        updatedPosts.splice(index, 1);
        return updatedPosts;
      });
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleUpdateDialogOpen = (post) => {
    setUpdateData({
      postId: post._id,
      title: post.title,
      caption: post.caption,
      description: post.description,
      showDescription: post.showDescription,
    });
    setShowUpdateDialog(true);
  };

  const handleUpdateDialogClose = () => {
    setShowUpdateDialog(false);
  };

  const handleUpdateCard = async () => {
    if (selectedImage) {
      const data = {
        title: updateData.title,
        caption: updateData.caption,
        description: updateData.description,
        image: image,
      };
      console.log(data);
      const user = JSON.parse(localStorage.getItem("account"));
      console.log(user);
      console.log(user.token);
      try {
        const response = await axios.put(
          Base_Url + UPDATE_POST + updateData.postId,
          data,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(response.data);

        const updatedPosts = posts.map((post) => {
          if (post._id === response.data.data._id) {
            console.log(response.data.data);

            return response.data.data;
          }
          return post;
        });

        setPosts(updatedPosts);
        setSelectedImage(null);
        setUpdateData({
          postId: "",
          title: "",
          caption: "",
          description: "",
          showDescription: false,
        });
        setShowUpdateDialog(false);
      } catch (error) {
        console.error("Error updating card:", error);
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {!showFields ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setShowFields(true)}
          >
            Create Card
          </Button>
        ) : (
          <>
            <input type="file" accept="image/*" onChange={handleImageSelect} />
            {selectedImage && (
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={URL.createObjectURL(selectedImage)}
                  alt="Selected Image"
                />
              </Card>
            )}
            <TextField
              label="Title"
              name="title"
              value={updateData.title}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Caption"
              name="caption"
              value={updateData.caption}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <ReactQuill
              label="Description"
              name="description"
              value={updateData.description}
              onChange={(value) =>
                handleInputChange({ target: { name: "description", value } })
              }
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleCreateCard}
              disabled={!selectedImage}
            >
              Create Card
            </Button>
          </>
        )}
      </Grid>
      {posts.map((post, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={post.image}
              alt={post.title}
            />
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="subtitle1">{post.caption}</Typography>
              {post.showDescription ? (
                <Typography variant="body2">{post.description}</Typography>
              ) : (
                <Typography variant="body2">
                  Click the icon to show the description
                </Typography>
              )}
              <IconButton onClick={() => toggleDescription(index)}>
                {post.showDescription ? <VisibilityOff /> : <Visibility />}
              </IconButton>
              <IconButton onClick={() => handleDeleteCard(index)}>
                <Delete />
              </IconButton>
              <IconButton onClick={() => handleUpdateDialogOpen(post)}>
                <Edit />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Dialog open={showUpdateDialog} onClose={handleUpdateDialogClose}>
        <DialogTitle>Update Card</DialogTitle>
        <DialogContent>
          <input type="file" accept="image/*" onChange={handleImageSelect} />
          {selectedImage && (
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={URL.createObjectURL(selectedImage)}
                alt="Selected Image"
              />
            </Card>
          )}
          <TextField
            label="Title"
            name="title"
            value={updateData.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Caption"
            name="caption"
            value={updateData.caption}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <ReactQuill
            label="Description"
            name="description"
            value={updateData.description}
            onChange={(value) =>
              handleInputChange({ target: { name: "description", value } })
            }
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateCard}
            color="primary"
            disabled={!selectedImage}
          >
            Update Card
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default CardComponent;
