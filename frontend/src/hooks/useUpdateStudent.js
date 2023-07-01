import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateStudentsData } from "../redux/students";
import { resetStudentData } from "../redux/student";
import { useNavigate } from "react-router-dom";
import updateStudent from "../utils/dashboard/updateStudent";

const useUpdateStudent = (checkInputs, studentId) => {
  const dispatch = useDispatch();
  const studentData = useSelector((s) => s.student);
  const navigate = useNavigate();

  return async () => {
    if (!checkInputs()) return;
    const loadingToast = toast("لطفا صبر کنید ...", {
      autoClose: true,
      position: "top-left",
      theme: "light",
      isLoading: true,
    });
    const data = await updateStudent(studentId, studentData);
    if (data.error === true) {
      toast.update(loadingToast, {
        render: data.message ?? "یه مشکلی پیش اومده ، لطفا دوباره امتحان کنید",
        autoClose: true,
        position: "top-left",
        isLoading: false,
        type: "error",
      });
    } else {
      toast.update(loadingToast, {
        render: data.message ?? "با موفقیت دانشجو آپدیت شد",
        type: "success",
        autoClose: true,
        position: "top-left",
        isLoading: false,
      });
      dispatch(updateStudentsData({ isDataLoadedBefore: false }));
      dispatch(resetStudentData());
      navigate("/dashboard/admin/students", { replace: true });
    }
  };
};

export default useUpdateStudent;
