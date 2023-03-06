exports.errorHandler = (error) => {
    let err_msg = '';
    if (error.keyValue?.email != null && error.code === 11000) {
        err_msg = "Email already exist";
    }
    else if(error.keyValue?.employeeCode != null && error.code === 11000){
        err_msg = "Employee code already exist";
    }
     else {
        err_msg = error.message;
    }
    return err_msg; 
}

