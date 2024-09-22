import { UserProfile } from "@/models/user-profile";
import { AuthApiService } from "@/services/api.service";
import { UseAppDispatch, useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  authStart,
  loginFailure,
  loginSuccess,
  logout,
  setPinCode,
  setUser,
} from "@/store/reducer/auth-reducer";
import { resetMessenger } from "@/store/reducer/messenger-reducer";
import { setLoginPinCode } from "@/store/reducer/session-reducer";
import { useCallback, useMemo } from "react";

const useAuth = ({
  dispatch = useAppDispatch(),
  authApiService = new AuthApiService(),
}: {
  dispatch?: UseAppDispatch;
  authApiService?: AuthApiService;
} = {}) => {
  const { user, loading, token, pinCode } = useAppSelector(
    (state) => state.auth
  );
  const { loginPinCode } = useAppSelector((state) => state.session);

  const callGetAuthUser = async () => {
    try {
      const response = await authApiService.getUser();
      if (response.status) {
        dispatch(setUser(UserProfile.createFromApi(response.data)));
        return response.data;
      }
    } catch (error: unknown) {}
    return null;
  };

  const callGetAuthUserCallback = useCallback(async () => {
    return callGetAuthUser();
  }, []);

  const authStartCallback = useCallback(() => {
    dispatch(authStart());
  }, []);

  const loginSuccessCallback = useCallback(({ token }: { token: string }) => {
    dispatch(
      loginSuccess({
        token: token,
      })
    );
  }, []);

  const logoutSuccessCallback = useCallback(() => {
    dispatch(resetMessenger());
    dispatch(setLoginPinCode(null));
    dispatch(logout());
  }, []);

  const loginFailureCallback = useCallback((errorMessage: string) => {
    dispatch(loginFailure(errorMessage));
  }, []);

  const setUserCallback = useCallback((user: { [x: string]: any }) => {
    dispatch(setUser(UserProfile.createFromApi(user)));
  }, []);

  const validatePinCodeCallback = useCallback((inputPinCode: string) => {
    return inputPinCode === pinCode;
  }, []);

  const setLoginPinCodeCallback = useCallback((inputPinCode: string) => {
    dispatch(setLoginPinCode(inputPinCode));
  }, []);

  const setPinCodeCallback = useCallback((inputPinCode: string) => {
    dispatch(setPinCode(inputPinCode));
  }, []);

  const isPendingUser = useMemo(() => {
    if (!user) return true;
    return true;
  }, [user]);

  return {
    user: user ? UserProfile.createFromObject(user) : null,
    token,
    loading,
    isPendingUser,
    isLoggedIn: !!user,
    loginSuccess: loginSuccessCallback,
    loginFailure: loginFailureCallback,
    setUser: setUserCallback,
    authStart: authStartCallback,
    logoutSuccess: logoutSuccessCallback,
    setPinCode: setPinCodeCallback,
    setLoginPinCode: setLoginPinCodeCallback,
    validatePinCode: validatePinCodeCallback,
    callGetAuthUser: callGetAuthUserCallback,
    pinCode,
    loginPinCode,
  };
};

export default useAuth;
