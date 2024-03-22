import loadingOutlined from "@iconify-icons/mdi/loading";
import { Icon } from "@iconify/react";

import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-[70vw]">
      <Icon
        icon={loadingOutlined}
        fontSize={40}
        className="animate-spin"
      />
    </div>
  );
};

export default Loader;
