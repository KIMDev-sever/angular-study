// 게시판 통합 모델
export interface NoticeModel {
    id: string;
    product_number?: number;
    category?: string;
    title: string;
    content: string;
    url: string;
    write_owner: string;
    date: string;
    kind: string;
    reply_id?: string;
}

