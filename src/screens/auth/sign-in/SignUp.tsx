import { Pressable, StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import Stack from "../../../shared/stacks/stack";
import { useForm, Controller } from "react-hook-form";
import SimpleInput from "../../../shared/Inputs/SimpleInput";
import IconButton from "../../../shared/buttons/icon-button";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import AuthWrapper from "../../../shared/wrappers/auth-wrapper";
import { useSignupMutation } from "../../../services/auth";
import { Toast } from "toastify-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setLogin } from "../../../services/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";

type Inputs = {
  email: string;
  password: string;
  username: string;
};

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgetPassword: undefined;
};

const SignUp = () => {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const [signup, { isLoading, isSuccess, isError, data }] = useSignupMutation();
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = async (data: Inputs) => {
    await signup(data).unwrap();
  };

  const storeData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (data && data.token) {
        let user = {
          token: data.token,
          user: data.user,
        };
        storeData(user);
        dispatch(setLogin());
      } else {
        Toast.error("Something went wrong");
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError && data) {
      Toast.error(
        data.error?.message || "Something went wrong. Please try again."
      );
    }
  }, [isError, data]);

  return (
    <AuthWrapper text="You can sync your favourites, downloads. Start now by signing in.">
      <Stack>
        <Controller
          control={control}
          name="username"
          rules={{ required: "User Name is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <SimpleInput
              label="User Name"
              placeholder="Enter unique user name"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              required={true}
            />
          )}
        />
        {errors.username && (
          <Text style={styles.errorText}>{errors.username.message}</Text>
        )}
      </Stack>
      <Stack mt={15}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <SimpleInput
              label="Email"
              placeholder="Enter your email"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              required={true}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
      </Stack>

      <Stack mt={15}>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <SimpleInput
              label="Password"
              placeholder="Enter your password"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              password={true}
              required={true}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
      </Stack>

      <Stack mt={20}>
        <IconButton
          isLoading={isLoading}
          text="Sign Up"
          style={{ borderRadius: 10 }}
          onPress={handleSubmit(onSubmit)}
        />
      </Stack>
      <Stack style={{ flexDirection: "row", justifyContent: "center", gap: 5 }}>
        <Pressable
          style={{ marginTop: 12 }}
          onPress={() => navigator.navigate("Login")}
        >
          <Text
            style={{
              fontSize: 16,
              textDecorationLine: "underline",
              fontWeight: 700,
            }}
          >
            Back To Login
          </Text>
        </Pressable>
      </Stack>
    </AuthWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  errorText: { color: "red", marginBottom: 10 },
});
