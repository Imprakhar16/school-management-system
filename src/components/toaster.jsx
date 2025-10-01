import toast from "react-hot-toast";

export function showToast({ message, status }) {
  switch (status) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast(message, { icon: "ℹ️" });
      break;
    default:
      toast(message);
  }
}
