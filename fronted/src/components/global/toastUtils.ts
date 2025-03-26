import { toast } from "react-toastify";

export const addToast = ({ title, description, variant = "default" }) => {
  const options = {
    success: toast.success,
    error: toast.error,
    info: toast.info,
    warning: toast.warning,
    default: toast,
  };

  options[variant](`${title}: ${description}`);
};
