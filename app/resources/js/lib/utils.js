import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

export const messages = {
    503: {
        title: 'Layanan Tidak Tersedia',
        description: 'Maaf, kami sedang melakukan pemeliharaan. Silakan coba lagi nanti.',
        status: '503'
    },
    500: {
        title: 'Kesalahan Server',
        description: 'Ups, terjadi kesalahan di server kami. Silakan coba lagi nanti.',
        status: '500'
    },
    404: {
        title: 'Tidak Ditemukan',
        description: 'Maaf, halaman yang Anda cari tidak dapat ditemukan.',
        status: '404'
    },
    403: {
        title: 'Terlarang',
        description: 'Maaf, Anda dilarang mengakses halaman ini.',
        status: '403'
    },
    401: {
        title: 'Unauthorized',
        description: 'Maaf, Anda tidak berwenang mengakses halaman ini.',
        status: '401'
    },
    429: {
        title: 'Terlalu Banyak Permintaan',
        description: 'Silakan coba lagi dalam beberapa menit.',
        status: '429'
    },
}
