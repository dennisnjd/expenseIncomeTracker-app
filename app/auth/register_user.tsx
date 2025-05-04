import DatePicker from '@components/shared/DatePicker';
import { FontFamily } from '@constants/fonts';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
    Dimensions,
    Modal,
    Alert,
    ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ms, s, vs } from 'react-native-size-matters';
import useUserRegister from '@hooks/apis/useUserRegister';
import { formatDateInYYYYMMDD } from '@utils/shared/time';


const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.9;

const RegisterUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState<Date | null>(null);
    const [password, setPassword] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [showImageChangeModal, setShowImageChangeModalVisible] = useState(false);
    const [image, setImage] = useState<string>('');


    // API to register the user
    const { mutate: registerUser, isPending, data: userData } = useUserRegister({
        email,
        password,
        name,
        profileImage: image,
        ...(dob && { dob: formatDateInYYYYMMDD(dob) as string }),
    });

    // References for TextInputs
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    // Formatted date of birth
    const formattedDob = dob?.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });


    const openGallery = async () => {
        setShowImageChangeModalVisible(false);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true,
        });


        if (!result.canceled) {
            setImage('data:image/jpeg;base64,' + result?.assets[0]?.base64);
            // setImgChanged(true);
        }
    };

    const openCamera = async () => {
        setShowImageChangeModalVisible(false);

        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Alert', 'Permission to access camera is required!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            setImage('data:image/jpeg;base64,' + result?.assets[0]?.base64);
            // setImgChanged(true);
        }
    };



    const handleRegister = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        console.log('Registering with:', { name, email, dob, password });

        // Add your registration logic here
        registerUser();
    };



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >


                    {/* Form section */}
                    <View style={styles.formSection}>
                        <Text style={styles.title}>Register</Text>

                        {/* <TouchableOpacity
                            style={styles.circleOuter}
                            onPress={() => setShowImageChangeModalVisible(true)}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.profileImage} />
                            )
                                // : data?.user_data?.image ? (
                                //     <Image
                                //         source={{ uri: profilePicture + data?.user_data?.image }}
                                //         style={styles.profileImage}
                                //     />
                                // )
                                : (
                                    <Image
                                        source={require('@assets/images/user.png')}
                                        style={styles.profileImage}
                                        tintColor={'#eba440'}
                                    />
                                )}
                            <Text style={styles.changeImageText}>Change Profile Image</Text>
                        </TouchableOpacity> */}

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your name"
                                value={name}
                                onChangeText={setName}
                                returnKeyType="next"
                                onSubmitEditing={() => emailRef?.current?.focus()}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                ref={emailRef}
                                style={styles.input}
                                placeholder="Enter your email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                returnKeyType="next"
                                onSubmitEditing={() => passwordRef?.current?.focus()}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Date of Birth</Text>
                            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                <View style={styles.dateInput}>
                                    <Text style={[styles.dateText, !formattedDob && { color: 'gray' }]}>
                                        {formattedDob || 'Select date'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                ref={passwordRef}
                                style={styles.input}
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                returnKeyType="done"
                                onSubmitEditing={Keyboard.dismiss}
                            />
                        </View>
                        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                            {isPending ?
                                <ActivityIndicator size="small" color="#fff" />
                                : <Text style={styles.registerButtonText}>REGISTER</Text>
                            }
                        </TouchableOpacity>

                        <View style={styles.bottomLinks}>

                            <TouchableOpacity onPress={() => router.replace('/auth')}>
                                <Text style={[styles.linkText, { color: '#000' }]}>Already a user?</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    {/* Register button outside the circle */}

                </ScrollView>
            </TouchableWithoutFeedback>

            <DatePicker
                showDatePicker={showDatePicker}
                setShowDatePicker={setShowDatePicker}
                date={dob}
                setDate={setDob}
            />

            {/* Image Change Modal (if needed) */}
            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={showImageChangeModal}
                onRequestClose={() => {
                    setShowImageChangeModalVisible(false);
                }}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.overlay}
                        onPress={() => setShowImageChangeModalVisible(false)}
                    />
                    <View style={styles.termsView}>
                        <TouchableOpacity onPress={openGallery}>
                            <View style={styles.options}>
                                <Ionicons name="images-outline" size={21} color="black" />
                                <Text style={styles.uploadText}> Upload From gallery</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={openCamera}>
                            <View style={styles.options}>
                                <Ionicons name="camera-outline" size={24} color="black" />
                                <Text style={styles.uploadText}> Use Camera</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal> */}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    scrollContent: {
        flexGrow: 1,
        // alignItems: 'center',
        paddingVertical: vs(40),
        paddingHorizontal: s(20),
    },
    circleContainer: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        overflow: 'hidden',
        backgroundColor: '#e9e9e9',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    topSection: {
        height: '40%',
        backgroundColor: '#eba440',
        justifyContent: 'center',
        alignItems: 'center',
    },
    moneyIcon: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    formSection: {
        height: '60%',
        padding: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    changeImageText: {
        color: '#000',
        marginBottom: 18,
        fontFamily: FontFamily.medium,
        fontSize: ms(14),
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: ms(14),
        fontFamily: FontFamily.medium,
        color: 'black',
        // marginBottom: vs(5),
    },
    input: {
        width: '100%',
        height: vs(50),
        backgroundColor: 'transparent',
        borderRadius: 10,
        paddingHorizontal: s(15),
        fontSize: ms(14),
        fontFamily: FontFamily.regular,
        borderBottomWidth: 1,
        borderBottomColor: '#999',
    },
    dateInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#999',
        paddingVertical: 8,
        paddingHorizontal: s(15),
    },
    dateText: {
        fontSize: ms(14),
        fontFamily: FontFamily.regular,
    },
    registerButton: {
        width: CIRCLE_SIZE,
        backgroundColor: '#eba440',
        paddingVertical: 15,
        borderRadius: 30,
        marginTop: 10,
        alignItems: 'center',
        alignSelf: 'center',
    },
    registerButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    bottomLinks: {
        width: CIRCLE_SIZE,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 15,
        alignSelf: 'center',
    },
    linkText: {
        color: '#666',
        fontSize: 14,
    },
    circleOuter: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    profileImage: {
        width: ms(80),
        height: ms(80),
        borderRadius: 50,
        marginBottom: 10,
    },

    // Image Change Modal styles
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, // Cover the entire screen
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black color
    },
    termsView: {
        height: 120,
        width: '100%',
        backgroundColor: 'white',
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 15,
    },

    options: {
        flexDirection: 'row',
        width: '60%',
        height: 40,
    },
    uploadText: {
        marginLeft: 22,
        fontFamily: FontFamily.regular,
        fontSize: ms(14),
    },
});

export default RegisterUser;