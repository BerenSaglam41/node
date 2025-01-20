const login = async(email, password) => {
    console.log('Email:', email);
    console.log('Password:', password);
    try{
        const res = await axios({
            method : 'POST',
            url : 'http://localhost:3001/api/v1/users/login',
            data : {
                email,
                password
            }
        });
        console.log(res);
    }
    catch(err){
        console.log(err.response.data);
    }
};
console.log("selam");
document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault(); 
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;



    login(email, password); 
});