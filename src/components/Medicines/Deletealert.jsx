import React from 'react';
import Swal from 'sweetalert2';
const DeleteAlert =async()=>{
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00a99d",
        cancelButtonColor: "red",
        confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
    await Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success",
      confirmButtonColor: "#00a99d",
      confirmButtonText: "OK"
    });
    return true;
  }

  return false;
};
 export default DeleteAlert;