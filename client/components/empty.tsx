import Image from "next/image";
import { ReactNode } from "react";

const Empty = ({
  title,
  size = 300,
  src,
}: {
  title?: ReactNode;
  size?: number;
  src?: string;
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className={`w-full flex justify-center items-center m-10 `}>
        <Image
          src={src || "/empty.svg"}
          alt="Unavailable"
          width={size}
          height={size}
        />
      </div>
      <div>
        <p className="text-base text-center">{title}</p>
      </div>
    </div>
  );
};

export default Empty;
