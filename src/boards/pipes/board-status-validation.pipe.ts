import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board.type";
import { ValidationError } from "class-validator";


export class BoardStatusValidationPipe implements PipeTransform {

    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC,
    ]

    //Pippe Interface의 구현체
    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is not in statusOptions`);
        }

        return value
    }

    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        return index != -1;
    }

}