import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import addProfessor from "../utils/dashboard/addProfessor";
import { resetProfessorData } from "../redux/professor";
import { updateProfessorsData } from "../redux/professors";

const useAddProfessor = (checkInputs) => {
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
    const data = await addProfessor(professorData);
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

      dispatch(updateProfessorsData({ isDataLoadedBefore: false }));
      dispatch(resetProfessorData());
      navigate("/dashboard/admin/professors", { replace: true });
    }
  };
};

export default useAddProfessor;
