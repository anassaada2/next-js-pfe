export default [
  {
    label: "Accueil",

    url: "/",
  },
  {
    label: "a propos de nous",
    url: "/about",
  },
  {
    label: " Solutions & Réalisations",
    dropdown: [
      {
        label: "Services",
        url: "/services ",
      },

      {
        label: "Solutions innovantes",
        dropdown: [
          {
            label: "ECO-BOOT",
            url: "/service-details",
          },
          {
            label: "POLY-BOOT",
            url: "/service-details/poly-boot",
          },
        ],
      },
      {
        label: "Réalisations",
        url: "/realisations",
      },
    {
    label: "Login",
    url: "/auth/login",
  },
    ],
  },
  {
    label: "Calculette",
    url: "/calculette",
  },
  {
    label: "Contact",
    url: "/contact",
  },
];
