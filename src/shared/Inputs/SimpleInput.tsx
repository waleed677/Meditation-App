import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import Typography from '../typography/typography'
import Ionicons from '@expo/vector-icons/Ionicons';
interface StackProps extends TextInputProps {
    placeholder?: string,
    onBlur?: () => void,
    onChange?: () => void,
    value?: string,
    customStyle?: ViewStyle,
    label?: string,
    password?: boolean,
    required?: boolean,
}

const SimpleInput: React.FC<StackProps> = ({ required = false, password = false, label, placeholder, onBlur, onChange, value, customStyle, ...props }) => {
    const [showPassword, setShowPassword] = useState(password ? true : false)
    return (
        <View>
            <Typography type={'paragraph1'} style={styles.label}><Text style={{ color: "red" }}>{required && "*"}</Text> {label}</Typography>
            <View style={[styles.inputContainer, customStyle]}>
                <TextInput
                    secureTextEntry={showPassword}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={[styles.input]}
                    {...props}
                />
                {password && (showPassword ? <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name="eye-off" size={20} color="black" />
                </Pressable> : <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name="eye" size={20} color="black" />
                </Pressable>)}
            </View>
        </View>
    )
}

export default SimpleInput

const styles = StyleSheet.create({
    input: {
        borderWidth: 0,
        width: "88%",
        color: "#000",
        height: "100%",
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: "#CCCCCC",
        width: "100%",
        height: 40,
        borderRadius: 8,
        backgroundColor: "white",
        paddingHorizontal: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    label: {
        fontSize: 16,
        color: "#000",
        marginBottom: 5,
        marginLeft: 3,
    }
})

