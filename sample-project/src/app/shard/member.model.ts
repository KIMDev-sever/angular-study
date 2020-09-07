// 회원 통합 모델
export interface MemberModel {
    id: string;
    password?: string;
    name?: string;
    point?: number;
    phone_number?: string;
    email: string;
    birthDay?: string;
    grade?: string;
    date?: Date;
    status?: string;
    view_status?: boolean;
}
