import { MMKV } from "react-native-mmkv";

export const storage = new MMKV({
  isLoggedIn: false,
  email: "",
  password: "",
});
