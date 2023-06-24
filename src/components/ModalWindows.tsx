import { ReactNode } from "react";
import { useTheme, Theme } from "@mui/material/styles";
import { Box, Modal, ModalProps } from "@mui/material";

interface ICustomModalWindowProps extends Omit<ModalProps, "children"> {
  open: boolean;
  onCloseFunc: (value: boolean) => void;
  children: ReactNode;
}
export const ModalWindow = ({
  open,
  onCloseFunc,
  children,
}: ICustomModalWindowProps): JSX.Element => {
  const theme: Theme = useTheme();

  const handleClose = () => onCloseFunc(false);

  return (
    <Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            maxWidth: {
              xs: "80vw",
              sm: "80vw",
              md: "60vw",
              lg: "50vw",
              xl: "40vw",
            },
            maxHeight: "85vh",
            overflowY: "auto",
            padding: "1.5rem",
            backgroundColor: theme.palette.background.light,
            borderRadius: "0.5rem",
            transform: "translate(-50%, -50%)",
          }}
        >
          {children}
        </Box>
      </Modal>
    </Box>
  );
};
