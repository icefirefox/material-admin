// src/authProvider.js
const API_URL = "http://localhost:5180/api/auth/login";
let isRedirecting = false;
const authProvider = {
  // 检查用户权限，处理请求错误

  checkError: (error) => {
    const status = error.status;

    if ((status === 401 || status === 403) && !isRedirecting) {
      isRedirecting = true; // 防止重复跳转
      // 如果是 401 或 403 错误，清除 token 并跳转到登录页
      console.error("Authentication error:", error);
      // 清除 token
      localStorage.removeItem('token');
      window.location.replace('/login'); // 立即跳转并刷新

      return Promise.reject();  // 会触发跳转
    }

    return Promise.resolve();
  },
  // 页面加载时验证是否登录
  checkAuth: () => {
    return localStorage.getItem('token')
      ? Promise.resolve()
      : Promise.reject({ redirectTo: '/login' });
  },

  // 登录逻辑
  login: ({ username, password }) => {
    // 调用你的登录接口，拿到token后保存
    return fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (!res.ok) throw new Error('Login failed');
        return res.json();
      })
      .then(({ token }) => {
        localStorage.setItem('token', token);
      });
  },

  // 登出逻辑
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve(),
};
export default authProvider;