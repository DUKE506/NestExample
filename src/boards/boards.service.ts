import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board.type';
//다른 컨트롤러에서도 사용하기위해 injecteable 데코레이터 선언
//injectable이있어야 provider
@Injectable()
export class BoardsService {
    constructor(
        // @InjectRepository(Board)
        private boardRepository: BoardRepository,
    ) { }

    /**
     * GET 게시물 전체 조회
     * @returns List<Board>
     */
    async getAllBoards():Promise<Board[]>{
        return this.boardRepository.find();
    }


    /**
     * POST 게시물 단일 조회 (ID)
     * @param id 
     * @returns 
     */
    async getBoardById(id: number): Promise<Board> {
        const board = await this.boardRepository.findOne({ where: { id } });

        if (!board) {
            throw new NotFoundException(`${id} is not Found`);
        }

        return board;
    }

    /**
     * POST 게시물 생성
     * @param createBoardDto 
     * @returns 
     */
    createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }

    /**
     * PATCH 게시물 상태 수정
     * @param id 
     * @param status 
     * @returns 
     */
    async updateBoardStatus(id : number, status : BoardStatus){
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }

    /**
     * DELETE 게시물 삭제
     * @param id 
     */
    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException('해당 게시물을 찾을 수 없습니다.')
        }

        console.log('result : ', result);
    }
}

