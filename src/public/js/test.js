const infoCustomer = document.querySelector("#infocustomer");
const alertSuccess = document.querySelector('.success-info');
const alertErr = document.querySelector('.error-info');
const radioMale = document.querySelector('#male');
const radioFemale = document.querySelector('#female');

infoCustomer &&
  infoCustomer.addEventListener("submit", async (e) => {
    e.preventDefault();

    let formData = new FormData(infoCustomer);

    const registerData = {
      username: formData.get('username'),
      gender: radioMale.checked == true ? 'male' : 'female',
    };

    try {
      const response = await axios.post("/user/update", registerData);
      if (response.status === 200) {
        alertSuccess.style.display = 'block';
      }
    } catch (error) {
      console.log('lỗi');
      alertErr.style.display = 'block';
    } finally {

    }
  });

//change Password
const changepassword = document.querySelector('#changepassword');
const successchangepass = document.querySelector('.success-changepass');
const errorchangepass = document.querySelector('.error-changepass');
changepassword &&
  changepassword.addEventListener("submit", async (e) => {
    e.preventDefault();

    let formData = new FormData(changepassword);
    
    const passData = {
        oldPass: formData.get('old_password'),
        newPass: formData.get('new_password'),
    };

    try {
      const response = await axios.post("/user/updatePassword", passData);
      if (response.status === 200) {
        successchangepass.style.display = 'block';
      }
    } catch (error) {
      errorchangepass.style.display = 'block';
    } finally {}
  });


