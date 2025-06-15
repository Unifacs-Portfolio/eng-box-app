import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../utils/types/navigation";
import ChangePasswordForm from "./../../Components/forms/ChangePasswordForm";
import { StackScreenProps } from "@react-navigation/stack";

type ResetPasswordScreenScreenRouteProp = RouteProp<
  RootStackParamList,
  "ResetPassword"
>;

type ResetPasswordProps = StackScreenProps<RootStackParamList, "ResetPassword">;

const ResetPassword: React.FC<ResetPasswordProps> = ({ route, navigation }) => {
  const { email } = route.params;

  return <ChangePasswordForm email={email} />;
};

export default ResetPassword;
