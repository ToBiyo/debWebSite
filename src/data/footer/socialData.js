const instagramUrl = import.meta.env.PUBLIC_INSTAGRAM;
const facebookUrl = import.meta.env.PUBLIC_FACEBOOK;

const socialsData = [
  {
    url: instagramUrl,
    icon: "mdi:instagram",
    color: "text-pink-500 text-5xl",
  },
  {
    url: facebookUrl,
    icon: "mdi:facebook",
    color: "text-blue-600 text-5xl",
  },
];

export default socialsData;
