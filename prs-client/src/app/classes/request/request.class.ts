import { User } from "../user/user.class";

export class Request{
    create(request: Request) {
      throw new Error('Method not implemented.');
    }
    id:number=0;
    description:string="";
    justification:string="";
    deliveryMode:string="";
    status:string="NEW";
    total:number=0;
    userId:number=0;
    user!: User;
}