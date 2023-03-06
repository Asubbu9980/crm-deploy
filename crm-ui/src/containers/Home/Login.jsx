import React, { useContext, useEffect } from 'react'
import {
   Avatar, Box, Button, Card, CardContent, TextField, FormControlLabel, Checkbox,
   Link, Grid, Typography, IconButton, InputAdornment
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import styled from "styled-components";
import LoginBgImage from "src/assets/images/crm-login-bg.png";
import { employeeAuth, employeeLogin } from 'src/apis/employees';
import { useNavigate } from 'react-router-dom';
import { error, success } from 'src/hooks/Toasters';
import LoaderContext from 'src/context/LoaderContext';
import MicrosoftLogin from "react-microsoft-login";

const BgBox = styled(Box)`
    background: url(${LoginBgImage});
    background-size:cover; 
    background-repeat: no-repeat
`
const employeePayload = {
   email: "subrahmanyam.annavaram@motivitylabs.com",
   password: "test@123"
}
const LoginContent = styled.div`
.login-main {
   max-width: 450px;
    width: 100%;
    text-align: center;
    margin-top: -5rem;
    margin: 20px;
}
`
const Login = () => {
   const { startLoading } = useContext(LoaderContext);

   const [employee, setEmployee] = React.useState(employeePayload)
   const [errPayload, setErrPayload] = React.useState({})
   const [showPassword, setShowPassword] = React.useState(false);
   const handleClickShowPassword = () => setShowPassword((show) => !show);
   const navigate = useNavigate();

   useEffect(() => {
      checkIsAuthenticated();
   }, [])

   const checkIsAuthenticated = async () => {
      startLoading(true);
      employeeAuth().then(res => {
         startLoading(false);
         if (res.status === 200) {
            navigate('/dashboard/analytics')
         }
      })
   }

   const handleOnChange = (e) => {
      setEmployee({
         ...employee,
         [e.target.name]: e.target.value
      })
      setErrPayload({
         ...errPayload,
         [e.target.name]: e.target.value
      })

   }

   const validateDetailsPayload = () => {
      if (employee.email === "" || employee.password === "") {
         return false
      }
      return true
   }

   const handleSubmit = (event) => {
      event.preventDefault();
      if (validateDetailsPayload()) {
         startLoading(true);
         employeeLogin(employee).then(res => {
            startLoading(false);
            if (res.status === 200) {
               success(res.message);
               navigate('/dashboard/analytics')
               setEmployee(employeePayload);
            } else {
               error(res.message);
            }
         })
      }
      else {
         setErrPayload(employee);
      }
   }

   const MSloginHandler = (error, authData, msalInstance) => {
      error && console.log(error);
      if (!error && authData) {         
         //setMsalInstance(msalInstance);
         //navigate('/dashboard/analytics');
         //axios.get("https://graph.microsoft.com/v1.0/me", {headers: {Authorization: "Bearer " + authData.accessToken}}).then((res) => {console.log(res);})
         //navigate('/dashboard/analytics');
         
      }
      //authData && navigate('/dashboard/analytics');
   }
   return (
      <BgBox>
         <Box display={'flex'} alignItems={'center'} justifyContent={'center'} minHeight={450} height={'calc(100vh - 64px)'}>
            <Box className='login-main' marginTop={-3} padding={2} maxWidth={450} width={'100%'} textAlign={'center'}>
               <Card>
                  <CardContent>
                     <Box p={2}>
                        <Avatar className="mx-auto" sx={{ m: 1, bgcolor: "secondary.main" }}>
                           <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5"> Login </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate mt={1} >
                           <TextField type={'email'} id="email" label="Email" name="email" value={employee.email} onChange={handleOnChange} margin="normal" required fullWidth autoFocus
                              InputProps={{
                                 endAdornment: <InputAdornment position="end">
                                    <EmailIcon />
                                 </InputAdornment>
                              }}
                              error={errPayload && errPayload.email === ''} helperText={(errPayload && errPayload.email === '') ? 'Email is Required' : ""} size="small"
                           />
                           <TextField type={showPassword ? 'text' : 'password'} id="password" label="Password" value={employee.password} name="password" onChange={handleOnChange} margin="normal" required fullWidth
                              InputProps={{
                                 endAdornment: <InputAdornment position="end">
                                    <IconButton
                                       aria-label="toggle password visibility"
                                       onClick={handleClickShowPassword}
                                       edge="end"
                                    >
                                       {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                 </InputAdornment>
                              }}
                              error={errPayload && errPayload.password === ''} helperText={(errPayload && errPayload.password === '') ? 'Password is Required' : ""} size="small"
                           />
                           {/* <FormControlLabel style={{ float: 'left' }} control={<Checkbox value="remember" color="primary" />}
                              label="Remember me" /> */}
                           <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
                              Sign In
                           </Button>
                           <Box sx={{ mb: 1 }}>
                              or
                           </Box>
                           <Box mb={2}>
                              <MicrosoftLogin
                                 //clientId='c644fb23-2d56-4d08-bc2f-8c2b3d683695'
                                 clientId='c644fb23-2d56-4d08-bc2f-8c2b3d683695'
                                 debug={true}
                                 withUserData={true}
                                 authCallback={MSloginHandler}
                                 useLocalStorageCache={true}
                                 graphScopes={["user.read"]}
                                 redirectUri={"http://localhost:3000"}
                                 //redirectUri={window.location.href} 
                              />
                           </Box>
                           <Box textAlign={'start'}>
                              <Grid container>
                                 <Grid item sm={5}>
                                    <Link href="#" variant="body2" underline="none"> Forgot password? </Link>
                                 </Grid>
                                 <Grid item sm={7}>
                                    <Link href="#" variant="body2" underline="none"> Don't have an account? Sign Up </Link>
                                 </Grid>
                              </Grid>
                           </Box>
                        </Box>
                     </Box>
                  </CardContent>
               </Card>
            </Box>
         </Box>
      </BgBox>
   );
}

export default Login;