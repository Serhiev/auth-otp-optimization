export const isEqualObj = (obj1, obj2) => {
  // Get the keys of the first object
  const keys1 = Object.keys(obj1);
  // Get the keys of the second object
  const keys2 = Object.keys(obj2);
  
  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
      return false;
  }
  
  // Check if all keys have the same values in both objects
  for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
          return false;
      }
  }
  
  // If all keys and values are the same, return true
  return true;
}

