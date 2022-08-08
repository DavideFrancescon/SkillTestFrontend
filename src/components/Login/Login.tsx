import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser, addJwt } from "redux/userReducer";
import { useDispatch } from "react-redux";

const Login: React.FC = () => {
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const url: string | undefined = process.env.REACT_APP_URLBACK;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    axios
      .post(url + "/auth/login", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        console.log(response.data.user);
        dispatch(addJwt(response.data.token));
        dispatch(addUser(response.data.user));
        navigate("/dashboard");
      });
  };

  return (
    <div className="m-auto w-[100vw] h-[100vh] overflow-hidden">
      <Card className="flex flex-col max-w-xl h-[50vh] m-auto mt-[25vh] pt-20">
        <CardContent className="flex flex-col gap-y-10 p-30">
          <Typography variant="h2" className="text-center	">
            Login
          </Typography>

          <div className="flex flex-col gap-y-10">
            <Controller
              name={"email"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-row m-auto w-3/5">
                  <TextField
                    onChange={onChange}
                    value={value}
                    label={"Mail"}
                    className="w-full"
                    variant="outlined"
                    type="email"
                  />
                </div>
              )}
            />
            <Controller
              name={"password"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-row m-auto w-3/5">
                  <TextField
                    type={!seePassword ? "password" : "text"}
                    onChange={onChange}
                    value={value}
                    label={"Password"}
                    className="w-full"
                    variant="outlined"
                  />
                  <span
                    onClick={() => setSeePassword(!seePassword)}
                    className="mt-4 -ml-8 z-10"
                  >
                    <VisibilityIcon />
                  </span>
                </div>
              )}
            />
            <div className="m-auto w-3/5 flex flex-row -mt-10 hover:cursor-pointer">
              <Typography
                variant="caption"
                className="text-end w-full text-gray-600 hover:text-blue-600"
                onClick={() => {
                  navigate("/changePassword");
                }}
              >
                Hai dimenticato la password?
              </Typography>
            </div>
          </div>
          <div className="m-auto w-3/5">
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="outlined"
              className="w-full m-auto"
            >
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Login;
