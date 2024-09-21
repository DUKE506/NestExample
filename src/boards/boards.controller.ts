import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Boards, BoardStatus } from './board.model';
import { title } from 'process';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService : BoardsService){}

    /**
     * GET 게시판 전체 조회
     * @returns 
     */
    @Get('/')
    getAllBoard() : Boards[]{
        return this.boardsService.getAllBoards();
    }

    /**
     * GET 게시판 단일 조회(Id)
     * @param id 
     * @returns 
     */
    @Get('/:id')
    getBoardById(@Param('id') id : string):Boards{
        return this.boardsService.getBoardById(id);
    }

    /**
     * POST 게시판 생성
     * @param createBoardDto 
     * @returns 
     */
    @Post()
    createBoard(
        @Body() createBoardDto : CreateBoardDto
    ):Boards {
        

        return this.boardsService.createBoard(createBoardDto);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id :string,
        @Body('status') status:BoardStatus,
    ){
        console.log('여기옴')
        return this.boardsService.updateBoardStatus(id,status);
    }

    /**
     * DEL 게시판 단일 삭제
     * @param id 
     */
    @Delete('/:id')
    deleteBoard(@Param('id') id:string):void{
        this.boardsService.deleteBoard(id);
    }

}
