import React, { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

const InputBase: React.FC<Props> = ({ title, children }) => {
  return (
    <div>
      <div>{title}</div>
      <div>{children}</div>
    </div>
  );
};

export default InputBase;
