// 제네릭 래퍼 타입
export interface MBTInterfaceWrapper<T> {
    result: boolean;
    data: T;
}

export interface MBTIResponse {
    code: string;
    name: string;
    title: string;
    description: string;
    keyword: string;
    bgColor: string;
    textColor: string;
    sorting: number;
}