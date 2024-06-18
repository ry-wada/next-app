import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Person from "@mui/icons-material/Person";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import { CustomButton, CustomTypography } from "../../features/components";

export const UserHeader: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const router = useRouter();
  const { cartItems } = useContext(CartContext); // カート内の商品を取得

  const handleCart = () => {
    router.push("/user/myCart");
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout(false); // ユーザー側はfalseでログアウト処理
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          style={{ textDecoration: "none", color: "white" }}
        >
          LH-EC-SHOP
        </Typography>
        <div>
          <IconButton color="inherit" onClick={handleCart}>
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Button onClick={handleClick} color="inherit">
            <Person />
          </Button>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItem
              component={Link}
              href="/user/myPage"
              onClick={handleClose}
            >
              マイページ
            </MenuItem>
            {isLoggedIn ? (
              <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
            ) : (
              <MenuItem
                component={Link}
                href="/login?isAdmin=false"
                onClick={handleClose}
              >
                ログイン
              </MenuItem>
            )}
          </Popover>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export const AdminHeader: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(true);
  };

  return (
    <AppBar position="fixed">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          href="/admin/home"
          style={{ textDecoration: "none", color: "white" }}
        >
          管理画面
        </Typography>
        <div>
          <CustomTypography
            variant="body1"
            text={"山田花子 さん"}
          ></CustomTypography>
          <CustomButton
            onClick={handleLogout}
            label="ログアウト"
            color="info"
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};
