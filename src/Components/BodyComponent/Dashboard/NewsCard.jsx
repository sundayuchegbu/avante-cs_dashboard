// import React from "react";
// import {
//   Box,
//   Card,
//   CardActions,
//   CardContent,
//   CardHeader,
//   CardMedia,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import { Delete, Edit } from "@mui/icons-material";

// const AdminNewsCard = ({ news, onDelete, onEdit }) => {
//   const { image, title, caption } = news;

//   return (
//     // <Card>
//     //   <CardHeader
//     //     title={title}
//     //     action={
//     //       <>
//     //         <IconButton onClick={() => onEdit(news)}>
//     //           <Edit />
//     //         </IconButton>
//     //         <IconButton onClick={() => onDelete(news)}>
//     //           <Delete />
//     //         </IconButton>
//     //       </>
//     //     }
//     //   />
//     //   <img src={image} alt="chizzy" />
//     //   <CardContent>
//     //     <Typography variant="body2" color="textSecondary" component="p">
//     //       {caption}
//     //     </Typography>
//     //   </CardContent>
//     // </Card>
//     <Box width="300px">
//       <Card>
//         <CardMedia
//           component="img"
//           height="140"
//           image={image}
//           alt="news image"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             {title}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {caption}
//           </Typography>

//           <>
//             <IconButton onClick={() => onEdit(news)}>
//               <Edit />
//             </IconButton>
//             <IconButton onClick={() => onDelete(news)}>
//               <Delete />
//             </IconButton>
//           </>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default AdminNewsCard;
