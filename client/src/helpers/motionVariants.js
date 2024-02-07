const motionvariants = {
  variantStageFour: {
    hidden: { display: "none" },
    visible: {
      display: "flex",
      transition: { delay: 0.5, delayChildren: 0.5, staggerChildren: 0.2 },
    },
  },

  itemAccept: {
    hidden: {
      scale: 0,
      rotate: 0,
      y: 0,
    },
    visible: {
      y: [0, 0, 10, 0, 0, 0, 0, 0, 0],
      scale: [0, 1.2, 1, 1, 1, 1, 1, 1, 1],
      rotate: [0, 0, 0, 0, 0, 0, -15, 20, 0],
      transition: { duration: 1 },
    },
  },

  variantStageThree: {
    hidden: { display: "none" },
    visible: {
      display: "flex",
      transition: { delay: 0.4, delayChildren: 0.4, staggerChildren: 0.2 },
    },
  },

  variantStageTwo: {
    hidden: { display: "none" },
    visible: {
      display: "flex",
      transition: { delay: 0.4, delayChildren: 0.4, staggerChildren: 0.2 },
    },
  },
  rootPanelApperance: {
    hidden: { display: "none" },
    visible: {
      display: "flex",
      transition: { delay: 1 },
    },
  },

  usersContainer: {
    hidden: { display: "none", opacity: 1, scale: 0 },
    visible: {
      display: "flex",
      opacity: 1,
      scale: 1,
      transition: { delay: 1, delayChildren: 1.4, staggerChildren: 0.2 },
    },
  },
  messagesContainer: {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delayChildren: 0.4, staggerChildren: 1.5 },
    },
  },
  shadowBox: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  },
  itemShadow: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.7 } },
  },
  itemTop: {
    hidden: { y: -1200 },
    visible: {
      y: 0,
      transition: { type: "spring", damping: 16 },
    },
  },
  itemLeft: {
    hidden: { x: -1200 },
    visible: {
      x: 0,
      transition: { type: "spring", damping: 16 },
    },
  },
  itemRight: {
    hidden: { x: 1200 },
    visible: {
      x: 0,
      transition: { type: "spring", damping: 16 },
    },
  },

  itemBottom: {
    hidden: { y: 1200 },
    visible: {
      y: 0,
      transition: { type: "spring", damping: 16 },
    },
  },

  item: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { type: "spring", damping: 16 },
    },
  },
};
export default motionvariants;
