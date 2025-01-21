
const login = async(email, password) => {
    try{
        console.log(email);
        const res = await axios({
            method : 'POST',
            url : 'http://localhost:3001/api/v1/users/login',
            data : {
                email,
                password
            }
        });
        if(res.data.status === 'success') {
            alert('Succes','Logged in Succesfly');
            window.setTimeout(() =>{
                location.assign('/');
            },1500);
        }
    }
    catch(err){
        alert(err.response.data.message);
    }
};

document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault(); 
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password); 
});

