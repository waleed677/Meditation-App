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
    password: string
}

type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    ForgetPassword: undefined;
};

const LoginForm = () => {
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
            email: "",
            password: "",
        },
    })

    const onSubmit = (data: Inputs) => {
        console.log(data)
    }

    return (
        <AuthWrapper text="You can sync your favourites, downloads. Start now by log in.">
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

            <Pressable style={{ marginTop: 12 }} onPress={() => navigator.navigate("ForgetPassword")}>
                <Text style={{ fontSize: 16, textDecorationLine: "underline", fontWeight: 700 }}>Forget Password</Text>
            </Pressable>

            <Stack mt={15}>
                <IconButton
                    text="Login"
                    style={{ borderRadius: 10 }}
                    onPress={handleSubmit(onSubmit)} />
            </Stack>
            <Stack style={{ flexDirection: "row", justifyContent: "center", gap: 5 }}>
                <Typography
                    type="paragraph1"
                    style={{ marginTop: 10, textAlign: "center" }}
                >
                    Are you a new user?
                </Typography>
                <Pressable style={{ marginTop: 12 }} onPress={() => navigator.navigate("SignUp")}>
                    <Text style={{ fontSize: 16, textDecorationLine: "underline", fontWeight: 700 }}>Sign up</Text>
                </Pressable>
            </Stack>
        </AuthWrapper>
    )
}

export default LoginForm

const styles = StyleSheet.create({
    errorText: { color: "red", marginBottom: 10 },
})