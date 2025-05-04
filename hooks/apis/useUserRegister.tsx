import { View, Text, Alert } from 'react-native'
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { postRequest } from '@utils/shared/api';
import Urls from '@constants/urls';
import logging from '@utils/shared/debugLogging';

const useUserRegister = ({
  email,
  password,
  name,
  dob,
  profileImage
}:
  {
    email: string;
    password: string;
    name: string;
    dob?: string;
    profileImage?: string;
  }
) => {

  // API for user registration
  const { data, mutate, isPending } = useMutation<any>({
    mutationFn: () =>
      postRequest({
        url: Urls.registerUser,
        body: {
          email,
          password,
          name,
          dob,
          // profileImage,
        },
        token_required: false
      }),
      onSuccess: (data) => {
        if (data?.status === 1) {
         logging('User registered successfully ',data);
        }else{
          Alert.alert('Alert',data.message);
        }
      },
      onError: (error) => {
        Alert.alert('Alert',error.message);
      }
  })
  return {
    data,
    mutate,
    isPending
  }
}

export default useUserRegister;