import { useState } from "react";
import { Box, Skeleton } from "@mui/material";

interface IImageItemCityProps {
  imagePath: string;
  size?: string;
  alt?: string;
  borderRadius: string | null;
}

export const ImageItemCity = ({
  imagePath,
  size = "80px",
  alt = "Current Photo",
  borderRadius = null,
}: IImageItemCityProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleImageLoaded = () => setIsLoading(false);

  const handleImageError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        width: size,
        height: size,
        borderRadius: borderRadius ? borderRadius : null,
        overflow: "hidden",
      }}
    >
      <img
        style={{
          objectFit: "cover",
          opacity: isLoading ? 0 : 1,
        }}
        width={size}
        height={size}
        alt={alt}
        src={imagePath}
        onLoad={handleImageLoaded}
        onError={handleImageError}
      />

      {isLoading && (
        <Box sx={{ position: "absolute" }}>
          <Skeleton sx={{ width: size, height: size }} animation="wave" />
        </Box>
      )}

      {error && (
        <Box position="absolute">
          <Skeleton
            variant="circular"
            width={size}
            height={size}
            animation="wave"
          />
        </Box>
      )}
    </Box>
  );
};
