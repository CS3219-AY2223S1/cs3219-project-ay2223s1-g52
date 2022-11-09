export const getNewLines = (noOfLines) => {
  let newLines = "";
  for (let i = 1; i < noOfLines; i++) {
    newLines += "\n";
  }
  return newLines;
};

export const getTimeInMins = (ms) => {
  return Math.floor((ms / 1000 / 60) << 0);
};

export const getTimeInSeconds = (ms) => {
  return ms && Math.floor((ms / 1000) % 60);
};

export const isCollabType = (type) => {
  return type === "collab";
};
