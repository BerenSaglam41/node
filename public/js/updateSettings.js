const updateData =async (name,email) =>{
    try{
        const res = await axios({
            method : 'PATCH',
            url : 'http://localhost:3001/api/v1/users/updateMe',
            data : {
                name,
                email
            }
        });
        if(res.data.status === 'success'){
            alert('Success','Data updates succesfly');
        }
    }
    catch(err){
        alert('error',err.response.data.message);
    }
};

const userDataForm = document.querySelector('.form-user-data');
if(userDataForm){
    userDataForm.addEventListener('submit',e=>{
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        updateData(name,email);
    });
}