import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeRememberMeData = async () => {
  try {
    await AsyncStorage.setItem(
      "Login-remember",
      JSON.stringify({ remember: true })
    );
  } catch (error: any) {
    console.error(error);
  }
};

export const removeRememberMeData = async () => {
  try {
    const userData = await getRememberMeData();
    if (userData?.remember) await AsyncStorage.removeItem("Login-remember");
  } catch (error: any) {
    console.error(error);
  }
};

export const getRememberMeData = async () => {
  try {
    const value = await AsyncStorage.getItem("Login-remember");
    const userData: { remember: true } = value && JSON.parse(value);

    return userData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const checkIsRemember = async () => {
  const userData = await getRememberMeData();
  if (userData?.remember) return true;

  return false;
};
