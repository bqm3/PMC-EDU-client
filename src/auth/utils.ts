// routes
import { PATH_AUTH } from 'src/routes/paths';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("Không tìm thấy refreshToken, cần đăng nhập lại.");
    }

    const response = await axios.post("/api/v1/hosons/refresh", { refreshToken });

    const { accessToken } = response.data;

    // Cập nhật accessToken mới vào localStorage và headers
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    return accessToken;
  } catch (error) {
    console.error("Lỗi khi refresh token:", error);
    return null;
  }
};

export const tokenExpired = async (exp: number) => {
  if (!exp) return;

  const currentTime = Date.now() / 1000;
  const timeLeft = (exp - currentTime) * 1000;

  if (timeLeft <= 0) {
    const newAccessToken = await refreshAccessToken();

    if (newAccessToken) {
      console.log("Token đã được làm mới!");
      setSession(newAccessToken);
    } else {
      alert("Phiên làm việc hết hạn. Vui lòng đăng nhập lại!");
      localStorage.removeItem("accessToken");
      window.location.href = PATH_AUTH.login;
    }
    return;
  }

  // Đặt timer để kiểm tra lại trước khi token hết hạn
  setTimeout(async () => {
    const newAccessToken = await refreshAccessToken();

    if (newAccessToken) {
      console.log("Token đã được làm mới!");
      setSession(newAccessToken);
    } else {
      alert("Phiên làm việc hết hạn. Vui lòng đăng nhập lại!");
      localStorage.removeItem("accessToken");
      window.location.href = PATH_AUTH.login;
    }
  }, timeLeft - 60000); // Kiểm tra lại 1 phút trước khi hết hạn
};

// ----------------------------------------------------------------------

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    const { exp } = jwtDecode(accessToken);
    tokenExpired(exp);
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};
