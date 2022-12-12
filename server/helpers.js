const axios = require("axios");

const getSlots = async (urlFree) => {
  try {
    const slots = await axios.get(urlFree);

    const sortedSlots = slots.data.days.map((day) => {
      day.slotDate = day.slotDate.split("T")[0];
      day["slotPools"] = slots.data.slotPools[0].slots;
      return day;
    });

    return sortedSlots;
  } catch (error) {
    console.error(error);
  }
};

const getBookedSlots = async (urlBooked) => {
  try {
    const bookedSlots = await axios.get(urlBooked);

    const sortedBookedSlots = bookedSlots.data
      .map((slot) => {
        slot.startTs = {
          date: slot.startTs.split("T")[0],
          time: slot.startTs.split("T")[1].slice(0, 8),
        };
        slot.endTs = {
          date: slot.endTs.split("T")[0],
          time: slot.endTs.split("T")[1].slice(0, 8),
        };
        return slot;
      })
      .sort((a, b) => a.startTs.date.localeCompare(b.startTs.date));

    return sortedBookedSlots;
  } catch (error) {
    console.error(error);
  }
};

const getData = async (urlFree, urlBooked) => {
  const sortedSlots = await getSlots(urlFree);
  const sortedBookedSlots = await getBookedSlots(urlBooked);
  try {
    sortedSlots.forEach((slot) => {
      sortedBookedSlots.forEach((bookedSlot) => {
        if (slot.slotDate === bookedSlot.startTs.date) {
          slot.slotPools = slot.slotPools.filter(
            (pool) =>
              pool.from !== bookedSlot.startTs.time &&
              pool.to !== bookedSlot.endTs.time
          );
        }
      });
    });

    return sortedSlots;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getSlots,
  getBookedSlots,
  getData,
};
