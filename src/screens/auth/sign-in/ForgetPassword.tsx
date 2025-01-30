import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import MainWrapper from '../../../shared/wrappers/main-wrapper'
import UserLabelIcon from '../../../../assets/vendors/user-label-icon'
import Stack from '../../../shared/stacks/stack'
import Typography from '../../../shared/typography/typography'
import { useForm, Controller } from 'react-hook-form'
import SimpleInput from '../../../shared/Inputs/SimpleInput'
import IconButton from '../../../shared/buttons/icon-button'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import AuthWrapper from '../../../shared/wrappers/auth-wrapper'

type Inputs = {
    email: string
}

type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    ForgetPassword: undefined;
    ResetPassword: undefined
    OtpScreen: undefined
};

const ForgetPassword = () => {
    const navigator = useNavigation<NavigationProp<RootStackParamList>>();
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
            email: ""
        },
    })

    const onSubmit = (data: Inputs) => {
        console.log(data)
        navigator.navigate("OtpScreen")
    }

    return (
        <AuthWrapper text='Enter your email to reset password.'>
            <Stack>
                <Controller
                    control={control}
                    name="email"
                    rules={{ required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <SimpleInput
                            label='Email'
                            placeholder="Enter your email"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            required={true}
                        />
                    )}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </Stack>

            <Stack mt={20}>
                <IconButton
                    text="Submit"
                    style={{ borderRadius: 10 }}
                    onPress={handleSubmit(onSubmit)} />
            </Stack>
            <Stack style={{ flexDirection: "row", justifyContent: "center", gap: 5 }}>

                <Pressable style={{ marginTop: 12 }} onPress={() => navigator.navigate("Login")}>
                    <Text style={{ fontSize: 16, textDecorationLine: "underline", fontWeight: 700 }}>Back To Login</Text>
                </Pressable>
            </Stack>
        </AuthWrapper>
    )
}

export default ForgetPassword

const styles = StyleSheet.create({
    errorText: { color: "red", marginBottom: 10 },
})