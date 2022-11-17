import React,{ useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

function Signinform() {

  const [data , setData] = useState({email: '', password: ''})

  const inputHandler = (e)=>{
    setData({...data,[e.target.name]: e.target.value})
  }


  const submitHandler=(e)=>{
    e.preventDefault();
    console.log(data)
  }
  return (
    <>
      <Box sx={{ heigh: "100vh", width: "60%", padding: "20px 4rem" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", marginTop: "4rem" }}>
          Login to Your Account
        </Typography>
        {/* Login form */}
        <Box
          component="form"
          noValidate
          sx={{ mt: 4, width: "80%", textAlign: "center" }}
          onSubmit={submitHandler}
        >
          <div className="TextField-without-border-radius">
            <TextField
              margin="normal"
              required
              fullWidth
              size="mid"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={data.email}
              onChange={inputHandler}
            />
          </div>
          <div className="TextField-without-border-radius">
            <TextField
              margin="normal"
              required
              fullWidth
              size="mid"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={data.password}
              onChange={inputHandler}
            />
          </div>
          <Button
            style={style.button}
            type="submit"
            variant="contained"
            size="medium"
            sx={{
              width: "15vw",
              bgcolor: "#7f7fd5",

              color: "#FFF",
              "&:hover": {
                bgcolor: "#7f7fd5",
              },
            }}
          >
            Sign In
          </Button>
        </Box>
        <Grid container width="80%">
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

const style = {
  Box: {
    background: "linear-gradient(to left, #91eae4, #86a8e7, #7f7fd5)",
    width: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    p: 4,
  },
  button: {
    margin: "0.8rem 0",
    borderRadius: "2rem",
    padding: "1rem 0.8rem",
    width: "15rem",
    textTransform: "none",
  },
};

export default Signinform;
