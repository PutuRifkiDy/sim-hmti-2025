import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function flashMessage(params) {
    return params.props.flash_message;
}

export const STATUS = {
    VERIFIED: 'verified',
    REQUEST: 'request',
    PENDING: 'pending',
    REJECTED: 'rejected',
};

export const STATUS_USER = {
    MAHASISWA: 'Mahasiswa',
    SMASMK: 'SMASMK',
    SMP: 'SMP',
    SD: 'SD',
    UMUM: 'Umum',
};
