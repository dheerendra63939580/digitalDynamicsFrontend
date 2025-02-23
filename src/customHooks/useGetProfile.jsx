import { useDispatch } from "react-redux";
import { getApi } from "../api";
import { setProfile } from "../reduxToolkit/slices/userSlice";

export const useGetProfile = () => {
    const dispatch = useDispatch()
    const getProfile = async () => {
            try {
                const res = await getApi("/user/profile");
                dispatch(setProfile(res?.data?.data));
            } catch(err) {
                console.log(err)
            }
        }
        return {getProfile}
}