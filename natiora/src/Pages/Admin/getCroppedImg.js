// export const getCroppedImg = async (imageSrc, pixelCrop) => {
//     const image = await createImage(imageSrc);
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
  
//     canvas.width = pixelCrop.width;
//     canvas.height = pixelCrop.height;
  
//     ctx.drawImage(
//       image,
//       pixelCrop.x,
//       pixelCrop.y,
//       pixelCrop.width,
//       pixelCrop.height,
//       0,
//       0,
//       pixelCrop.width,
//       pixelCrop.height
//     );
  
//     return new Promise((resolve) => {
//       canvas.toBlob((blob) => {
//         resolve(new File([blob], "cropped_image.jpg", { type: "image/jpeg" }));
//       }, "image/jpeg");
//     });
//   };
  
//   // Fonction pour créer une image à partir d'une URL
//   export const createImage = (url) =>
//     new Promise((resolve, reject) => {
//       const image = new Image();
//       image.addEventListener("load", () => resolve(image));
//       image.addEventListener("error", (err) => reject(err));
//       image.src = url;
//     });
  
// Fonction utilitaire pour charger une image depuis une URL
export const getCroppedImg = async (imageSrc, crop) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/jpeg");
  });
};

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.setAttribute("crossOrigin", "anonymous"); // Gérer les problèmes CORS
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
    image.src = url;
  });

