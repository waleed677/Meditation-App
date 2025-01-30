import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import MainWrapper from './main-wrapper'
import Stack from '../stacks/stack'
import UserLabelIcon from '../../../assets/vendors/user-label-icon'
import Typography from '../typography/typography'

const AuthWrapper = ({ children, text }: { children: ReactNode, text: string }) => {
    return (
        <MainWrapper showSafeArea={true}>
            <Stack alignItems="center" justifyContent="center" flex={1}>
                <Stack px={28} py={24} alignItems="center" justifyContent="center" style={styles.card} >
                    <UserLabelIcon />
                    <Stack mt={18} w={256}>
                        <Typography style={{ textAlign: "center" }} type="paragraph1Bold">
                            Hi there
                        </Typography>
                        <Typography style={{ textAlign: "center" }} type="paragraph1Bold">
                            I am happy you are here!
                        </Typography>
                        <Typography
                            type="paragraph1"
                            style={{ marginVertical: 32, textAlign: "center" }}
                        >
                            {text}
                        </Typography>
                        <Stack>
                            {children}
                        </Stack>

                    </Stack>
                </Stack>
            </Stack>
        </MainWrapper>
    )
}

export default AuthWrapper

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        // borderWidth: 1,
        // borderColor: "#CCCCCC",
        borderRadius: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding: 24,
    },
})