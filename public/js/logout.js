const logout = async() =>{
    try{
        const res = await axios({
            method : 'GET',
            url : 'http://localhost:3001/api/v1/users/logout'
        });
        if(res.data.status === 'Success') location.reload(true);
    }   
    catch(err){
        alert('error','Error logging please try again!');
    }
};

const logOutBtn = document.querySelector('.nav__el--logout');
if(logOutBtn){
    console.log("ifin ici");
    logOutBtn.addEventListener('click',logout)
};