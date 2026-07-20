export interface StudentRegistrationFile {
  id: string;
  registrationId: string;
  registrationPaymentId?: string | null;
  type: string;
  fileName: string;
  fileUrl: string;
  fileType?: string;
  fileSize?: number;
  createdAt: string;
}

export interface StudentRegistrationPayment {
  id: string;
  registrationId: string;
  installment: number;
  amount: number;
  status: string;
  paidAt: string | null;
  note: string | null;
  createdAt: string;
  files?: StudentRegistrationFile[];
}

export interface StudentRegistrationDetail {
  id: string;
  studentId: string;
  paymentOption: string;
  totalAmount: number;
  status: string;
  approvedBy: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
  files?: StudentRegistrationFile[];
  payments: StudentRegistrationPayment[];
}
