import { Book } from './book';
import { User } from './user';

export type ITableLoanProps = {
    _id?: string;
    book?: Book;
    user?: User;
    returnDate?: string;
    statusBorrow?: boolean;
    updatedAt?: string;
};

