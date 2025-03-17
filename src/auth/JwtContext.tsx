import { createContext, useEffect, useReducer, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// utils
import axios from '../utils/axios';
//
import { isValidToken, setSession } from './utils';
import { ActionMapType, AuthStateType, AuthUserType, JWTContextType } from './types';
import { PATH_PAGE } from 'src/routes/paths';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
  VERIFY = "VERIFY"
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: undefined;
  [Types.LOGOUT]: undefined;
  [Types.VERIFY]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const navigate = useNavigate();

  const initialize = useCallback(async () => {
    try {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.post('/api/v1/hosons/check-auth');

        const { user } = response.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = async (Tendangnhap: string, Matkhau: string) => {
    const response = await axios.post('/api/v1/hosons/login', {
      Tendangnhap,
      Matkhau
    });

    const { accessToken, refreshToken, user } = response.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setSession(accessToken);
    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
      },
    });
  };

  // REGISTER
  const register = async (Email: string, Matkhau: string, Hodem: string, Ten: string, Tendangnhap: string, Dctamtru?: string) => {
    const response = await axios.post('/api/v1/hosons/register', {
      Email,
      Matkhau,
      Hodem,
      Ten,
      Tendangnhap,
      Dctamtru
    });
    // if (response.data) {
    //   await axios.post('/api/v1/otp/send', {
    //     purpose_code: "REGISTER_ACCOUNT",
    //     Tendangnhap: Tendangnhap,
    //     Email: Email,
    //   })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }

    // localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: Types.REGISTER,
      // payload: {
      //   user,
      // },
    });
  };

  const verify = async (otp_code: string, purpose_code: string) => {
    const response = await axios.put('/api/v1/hosons/verify', {
      otp_code,
      purpose_code,

    });


    // localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: Types.VERIFY,

    });

  }
  // LOGOUT
  const logout = async () => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        verify,
        loginWithGoogle: () => { },
        loginWithGithub: () => { },
        loginWithTwitter: () => { },
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
