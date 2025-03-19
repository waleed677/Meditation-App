import { StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import Stack from "../../../shared/stacks/stack";
import { useForm, Controller } from "react-hook-form";
import SimpleInput from "../../../shared/Inputs/SimpleInput";
import IconButton from "../../../shared/buttons/icon-button";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import AuthWrapper from "../../../shared/wrappers/auth-wrapper";
import { useVerifyOtpMutation } from "../../../services/auth";
import { Toast } from "toastify-react-native";

type Inputs = {
  otp: "";
};

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgetPassword: undefined;
  ResetPassword: { email: string };
};

const OtpScreen = () => {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const [verifyOtp, { isLoading, isSuccess, isError, data }] =
    useVerifyOtpMutation();
  const { email } = useRoute().params as { email: string };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: Inputs) => {
    let body = {
      email,
      otp: data.otp,
    };
    await verifyOtp(body).unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      if (data && data.status == "success") {
        Toast.success(data.msg);
        navigator.navigate("ResetPassword", { email });
      } else {
        Toast.error(data.msg);
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      Toast.error("Something went wrong");
    }
  }, [isError]);

  return (
    <AuthWrapper text="Enter otp receive on given email">
      <Stack>
        <Controller
          control={control}
          name="otp"
          rules={{
            required: "Otp is required",
            pattern: {
              value: /^\d{6}$/,
              message: "Otp must be exactly 6 digits",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <SimpleInput
              label="Otp"
              placeholder="Enter otp"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              required={true}
              maxLength={6}
              keyboardType="numeric"
            />
          )}
        />
        {errors.otp && (
          <Text allowFontScaling={false} style={styles.errorText}>
            {errors.otp.message}
          </Text>
        )}
      </Stack>

      <Stack mt={20}>
        <IconButton
          isLoading={isLoading}
          text="Submit"
          style={{ borderRadius: 10 }}
          onPress={handleSubmit(onSubmit)}
        />
      </Stack>
    </AuthWrapper>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  errorText: { color: "red", marginBottom: 10 },
});
