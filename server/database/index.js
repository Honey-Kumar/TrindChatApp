import mongoose from "mongoose";
import { DBUrl } from "../config/config.js";

const ConnectDB = async () => {
    await mongoose.connect(DBUrl).then(res => console.log(`Trinder chat app is connected with server : ${res.connection.host}`)).catch(err => console.log(err))
}

export default ConnectDB