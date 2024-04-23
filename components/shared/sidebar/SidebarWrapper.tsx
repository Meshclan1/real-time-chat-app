import React from "react";

type Props = React.PropsWithChildren<{}>;

// tailwindcss - covering all parts of the screen
// tailwindcss - flex flex-col lg:flex-row (for mobile & desktop respectively)

const SidebarWrapper = ({ children }: Props) => {
  return (
    <div className="h-full w-full p-4 flex flex-col lg:flex-row">
      {children}
    </div>
  );
};

export default SidebarWrapper;
