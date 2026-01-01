import Dexie, { Table } from 'dexie';

export interface AssessmentRecord {
    id?: number;
    date: Date;
    scorePartA: number;
    scoreTotal: number;
    answers: Record<number, number>;
    mode: 'screening' | 'full';
    result: 'positive' | 'negative';
}

export class AssessmentDatabase extends Dexie {
    assessments!: Table<AssessmentRecord>;

    constructor() {
        super('ADHDAssessmentDB');
        this.version(1).stores({
            assessments: '++id, date, result'
        });
    }
}

export const db = new AssessmentDatabase();
