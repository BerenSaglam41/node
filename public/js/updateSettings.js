// type is either password or data
const updateSettings =async (data,type) =>{
    try{
        const url = type ==='password' ? 'http://localhost:3001/api/v1/users/updateMyPassword' : 'http://localhost:3001/api/v1/users/updateMe';

        const res = await axios({
            method : 'PATCH',
            url ,
            data
        });
        console.log(res.data);
        if (res.data.status === 'Succes') {
            alert(`${type} Updated Successfully! Please Refresh The Page`);
        }
    }
    catch (err) {
        console.error(err); // Hata loglama
        alert(err.response?.data?.message || 'An error occurred');
    }
};

const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
if(userDataForm){
    userDataForm.addEventListener('submit',e=>{
        e.preventDefault();
        const form = new FormData();
        form.append('name',document.getElementById('name').value);
        form.append('email', document.getElementById('email').value);
        form.append('photo',document.getElementById('photo').files[0]);
        console.log(form);
        updateSettings(form,'data');
    });
}
if(userPasswordForm){
    userPasswordForm.addEventListener('submit',async e=>{
        document.querySelector('.btn--save-password').textContent = 'Updating...';

        e.preventDefault();
        const passwordCurrent = document.getElementById('password-current').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        await updateSettings({passwordCurrent,password,passwordConfirm},'password');
        document.querySelector('.btn--save-password').textContent = 'Save Password';

        document.getElementById('password-current').value = '';
        document.getElementById('password').value = '';
        document.getElementById('password-confirm').value = '';
    });
}