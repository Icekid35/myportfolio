import React from "react";

type PageWrapperProps = {
  children: React.ReactNode;
};

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden relative">
      {children}
    </div>
  );
};

export default PageWrapper;