import Swal from 'sweetalert2';

export const sweetAlert = (type, title, message, callback, callback2, feature) => {
    Swal.fire({
        title: title,
        text: message,
        icon: type, 
        showCancelButton: feature,
        confirmButtonText: 'Okay',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        
        if (result.isConfirmed && callback) {
            callback();
        }else{
            if(callback2) callback2();
        } 
    });  
}

