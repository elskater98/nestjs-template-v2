import {HttpException, HttpStatus} from '@nestjs/common';

export class DuplicateIdentifierException extends HttpException {
    constructor(repeatedId: string) {
        super(repeatedId, HttpStatus.CONFLICT);
    }
}