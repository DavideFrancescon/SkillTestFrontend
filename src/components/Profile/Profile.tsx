import { Button, TextField } from "@mui/material";
import axios from "axios";
import userModel from "model/userModel";
import { HexColorPicker } from "react-colorful";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addUser, changeRandomColor } from "redux/userReducer";
import { RootState } from "store";

interface UserForm {
  name: string;
  email: string;
  favorite_color: string;
  hated_color: string;
  lucky_color: string;
  random_color: string;
}

function Profile() {
  const user: userModel = useSelector((state: RootState) => state.user);
  const url: string | undefined = process.env.REACT_APP_URLBACK;

  const dispatch = useDispatch();
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      favorite_color: user.favorite_color,
      hated_color: user.hated_color,
      lucky_color: user.lucky_color,
      random_color: user.random_color,
    },
  });


  function changeRandomColorFunc() {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    axios
      .put(
        url + "/api/change_random_color",
        {
          random_color: randomColor,
        },
        {
          headers: {
            "x-access-token": user.jwt,
          },
        }
      )
      .then(() => {
        dispatch(changeRandomColor(randomColor));
        setValue("random_color", randomColor);
      });
  }
  const onSubmit = (data: UserForm) => {
    axios
      .put(
        url + "/api/user",
        {
          name: data.name,
          email: data.email,
          favorite_color: data.favorite_color,
          hated_color: data.hated_color,
          lucky_color: data.lucky_color,
          random_color: data.random_color,
        },
        {
          headers: {
            "x-access-token": user.jwt,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        dispatch(addUser(response.data));
        setValue("lucky_color", response.data.lucky_color);
      });
  };

  return (
    <>
      <div className="flex flex-col h-[100vh]">
        <div className=" w-full h-[5vh] pt-[3vh]">
          <div className="m-auto w-fit h-full">
            <Link to={"/dashboard/home"}>Home page</Link>
          </div>
        </div>
        <div className="m-auto w-full">
          <div>
            <form className="flex flex-col gap-y-6 rounded-md bg-white w-3/5 mx-auto p-8">
              <div className="m-auto w-fit text-2xl font-semibold">
                {" "}
                Your profile data
              </div>
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
                      disabled
                    />
                  </div>
                )}
              />
              <Controller
                name={"name"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="flex flex-row mx-auto w-3/5">
                    <TextField
                      onChange={onChange}
                      value={value}
                      label={"Name"}
                      className="w-full"
                      variant="outlined"
                      type="name"
                    />
                  </div>
                )}
              />
              <div className="flex flex-row mx-auto gap-x-4 items-stretch	">
                <Controller
                  name={"favorite_color"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="flex flex-col m-auto ">
                      <p>Favorite color</p>
                      <hr className="mb-2"></hr>
                      <HexColorPicker color={value} onChange={onChange} />
                    </div>
                  )}
                />
                <Controller
                  name={"hated_color"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="flex flex-col m-auto ">
                      <p>Hated color</p>
                      <hr className="mb-2"></hr>
                      <HexColorPicker color={value} onChange={onChange} />
                    </div>
                  )}
                />
              </div>

              <div className="flex flex-row mx-auto gap-x-4 items-stretch	">
                <Controller
                  name={"random_color"}
                  control={control}
                  render={({ field: { value } }) => (
                    <div className="flex flex-col m-auto  ">
                      <p>Random color</p>
                      <hr className="mb-2"></hr>
                      <div
                        className="w-[200px] h-[200px] rounded-lg"
                        style={{ backgroundColor: value }}
                      />
                      <div
                        className="hover:cursor-pointer bg-neutral-200 rounded-md mt-2 text-center"
                        onClick={() => {
                          changeRandomColorFunc();
                        }}
                      >
                        I don't like this color
                      </div>
                    </div>
                  )}
                />
                <Controller
                  name={"lucky_color"}
                  control={control}
                  render={({ field: { value } }) => (
                    <div className="flex flex-col m-auto">
                      <p>Your lucky color</p>
                      <hr className="mb-2"></hr>
                      <div
                        className="w-[200px] h-[200px] rounded-lg"
                        style={{ backgroundColor: value }}
                      />
                      <div className="mt-2">&#8203;</div>
                    </div>
                  )}
                />
              </div>
              <div className="m-auto w-3/5">
                <Button
                  onClick={handleSubmit(onSubmit)}
                  variant="outlined"
                  className="w-full m-auto"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
