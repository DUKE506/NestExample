import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board.type';
import { title } from 'process';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) { }


    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoard: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(createBoard);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.boardsService.deleteBoard(id);
    }

    // /**
    //  * GET 게시판 전체 조회
    //  * @returns 
    //  */
    // @Get('/')
    // getAllBoard(): Boards[] {
    //     return this.boardsService.getAllBoards();
    // }

    // /**
    //  * GET 게시판 단일 조회(Id)
    //  * @param id 
    //  * @returns 
    //  */
    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Boards {

    //     return this.boardsService.getBoardById(id);
    // }
    // // 파라미터 레벨에서 파이프 사용
    // // @Get('/:id')
    // // getBoardById(@Param('id', ParseIntPipe) id: string): Boards {
    // //     return this.boardsService.getBoardById(id);
    // // }

    // /**
    //  * POST 게시판 생성
    //  * @param createBoardDto 
    //  * @returns 
    //  */
    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDto: CreateBoardDto
    // ): Boards {


    //     return this.boardsService.createBoard(createBoardDto);
    // }

    // /**
    //  * PATCH 게시물 상태 수정
    //  * 
    //  */
    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    // ) {
    //     console.log('여기옴')
    //     return this.boardsService.updateBoardStatus(id, status);
    // }

    // /**
    //  * DEL 게시판 단일 삭제
    //  * @param id 
    //  */
    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardsService.deleteBoard(id);
    // }

}
