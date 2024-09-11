import QueryBuilder from "../../builders/BuildersQuery"
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
const getUsersIntoDB = async(query: Record<string, unknown>) =>{   
    
    
    try {
  
    
        const searchableFields = ['name', 'location','email'];
    
        // Start with Booking query and add the populate clauses
        const baseQuery = User.find();
    
        const productQuery = new QueryBuilder(baseQuery, query)
          .search(searchableFields)
          .filter()
          .paginate()
          .fields();
    
        // Execute the query after chaining
        const users = await productQuery.modelQuery.exec();
    
        // Get pagination information
        const paginationInfo = await productQuery.countTotal();
    
        return {
          users,
          hasMore: paginationInfo?.hasMore,
          paginationInfo,
        };
      } catch (error) {
        throw new Error(`Failed to get facilities: ${error.message}`);
      }

}

export const userServices = {
    creatUserIntoDB,
    createAdminIntoDB,
    getUsersIntoDB
}