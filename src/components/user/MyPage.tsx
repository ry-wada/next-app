import React from "react";
import { Container, Card, CardContent, Grid } from "@mui/material";
import UserFooter from "../common/Footer";
import { UserHeader } from "../common/Header";
import { BodyText, HeaderSpace } from "../../styles";
import { useAuth } from "../../contexts/AuthContext";
import { CustomTypography } from "../../features/components";

const MyPage: React.FC = () => {
  const { user } = useAuth(); // ユーザー情報を取得

  return (
    <>
      <UserHeader />
      <HeaderSpace />
      <Container>
        <BodyText>マイページ</BodyText>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                {user ? (
                  <>
                    <CustomTypography variant="subtitle1" text="名前:" />
                    <CustomTypography variant="h5" text="山田花子" />
                    <br></br>
                    <CustomTypography
                      variant="subtitle1"
                      text="メールアドレス:"
                    />
                    <CustomTypography variant="h5" text={user.email} />
                  </>
                ) : (
                  <>
                    <CustomTypography
                      variant="h5"
                      text="ログインしてください。"
                    />
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <UserFooter />
    </>
  );
};

export default MyPage;
