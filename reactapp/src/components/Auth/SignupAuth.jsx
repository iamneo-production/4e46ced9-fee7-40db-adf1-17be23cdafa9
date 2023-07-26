function SignupAuth(values) {
    let error = {}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^[a-zA-Z0-9]{8,}$/
    const username_pattern = /^[a-zA-Z0-9]{3,}$/ //alpha numeric character
    const mobilenumber_pattern = /^[0-9]{10}$/
  
    if (!values.Email) {
      error.Email = "Email should not be empty";
    } else if (!email_pattern.test(values.Email)) {
      error.Email = "Invalid email format";
    } else {
        error.Email= "";
    }
  
=======
    const password_pattern = /^[a-zA-Z0-9]{8,}$/
    const username_pattern = /^[a-zA-Z0-9]{3,}$/ //alpha numeric character
    const mobilenumber_pattern = /^\d{10}$/;
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
    const password_pattern = /^[a-zA-Z0-9]{8,}$/
    const username_pattern = /^[a-zA-Z0-9]{3,}$/ //alpha numeric character
    const mobilenumber_pattern = /^\d{10}$/;
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
    const password_pattern = /^[a-zA-Z0-9]{8,}$/
    const username_pattern = /^[a-zA-Z0-9]{3,}$/ //alpha numeric character
    const mobilenumber_pattern = /^\d{10}$/;
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
    if (!values.Password) {
      error.Password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
      error.Password =
        "Password must be at least 8 characters long";
    } else {
        error.Password="";
    }
  
    if (!values.confirmPassword) {
      error.confirmPassword = "Confirm Password should not be empty";
    } else if (String(values.confirmPassword) !== String(values.Password)) {
      error.confirmPassword = "Confirm Password didn't match";
    } else {
        error.confirmPassword = "";
    }

    if (!values.Username) {
      error.Username = "Username should not be empty";
    } else if (!username_pattern.test(values.Username)) {
      error.Username =
        "Username must be at least 3 characters long and can only contain alphanumeric characters";
    } else {
        error.Username="";
    }
  
    if (!values.MobileNumber) {
      error.MobileNumber = "Mobile Number should not be empty";
    } else if (!mobilenumber_pattern.test(values.MobileNumber)) {
      error.MobileNumber = "Invalid Mobile Number format";
    } else {
        error.MobileNumber="";
    }
  
    if (!values.UserRole) {
      error.UserRole = "admin/user should be selected";
    } else {
        error.UserRole="";
    }
  
    return error;
  }
  
  export default SignupAuth;