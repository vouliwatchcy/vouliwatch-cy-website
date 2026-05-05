export type SessionStatus = 'Εγκρίθηκε' | 'Αναβλήθηκε' | 'Απορρίφθηκε' | 'Αποσύρθηκε' | 'Δεν επιβεβαιώθηκε';
export type CertaintyLevel = 'Υψηλό' | 'Μέτριο' | 'Χαμηλό';

export interface Topic {
  id: number;
  title: string;
  status: SessionStatus;
  simple: string;
  votes?: {
    for: number;
    against: number;
    abstain: number;
  };
  evidence: string;
  pdf?: string;
  pdf_pages?: string;
  certainty: CertaintyLevel;
  why_matters: string;
}

export interface Session {
  title: string;
  date: string; // YYYY-MM-DD format
  youtube: string;
  summary: string;
  topics: Topic[];
  pending?: string[];
}

export interface SessionMetadata {
  date: string;
  title: string;
  topicCount: number;
  approved: number;
  postponed: number;
  rejected: number;
  withdrawn: number;
}
