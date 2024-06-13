import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { BoxContainer } from "../../styles";
import { CustomButton } from "../../features/components";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  isSuccess: boolean | null;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  open,
  onClose,
  isSuccess,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={BoxContainer}>
        <Typography variant="h6">
          {isSuccess === true
            ? "商品の登録に成功しました"
            : "商品の登録に失敗しました"}
        </Typography>
        <CustomButton onClick={onClose} label="閉じる" />
      </Box>
    </Modal>
  );
};

export default AddProductModal;
