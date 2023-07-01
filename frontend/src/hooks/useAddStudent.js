import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import addStudent from "../utils/dashboard/addStudent";
import { updateStudentsData } from "../redux/students";
import { resetStudentData } from "../redux/student";
import { useNavigate } from "react-router-dom";

const useAddStudent = (checkInputs) => {
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
    const data = await addStudent(studentData);
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
        render: data.message ?? "با موفقیت استاد اضافه شد",
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

export default useAddStudent;
