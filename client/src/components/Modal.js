import React from "react";

const Modal = ({ open, handleClose, clickedSlot }) => {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-full ${
        open ? "flex" : "hidden"
      }  items-center justify-center z-10`}
    >
      <div className="w-full h-full text-wannasport-2 bg-wannasport-3 md:w-1/2 xl:w-1/4 xl:h-2/4 rounded-xl fixed p-10">
        <div
          className="absolute top-30 right-5 sm:top-3 sm:right-3 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center z-10 cursor-pointer"
          onClick={() => handleClose()}
        ></div>
        <div className="w-full h-full text-xl space-y-10">
          <span className=" font-bold">
            Available slots for {clickedSlot?.slotDate}
          </span>
          <div className="text-start space-y-4">
            {clickedSlot?.slotPools.map((pool) => (
              <div key={pool.from} className="w-full grid grid-flow-col grid-cols-3 text-center">
                <span>{pool?.from.slice(0, 5)}</span>
                -
                <span>{pool?.to.slice(0, 5)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
