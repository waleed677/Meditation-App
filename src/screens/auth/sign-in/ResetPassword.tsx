import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import MainWrapper from '../../../shared/wrappers/main-wrapper'
import UserLabelIcon from '../../../../assets/vendors/user-label-icon'
import Stack from '../../../shared/stacks/stack'
import Typography from '../../../shared/typography/typography'
import { useForm, Controller } from 'react-hook-form'
import SimpleInput from '../../../shared/Inputs/SimpleInput'
import IconButton from '../../../shared/buttons/icon-button'
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'
import AuthWrapper from '../../../shared/wrappers/auth-wrapper'
import { useResetPasswordMutation } from '../../../services/auth'
import { Toast } from 'toastify-react-native'

type Inputs = {
    password: string
    confirmPassword: string
}

type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    ForgetPassword: undefined;
};

const ResetPassword = () => {
    const navigator = useNavigation<NavigationProp<RootStackParamList>>();
    const [resetPassword, { isLoading, isSuccess, isError, data }] = useResetPasswordMutation();
    const { email } = useRoute().params as { email: string }
    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        setValue,
        getValues,
        formState: { errors, isValid },
    } = useForm<Inputs>({
        defaultValues: {
            password: "",
            confirmPassword: ""
        },
    })

    const onSubmit = async (data: Inputs) => {
        console.log(data)
        const requestData = {
            password: data.password,
            password_confirmation: data.confirmPassword,
            email: email
        };
        await resetPassword(requestData).unwrap();

    }

    useEffect(() => {
        if (isSuccess) {
            if (data && data.status == "success") {
                Toast.success(data.msg);
                navigator.navigate("Login")
            } else {
                Toast.error(data.msg);
            }
        }
    }, [isSuccess]);

    return (
        <AuthWrapper text='Enter your new password.'>
            <Stack mt={15}>
                <Controller
                    control={control}
                    name="password"
                    rules={{ required: "Password is required" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <SimpleInput
                            label='Password'
                            placeholder="Enter your password"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            password={true}
                            required={true}
                        />
                    )}
                />
                {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </Stack>
            <Stack mt={15}>
                <Controller
                    control={control}
                    name="confirmPassword"
                    rules={{
                        required: "Confirm Password is required",

                        validate: (value) => value === getValues("password") || "Passwords do not match"

                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <SimpleInput
                            label='Confirm Password'
                            placeholder="Confirm your password"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            password={true}
                            required={true}
                        />
                    )}
                />
                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
            </Stack>
            <Stack mt={20}>
                <IconButton
                    text="Reset"
                    style={{ borderRadius: 10 }}
                    onPress={handleSubmit(onSubmit)} />
            </Stack>
        </AuthWrapper>
    )
}

export default ResetPassword

const styles = StyleSheet.create({
    errorText: { color: "red", marginBottom: 10 },
})