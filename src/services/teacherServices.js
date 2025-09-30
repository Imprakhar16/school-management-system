import { showToast } from "../components/toaster"
import { axiosInstance } from "../helper/axiosInterceptors"
import API_PATHS from "./apiEndpoints"

export const loginTeacher = async (body) => {
  try {
    const response = await axiosInstance.post(API_PATHS.TEACHER.LOGIN, body)
    localStorage.setItem("teacherAuthToken", JSON.stringify(response.data.token))
    showToast({
      message: `Welcome Back ${response.data.teacher.firstName}`,
      status: "success",
    })
    return response
  } catch (error) {
    if (error.response?.data?.message === "Password incorrect") {
      showToast({
        message: "Invalid Credentials",
        status: "error",
      })
    } else {
      showToast({
        message: "Teacher Login Failed",
        status: "error",
      })
    }
  }
}
export const registerTeacher = async (body) => {
  try {
    console.log("Register Teacher Body:", body) // dummy log
    // simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    showToast({
      message: `Teacher ${body.firstName} ${body.lastName} registered successfully!`,
      status: "success",
    })

    return { data: body }
  } catch (error) {
    showToast({
      message: "Teacher Registration Failed",
      status: "error",
    })
    throw error
  }
}
