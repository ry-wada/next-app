//カスタムコンポーネント
import React from "react";
import { Button, TextField, Typography } from "@mui/material";

interface CustomTextFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  helperText: string;
  type?: string;
  required?: boolean;
  name?: string;
}

export const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  error,
  helperText,
  required = false,
  name,
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      required={required}
      error={error}
      helperText={helperText}
      type={type}
      name={name}
    />
  );
};

interface CustomButtonProps {
  onClick?: () => void;
  label: string;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  label,
  color = "primary",
}) => {
  return (
    <Button variant="contained" onClick={onClick} color={color}>
      {label}
    </Button>
  );
};

interface CustomTypographyProps {
  variant: "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2";
  text: string | number;
}

export const CustomTypography: React.FC<CustomTypographyProps> = ({
  variant,
  text,
}) => {
  return <Typography variant={variant}>{text}</Typography>;
};
