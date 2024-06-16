import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const creatFacility = catchAsync(async(req,res) =>{
    const { user } = req.body;

    const result = await userServices.creatUserIntoDB(user);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Facility added successfully',
      data: result,
    });
})

const FacilityControler = {
    creatFacility
}