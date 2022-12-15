const axios = require("axios");

const getDate = (date) => {
  date = new Date(date);
  return `${date.getFullYear().toString()}-${date.getMonth().toString()}-${date
    .getDate()
    .toString()}`;
};

const getTime = (time) => {
  time = new Date(time);
  return `${time.getHours().toString()}:${time.getMinutes().toString()}${time
    .getSeconds()
    .toString()}`;
};

const getSlots = async (url) => {
  try {
    const slots = await axios.get(
      `${url}bookinggrid?fromDate=2022-11-30T23%3A00%3A00.000Z&days=31`
    );

    const sortedSlots = slots.data.days.map((day) => {
      day.slotDate = getDate(day.slotDate);
      day["slotPools"] = slots.data.slotPools[0].slots.map((slot) => {
        return {
          from: `${parseInt(slot.from)}:00`,
          to: `${parseInt(slot.to)}:00`,
        };
      });

      return day;
    });

    return sortedSlots;
  } catch (error) {
    console.error(error);
  }
};

const getBookedSlots = async (url) => {
  try {
    const bookedSlots = await axios.get(
      `${url}resourcebookings?from=2022-11-30T23%3A00%3A00.000Z&days=31`
    );

    const sortedBookedSlots = bookedSlots.data.map((slot) => {
      slot.startTs = {
        date: getDate(slot.startTs),
        time: getTime(slot.startTs),
      };
      slot.endTs = {
        date: getDate(slot.endTs),
        time: getTime(slot.endTs),
      };
      return slot;
    });

    return sortedBookedSlots;
  } catch (error) {
    console.error(error);
  }
};

const getData = async (url) => {
  const sortedSlots = await getSlots(url);
  const sortedBookedSlots = await getBookedSlots(url);
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
