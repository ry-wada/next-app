import React from "react";
import { CustomTypography } from "../../features/components";

const NotFoundPage = () => {
  return (
    <div>
      <CustomTypography variant="h4" text="404 Not Found" />
      <CustomTypography
        variant="body1"
        text="お探しのページは見つかりませんでした。"
      />
    </div>
  );
};

export default NotFoundPage;
