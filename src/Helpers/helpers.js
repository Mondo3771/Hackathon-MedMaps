const removeDuplicates = (array) => {
    return array.filter((item,index) => array.indexOf(item) === index)
}

const searchValue = "TB Di a";   
const searchElements = searchValue.split(" ");
let i = 0;
let filterArrays = []

while (i < searchElements.length){
const value = searchElements[i]
const response = clinics.filter((clinic) => {
  if (clinic.specialties) {
    let specialtyNum = 0;
    while (specialtyNum < clinic.specialties.length) {
      if (clinic.specialties[specialtyNum].includes(value)) return clinic;
      specialtyNum = specialtyNum +1
    }
  }

  if (clinic.name.includes(value)) return clinic;
});

filterArrays = [...filterArrays,...response]
i = i + 1
}