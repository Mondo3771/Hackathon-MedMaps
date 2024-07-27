const removeDuplicates = (array) => {
  return array.filter((item, index) => array.indexOf(item) === index);
};


const searchFunction = ({ array, searchValue }) => {

  const searchElements = searchValue.split(" ");
  let i = 0;
  let filterArrays = [];

  while (i < searchElements.length) {
    const value = searchElements[i];
    const response = array.filter((element) => {
      if (element.specialties) {
        let specialtyNum = 0;
        while (specialtyNum < element.specialties.length) {
          if (element.specialties[specialtyNum].includes(value)) return element;
          specialtyNum = specialtyNum + 1;
        }
      }

      if (element.name.includes(value)) return element;
    });

    filterArrays = [...filterArrays, ...response];
    i = i + 1;
  }
  return filterArrays
};


const formatDateTime = (input) => {
  const newDate = new Date(input);
  const timeHourMin = newDate.toLocaleTimeString().split(" ")[0].split(":").slice(0,2)
  if (timeHourMin[0] < 10) timeHourMin[0] = "0"+ timeHourMin[0]
 
  return timeHourMin[0] + ":" + timeHourMin[1]

}

const setLocalStroge = ({key,value}) => {
  return localStorage.setItem(key, JSON.stringify(value));
}

const fetchLocalStroge = ({key}) => {
  return JSON.parse(localStorage.getItem(key));
}
export {searchFunction,formatDateTime, setLocalStroge,fetchLocalStroge}
