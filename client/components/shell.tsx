import { useMemo } from "react";

const Shell = ({
  alternateColor,
  rows = 4,
}: {
  alternateColor?: boolean;
  rows?: number;
}) => {
  const skeletonColor = useMemo(
    () => (alternateColor ? "bg-gray-100" : "bg-white"),
    [alternateColor]
  );
  return (
    <div className="flex flex-col w-full space-y-2 animate-pulse mt-2">
      <div className={`w-full h-12 ${skeletonColor} rounded-md`} />
      {rows >= 2 ? (
        <>
          <div className={`w-3/4 h-12 ${skeletonColor} rounded-md`} />
          {rows >= 3 ? (
            <>
              <div className={`w-1/2 h-12 ${skeletonColor} rounded-md`} />
              {rows >= 4 ? (
                <>
                  <div className={`w-1/4 h-12 ${skeletonColor} rounded-md`} />
                </>
              ) : null}
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default Shell;
