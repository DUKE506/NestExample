import { Injectable } from '@nestjs/common';
import { Boards, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
@Injectable()
export class BoardsService {
    private boards:Boards[] = [];

    /**
     * (GET) 게시판 전체 조회
     * @returns 
     */
    getAllBoards() : Boards[] {
        return this.boards;
    }

    /**
     * (GET) 게시판 단일 조회 ID
     * @param id 
     * @returns 
     */
    getBoardById(id:string):Boards{
        return this.boards.find(b => b.id === id);
    }

    /**
     * (POST) 게시판 생성
     * @param createBoardDto 
     * @returns Boards
     */
    createBoard(createBoardDto : CreateBoardDto){
        const {title, description} = createBoardDto;

        const board : Boards= {
            id : uuid(),
            title,
            description,
            status:BoardStatus.PUBLIC
        }
        this.boards.push(board);
        return board;
    }

    updateBoardStatus(id:string, status:BoardStatus):Boards{
        const board = this.getBoardById(id);
        board.status = status;

        return board;
    }

    /**
     * (DEL) 게시판 단일 삭제
     * @param id 
     */
    deleteBoard(id:string) : void{
        this.boards = this.boards.filter(b => b.id != id);
    }
}
