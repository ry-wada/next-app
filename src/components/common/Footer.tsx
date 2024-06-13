import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { URLs } from "../../lib/config";

const UserFooter: React.FC = () => {
  return (
    <AppBar style={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <div>
          <Button href={URLs.会社情報} color="inherit">
            会社情報
          </Button>
          <Button href={URLs.LHについて} color="inherit">
            LHについて
          </Button>
          <Button href={URLs.利用規約} color="inherit">
            利用規約
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default UserFooter;
