module.exports = {
  random() {
    const segment = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };

    return `${segment()}-${segment()}-${segment()}`;
  },

  // Takes an array and randomly picks members based on the size
  // specified and returns the new array.
  arrayRandom(list, size) {
    return list.sort(() => 0.5 - Math.random()).slice(0, size);
  },
};
