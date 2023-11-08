import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Admin } from "apps/auth/src/admin/schema/admin.schema";

const getCurrentAdminByContext = (context: ExecutionContext) : Admin =>{
    return context.switchToHttp().getRequest().admin;
}
export const CurrentAdmin = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => getCurrentAdminByContext(context)
)