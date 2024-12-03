// import React, { useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { Box, Typography } from "@mui/material";

// const ImageUpload = ({ onUpload }) => {
//   const onDrop = useCallback((acceptedFiles) => {
//     onUpload(acceptedFiles);
//   }, [onUpload]);

//   const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/*" });

//   return (
//     <Box
//       {...getRootProps()}
//       sx={{
//         border: "2px dashed #ec8817",
//         padding: "30px",
//         textAlign: "center",
//         cursor: "pointer",
//         minHeight: "150px",
//       }}
//     >
//       <input {...getInputProps()} />
//       <Typography>Glissez et déposez vos images ici ou cliquez pour parcourir vos fichiers</Typography>
//     </Box>
//   );
// };

// export default ImageUpload;
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

const ImageUpload = ({ onUpload }) => {
    const [loading, setLoading] = React.useState(false);

    const onDrop = useCallback(async (acceptedFiles) => {
        setLoading(true);

        const formData = new FormData();
        acceptedFiles.forEach((file) => {
            formData.append("images[]", file);
        });

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/upload-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                console.log("Images uploaded:", response.data.images);
                onUpload(response.data.images); // Passer les images uploadées au parent
            }
        } catch (error) {
            console.error("Error uploading images:", error);
        } finally {
            setLoading(false);
        }
    }, [onUpload]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/*" });

    return (
        <Box
            {...getRootProps()}
            sx={{
                border: "2px dashed #ec8817",
                padding: "30px",
                textAlign: "center",
                cursor: "pointer",
                minHeight: "150px",
                position: "relative",
            }}
        >
            <input {...getInputProps()} />
            {loading ? (
                <CircularProgress sx={{ color: "#ec8817" }} />
            ) : (
                <Typography>Glissez et déposez vos images ici ou cliquez pour parcourir vos fichiers</Typography>
            )}
        </Box>
    );
};

export default ImageUpload;
