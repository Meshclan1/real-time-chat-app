// tsrafce is a VSCode shortcut

// Image shown to user while page is loading
import Image from "next/image";

import React from "react";

type Props = { size?: number };

const LoadingLogo = ({ size = 180 }: Props) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Image
        src="/logo.svg"
        alt="logo"
        width={size}
        height={size}
        className="animate-pulse duration-800"
      />
    </div>
  );
};

export default LoadingLogo;
