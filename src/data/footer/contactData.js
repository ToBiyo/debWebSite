const phoneNumber = import.meta.env.PUBLIC_PHONE;
const address = import.meta.env.PUBLIC_ADDRESS;

const contacts = [
  {
    value: phoneNumber,
    icon: "mdi:phone",
    color: "text-pink-500 text-2xl",
  },
  {
    value: phoneNumber + " (WhatsApp)",
    icon: "mdi:whatsapp",
    color: "text-green-500 text-2xl",
  },
  {
    value: address,
    icon: "mdi:map-marker",
    color: "text-red-500 text-2xl",
  },
];

export default contacts;
