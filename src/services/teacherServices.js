import { showToast } from "../components/toaster";

export const registerTeacher = async (body) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    showToast({
      message: `Teacher ${body.firstName} ${body.lastName} registered successfully!`,
      status: "success",
    });

    return { data: body };
  } catch (error) {
    showToast({
      message: "Teacher Registration Failed",
      status: "error",
    });
    throw error;
  }
};
