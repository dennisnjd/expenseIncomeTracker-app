import * as Haptics from 'expo-haptics';
import React from 'react';
import {
  Dimensions, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Image } from 'expo-image';
import { scale as ws, verticalScale as vs, moderateScale } from 'react-native-size-matters';
import { FontFamily } from '@constants/fonts';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { router } from 'expo-router';
import useUserLogin from '@hooks/apis/useUserLogin';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const Index = () => {

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const animatedOpacity = useSharedValue(0);
  const animatedHeight = useSharedValue(10);

  // API to register the user
  const { mutate: loginUser, isPending } = useUserLogin({
    email,
    password,
  });

  const toggleExpand = () => {
    if (expanded) {
      animatedHeight.value = withTiming(0, { duration: 300 });
      animatedOpacity.value = withTiming(0, { duration: 300 });
    } else {
      animatedHeight.value = withTiming(SCREEN_HEIGHT * .6, { duration: 500 });
      animatedOpacity.value = withTiming(1, { duration: 300 });
    }
    setExpanded(!expanded);
  };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
  }));

  const animatedTextOpacityStyle = useAnimatedStyle(() => ({
    opacity: animatedOpacity.value,
  }))

  const handleLogin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    loginUser();
  };

  return (

    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={styles.container}>

          <View style={styles.imgContainer}>
            <Image
              source={require('@assets/images/indexImg.png')}
              style={{ width: ws(250), height: vs(370), position: 'absolute', }}
            />
          </View>

          <View style={{ width: '100%', zIndex: 2, top: 0 }}>
            <Text style={styles.heading}>
              Manage Your{'\n'} Incomes and Expenses With Confidence.
            </Text>
          </View>

          <Animated.View
            style={[styles.exploreBtn, animatedContainerStyle]}
          >
            {/* <Text style={{ fontSize: moderateScale(18), fontFamily: FontFamily.semiBold, color: 'white' }}>
          EXPLORE
        </Text> */}

            <View style={[styles.loginForm]}>
              <Animated.Text style={[styles.loginTitle, animatedTextOpacityStyle]}>Login</Animated.Text>

              <Animated.View style={[styles.inputContainer, animatedTextOpacityStyle]}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={[styles.input, { marginBottom: 10 }]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#a6a6a6"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </Animated.View>

              <Animated.View style={[styles.inputContainer, animatedTextOpacityStyle]}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#a6a6a6"
                  secureTextEntry
                />
              </Animated.View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                {isPending ?
                  <ActivityIndicator size="small" color="#fff" />
                  : <Text style={styles.loginButtonText}>LOGIN</Text>
                }
              </TouchableOpacity>

              <View style={styles.forgotContainer}>
                <TouchableOpacity onPress={toggleExpand}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.replace('/auth/register_user')}>
                  <Text style={styles.forgotText}>Not a user?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>


          {!expanded &&
            <TouchableOpacity
              style={[styles.loginButton, { width: '60%' }]}
              onPress={toggleExpand}
            >
              <Text style={styles.loginButtonText}>EXPLORE</Text>
            </TouchableOpacity>
          }
        </View>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
};


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white' },
  heading: {
    fontSize: moderateScale(22),
    fontFamily: FontFamily.medium,
    marginTop: vs(40),
    textAlign: 'center',
    paddingHorizontal: ws(2),

  },
  imgContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 50,
    borderRadius: 1000,
    height: vs(300),
    width: ws(300),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7AD45',
    elevation: 3,
  },
  exploreBtn: {
    backgroundColor: '#f2f2f2',
    width: '100%',
    height: vs(400),
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 800,
    marginTop: vs(20),
    // alignSelf:'flex-end',
    bottom: 50,
    position: 'absolute',
    zIndex: 2,

  },
  loginCont: {
    backgroundColor: '#F7AD45',
    width: '100%',
    height: '72%',
    position: 'absolute'
  },





  loginForm: {
    width: '90%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: moderateScale(26),
    fontFamily: FontFamily.bold,
    color: '#000',
    marginBottom: vs(30),
  },
  inputContainer: {
    width: '100%',
    marginBottom: vs(15),
  },
  inputLabel: {
    fontSize: moderateScale(14),
    fontFamily: FontFamily.medium,
    color: 'black',
    marginBottom: vs(0),
  },
  input: {
    width: '100%',
    height: vs(50),
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingHorizontal: ws(15),
    fontSize: moderateScale(16),
    fontFamily: FontFamily.regular,
    borderBottomWidth: 1,
  },
  loginButton: {
    width: '100%',
    height: vs(50),
    backgroundColor: '#F7AD45',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vs(20),
  },
  loginButtonText: {
    fontSize: moderateScale(16),
    fontFamily: FontFamily.semiBold,
    color: '#fff',
  },
  forgotContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vs(20),
    backgroundColor: 'transparent'
  },
  forgotText: {
    fontSize: moderateScale(14),
    fontFamily: FontFamily.medium,
    color: '#000',
  },
  cancelText: {
    fontSize: moderateScale(14),
    fontFamily: FontFamily.medium,
    color: 'gray',
    textDecorationLine: 'underline',
  },
});

export default Index;