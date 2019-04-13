import { IUploadResponse } from "./IUploadResponse.model";

export interface IPayload {
    code:string;

    message:string;

    result:IUploadResponse[];

    status:string;
}