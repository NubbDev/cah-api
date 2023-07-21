import { IMethod, IRoute } from '../../types';
import {Register} from './register'
import { SignIn } from './signin';
export default {
    handlers: [Register, SignIn]
} as IMethod;