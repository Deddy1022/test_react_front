import { useNavigate } from "react-router-dom";
import { setNavigate } from "./navigate";

export const NavigationInitializer = () => {
  const navigate = useNavigate();
  setNavigate(navigate);
  return null;
};