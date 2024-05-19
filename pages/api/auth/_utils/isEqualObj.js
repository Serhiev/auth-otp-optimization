export const isEqualObj = (obj1, obj2, ignoreFields = []) => {
  // Get the keys of the first object
  const keys1 = Object.keys(obj1);
  // Get the keys of the second object
  const keys2 = Object.keys(obj2);
  
  // Remove ignored fields from the keys
  const filteredKeys1 = keys1.filter(key => !ignoreFields.includes(key));
  const filteredKeys2 = keys2.filter(key => !ignoreFields.includes(key));
  
  // Check if the number of keys is the same
  if (filteredKeys1.length !== filteredKeys2.length) {
      return false;
  }
  
  // Check if all non-ignored keys have the same values in both objects
  for (let key of filteredKeys1) {
      if (obj1[key] !== obj2[key]) {
          return false;
      }
  }
  
  // If all non-ignored keys and values are the same, return true
  return true;
};
