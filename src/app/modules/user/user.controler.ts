import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.service";

const creatUser = catchAsync(async(req,res) =>{
    const result = await userServices.creatUserIntoDB(req.body)
   
    sendResponse(res, {
       statusCode: httpStatus.OK,
       success: true,
       message: 'User is created succesfully',
       data: result,
     });
   })

export const  usersControler = {
    creatUser
}