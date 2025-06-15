import { CreateMbtiResultDto } from '@/lib/api/dto/mbti/mbtiLivingDto';
import MbtiLivingRepository from '@/lib/api/repository/mbti/mbtiLivingRepository';
import MbtiRepository from '@/lib/api/repository/mbti/mbtiRepository';


export default class MbtiService {
    private static instance: MbtiService;
    private mbtiRepository: MbtiRepository;

    constructor() {
        this.mbtiRepository = new MbtiRepository();
    }

    public static getInstance(): MbtiService {
        if (!MbtiService.instance) {
            MbtiService.instance = new MbtiService();
        }
        return MbtiService.instance;
    }

    async getMbtiList() {
        return await this.mbtiRepository.getAllMbti();
    }
}