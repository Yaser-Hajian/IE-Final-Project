import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { resetProfessorData } from "../redux/professor";
import updateProfessor from "../utils/dashboard/updateProfessor";
import { updateProfessorsData } from "../redux/professors";

const useUpdateProfessor = (checkInputs, professorId) => {
  const dispatch = useDispatch();
  const professorData = useSelector((s) => s.professor);
  const navigate = useNavigate();

  return async () => {
    if (!checkInputs()) return;
    const loadingToast = toast("لطفا صبر کنید ...", {
      autoClose: true,
      position: "top-left",
      theme: "light",
      isLoading: true,
    });
    const data = await updateProfessor(professorId, professorData);
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
        render: data.message ?? "با موفقیت استاد آپدیت شد",
        type: "success",
        autoClose: true,
        position: "top-left",
        isLoading: false,
      });
      dispatch(updateProfessorsData({ isDataLoadedBefore: false }));
      dispatch(resetProfessorData());
      navigate("/dashboard/admin/professors", { replace: true });
    }
  };
};

export default useUpdateProfessor;
