export const GetAllHospital = () => {
    fetch('/api/Hospitals')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error:',error);
    })
  }
  export const GetAHospital = () => {
    fetch(`/api/Hospitals?id=${1}`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error:',error);
    })
  }

// // Kabelo Stuff
//   const formatTime = (date) => {
//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     let seconds = date.getSeconds();

//     // Pad the hours, minutes, and seconds with leading zeros, if necessary
//     hours = hours < 10 ? '0' + hours : hours;
//     minutes = minutes < 10 ? '0' + minutes : minutes;
//     seconds = seconds < 10 ? '0' + seconds : seconds;

//     // Format the time in the 'HH:mm:ss' format
//     return hours + ':' + minutes + ':' + seconds;
// };

// const open = new Date();
// open.setHours(8,0,0,0);
// const openingTime = formatTime(open);

// const close = new Date();
// close.setHours(14,0,0,0);
// const closingTime = formatTime(close);
// let data = {
//   id:6,
//   name :"Example Hospital" ,
//   address:"123 Street Ave",
//   tel :"123456789012" ,
//   openingTime: openingTime,
//   closingTime:closingTime,
//   isClinic:true,
//   public:true,
//   open24Hours:true,
//   email:"ecxample@gmail.com",
//   website:"example.com.ac.za",
//   key:"key15",
//   Specialties:"Orthopedics,Dermatology,Neurology"
// }

export const AddAHospital = (token,data)=>{
 fetch("/api/Hospitals", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorizatoin': token
    },
    body: JSON.stringify(data), // replace 'data' with the actual data you want to send
})
.then(response => response.json())
.then(data => console.log(data))
.catch((error) => console.error('Error:', error));
}

// const id=4; // this is the clinic ID that we get from local storage
export const GetNotification = (id) => {
  fetch(`/api/Notifications?id=${id}`)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch((error)=> {
    console.error("Error:",error);
  })
}



// data = {
//   id:7,
//   name:"Albertin Hospital",
// address:"123 Street Ave",
// tel :"123456789012" ,
// openingTime: '08:00:00',
// closingTime:'17:00:00',
// isClinic:true,
// public:true,
// open24Hours:true,
// email:"ecxample@gmail.com",
// website:"example.com.ac.za",
// key:"key15",
// Specialties:"Orthopedics,Dermatology,Neurology"
// };
export const UpdateAHospital = (data) => {
  fetch('/api/Hospitals',{
    method:'PUT',
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(data),
  })
  .then(res => res.json())
  .then(data => {console.log(data);
return data;})
  .catch((error)=> console.error('Error:',error));

}
// this is what it should look like
// data = {
//   title:"Tuesday Notification",
//   details:"We have the pills",
//   time : '2022-04-01 08:00:12',
//   clinicId:4
// };
export const PostNotification = (data) => {
  fetch(`/api/Notifications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data), 
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch((error)=> {
    console.error("Error:",error);
  })
}
//  data = {
//   clinicId: 4,
//   Capacity: '100',
//   Beds: 50,
//   EmergencyRooms: true,
//   Ailment: "Common Cold"
// };

export const UpdateClinic = (data) => {
  fetch(`/api/DailyUpdates`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch((error)=> {
      console.error("Error:",error);
  })
}
