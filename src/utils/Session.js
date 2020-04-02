const Session = (function() {
  const setSession = (user, token) => {
    localStorage.setItem("user", user);
    localStorage.setItem("token", token);
  }

  const getSession = () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return { user, token }
  }

  const cleanSession = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  const startSession = () => {
    const { user, token } = getSession();
    if (user && token) {
      //Start session
      return true;
    }
    return false;
  }

  return {
    setSession: setSession,
    getSession: getSession,
    cleanSession: cleanSession,
    startSession: startSession
  }

})();

export default Session;