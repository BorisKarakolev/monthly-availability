import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "./Modal";

const Slots = ({ slots }) => {
  const [open, setOpen] = useState(false);
  const [clickedSlot, setClickedSlot] = useState(null);

  const today = new Date().getDate();
  const handleModal = () => setOpen(!open);

  return (
    <div
      onClick={() => handleModal()}
      className="w-full h-full flex items-center justify-center p-10"
    >
      <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {slots?.map((slot, i) => (
          <div
            key={i}
            onClick={() => {
              setClickedSlot(slot);
              handleModal();
            }}
            className="bg-wannasport-1 h-28 w-52 rounded-xl flex flex-col space-y-3 text-center hover:opacity-90 cursor-pointer p-3 transition-all ease-in-out duration-150"
          >
            <span>
              {today <= parseInt(slot.slotDate?.slice(8, 10))
                ? slot.slotDate
                : null}
            </span>
            <span>{slot.slotPools.length} available slots</span>
          </div>
        ))}
      </div>
      <Modal open={open} handleClose={handleModal} clickedSlot={clickedSlot} />
    </div>
  );
};

const mapStateToProps = ({ slots }) => {
  return { slots };
};

export default connect(mapStateToProps)(Slots);
