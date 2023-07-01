import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import updateManager from "../utils/dashboard/updateManager";
import { updateManagersData } from "../redux/managers";
import { resetManagerData } from "../redux/manager";

const useUpdateManager = (checkInputs, managerId) => {
  const dispatch = useDispatch();
  const managerData = useSelector((s) => s.manager);
  const navigate = useNavigate();

  return async () => {
    if (!checkInputs()) return;
    const loadingToast = toast("لطفا صبر کنید ...", {
      autoClose: true,
      position: "top-left",
      theme: "light",
      isLoading: true,
    });
    const data = await updateManager(managerId, managerData);
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
        render: data.message ?? "با موفقیت مدیر آپدیت شد",
        type: "success",
        autoClose: true,
        position: "top-left",
        isLoading: false,
      });
      dispatch(updateManagersData({ isDataLoadedBefore: false }));
      dispatch(resetManagerData());
      navigate("/dashboard/admin/managers", { replace: true });
    }
  };
};

export default useUpdateManager;
