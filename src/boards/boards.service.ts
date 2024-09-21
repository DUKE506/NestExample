import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
//다른 컨트롤러에서도 사용하기위해 injecteable 데코레이터 선언
//injectable이있어야 provider
@Injectable()
export class BoardsService {
    constructor(
        // @InjectRepository(Board)
        private boardRepository: BoardRepository,
    ) { }


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


    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException('해당 게시물을 찾을 수 없습니다.')
        }

        console.log('result : ', result);
    }
}

