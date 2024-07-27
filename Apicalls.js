const GetAllHospital = () => {
    fetch('/api/Hospitals')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error:',error);
    })
  }
  const GetAHospital = () => {
    fetch(`/api/Hospitals?id=${1}`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error:',error);
    })
  }