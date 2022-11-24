import axios from "axios"
import { baseApiUrl } from "../constants";

export const UploadMigrationInputFile = async (fileId: string, file?: File): Promise<void> => {

    const formData = new FormData();
    formData.append("fileId", fileId)
    formData.append("file", file ?? new File([], ""))
    await axios.post<any>(`${baseApiUrl}/api/v1/file`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}