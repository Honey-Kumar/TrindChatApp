import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import { Base_url } from "../redux/RequestUrl";

export const httpRequest = async (
    endpoint,
    method = "GET",
    body = {},
    queryParams = {},
    authentication = false,
    formData = false,
    navigate
) => {
    try {
        const baseUrl = Base_url
        const config = {
            method: method.toUpperCase(),
            url: `${baseUrl}${endpoint}`,
            params: queryParams,
            data: body,
            headers: {
                "Content-Type": formData ? "multipart/form-data" : "application/json",
            },
        };

        if (authentication) {
            const token = Cookies.get("authtoken");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            } else {
                return false;
            }
        }

        const response = await axios(config);

        return response.data;
    } catch (error) {
        if (error?.response?.status === 401) {
            if (navigate) {
                navigate("/login");
            }
            return false;
        }
        console.log("error", error);
        toast.error(error?.response?.data?.errors?.msg || "An error occurred");
        return false;
    }
};