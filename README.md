# Natours Node.js

If you want to use this code, create a `config.env` file with the following variables:

***Sorry for some issues in code***

---

### Postman Links
  - **AUTHORİZATİON--Script**:  
  `Bearer Token` - `pm.environment.set("jwt",pm.response.json().token);`

- **Get all tours**:  
  `GET` - `{{URL}}/api/v1/tours`

- **Get Tour By ID**:  
  `GET` - `{{URL}}/api/v1/tours/:ID`

- **Top 5 CHEAP TOUR**:  
  `GET` - `{{URL}}/api/v1/tours/top-5-cheap`

- **Tour Stats**:  
  `GET` - `{{URL}}/api/v1/tours/tour-stats`

- **Create a New Tour**:  
  `POST` - `{{URL}}/api/v1/tours`

- **Update a Tour**:  
  `PATCH` - `{{URL}}/api/v1/tours/:ID`

- **Delete a Tour**:  
  `DELETE` - `{{URL}}/api/v1/tours/:ID`

- **Get All Reviews**:  
  `GET` - `{{URL}}/api/v1/reviews/`

- **Get Review**:  
  `GET` - `{{URL}}/api/v1/reviews/:ID`

- **Create Review**:  
  `POST` - `{{URL}}/api/v1/reviews/:ID`

- **Update Review**:  
  `PATCH` - `{{URL}}/api/v1/reviews/:ID`

- **Delete Review**:  
  `DELETE` - `{{URL}}/api/v1/reviews/:ID`

- **Get Reviews for a Tour**:  
  `GET` - `{{URL}}/api/v1/tours/:ID/reviews`

- **Create a New Review on a Tour**:  
  `PATCH` - `{{URL}}/api/v1/tours/:ID/reviews`

- **Get All Users**:  
  `GET` - `{{URL}}/api/v1/users`

- **Get User**:  
  `GET` - `{{URL}}/api/v1/users/:ID`

- **Get Current User**:  
  `GET` - `{{URL}}/api/v1/users/me`

- **Update Current User Data**:  
  `PATCH` - `{{URL}}/api/v1/users/updateMe`

- **Delete User**:  
  `DELETE` - `{{URL}}/api/v1/users/:ID`

- **Delete Current User**:  
  `DELETE` - `{{URL}}/api/v1/users/deleteMe`

- **Sign Up**:  
  `POST` - `{{URL}}/api/v1/users/signup`

- **Login**:  
  `POST` - `{{URL}}/api/v1/users/login`

- **Forgot Password**:  
  `POST` - `{{URL}}/api/v1/users/forgotPassword`

- **Update Current Password**:  
  `PATCH` - `{{URL}}/api/v1/users/updateMyPassword`

- **Reset Password**:  
  `PATCH` - `{{URL}}/api/v1/users/resetPassword/:token`
  
- **Enviroment**:  
  `URL` - `http://localhost:3001/`
  `jwt` - `{{URL}}/api/v1/users/resetPassword/:token`
  `password` - `test1234`

---

### Config.env Variables
```plaintext
NODE_ENV = development
PORT = 3001
DATABASE = <Yours>
DATABASE_PASSWORD = <Yours>
DATABASE_LOCAL = <Yours>
JWT_SECRET = <Yours>
JWT_EXPIRES_IN = <Yours>
JWT_COOKIE_EXPIRES_IN = <Yours>
EMAIL_USERNAME = <Yours>
EMAIL_PASSWORD = <Yours>
EMAIL_HOST = <Yours>
EMAIL_PORT = <Yours>
EMAIL_FROM = <Yours>

Site PHotos 

![Image](https://github.com/user-attachments/assets/4637b2d0-1abb-4a45-962d-34fa35d8c875)

![Image](https://github.com/user-attachments/assets/98c6bdd5-78c3-472e-8823-072d3eea7db4)

![Image](https://github.com/user-attachments/assets/049298ea-575e-4bce-b785-7b6f6a33fa62)

![Image](https://github.com/user-attachments/assets/56a0de77-c65f-42de-93f5-57fa0d038b66)

