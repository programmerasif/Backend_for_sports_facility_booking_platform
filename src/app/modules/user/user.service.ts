import { TUser } from "./user.interface"
import { User } from "./user.model"

const creatUserIntoDB = async(payload:TUser) =>{    
const result = await User.create(payload)


const data = {
    _id:result._id,
    name:result.name,
    email:result.email,
    role:result.role,
    phone:result.phone,
    address:result.address
    
}
return data
}
const createAdminIntoDB = async(payload:TUser) =>{    
const result = await User.create(payload)


const data = {
    _id:result._id,
    name:result.name,
    email:result.email,
    role:result.role,
    phone:result.phone,
    address:result.address
}
return data
}

export const userServices = {
    creatUserIntoDB,
    createAdminIntoDB
}