import { CreateMbtiResultDto } from '@/lib/api/dto/mbti/mbtiLivingDto';
import MbtiLivingRepository from '@/lib/api/repository/mbti/mbtiLivingRepository';


export default class MBtiLivingService {
    private static instance: MBtiLivingService;
    private mbtiLivingRepository: MbtiLivingRepository;

    constructor() {
        this.mbtiLivingRepository = new MbtiLivingRepository();
    }

    public static getInstance(): MBtiLivingService {
        if (!MBtiLivingService.instance) {
            MBtiLivingService.instance = new MBtiLivingService();
        }
        return MBtiLivingService.instance;
    }

    async createMbtiLivingResult(dto: CreateMbtiResultDto) {
        return await this.mbtiLivingRepository.insertMbtiResult(dto);
    }

    async getByUuidLivingSingleResult(uuid: string) {
        return await this.mbtiLivingRepository.selectMbtiResultByUuid(uuid);
    }
}