import { User } from '../models/useModels';

declare module 'express-serve-static-core' {
    interface Request {
        user?: User | null
    }
}