import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import {
  CustomButton,
  CustomTextField,
  CustomTypography,
} from "../../features/components";
import { useAuth } from "../../contexts/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();
  const { str } = router.query; // クエリからidを取得

  useEffect(() => {
    const params = new URLSearchParams(str as string);
    setIsAdmin(params.get("isAdmin") === "true");
  }, [router.query]);

  const handleLogin = async () => {
    if (email === "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (email !== "" && password !== "") {
      login(email, password, isAdmin);
    }
  };

  const handleAdminLoginRedirect = () => {
    router.push("/login?isAdmin=true");
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <CustomTypography
          variant="h5"
          text={isAdmin ? "管理者ログイン" : "ユーザーログイン"}
        />
        <CustomTextField
          label="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          helperText={emailError ? "emailを入力してください" : ""}
        />
        <CustomTextField
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          helperText={passwordError ? "パスワードを入力してください" : ""}
        />
        <br />
        <CustomButton onClick={handleLogin} label="ログイン" />
        <br />
        {!isAdmin && (
          <CustomButton
            onClick={() => handleAdminLoginRedirect()}
            label="管理者としてログイン"
            color="warning"
          />
        )}
      </div>
    </Grid>
  );
};

export default Login;
