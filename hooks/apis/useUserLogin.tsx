import { Alert } from 'react-native'
import { useMutation } from '@tanstack/react-query';
import { postRequest } from '@utils/shared/api';
import Urls from '@constants/urls';
import logging from '@utils/shared/debugLogging';

const useUserLogin = ({
  email,
  password,
}:
  {
    email: string;
    password: string;
  }
) => {

  // API for user registration
  const { data, mutate, isPending } = useMutation<any>({
    mutationFn: () =>
      postRequest({
        url: Urls.loginUser,
        body: {
          email,
          password,
        },
        token_required: false
      }),
      onSuccess: (data) => {
        if (data?.status === 1) {
         logging('User Logged in successfully ',data);
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

export default useUserLogin;