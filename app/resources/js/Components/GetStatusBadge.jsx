import { Badge } from '@/components/ui/badge';
import { STATUS } from '@/lib/utils';

export function GetStatusBadge({ status }) {
    const { VERIFIED, REQUEST, PENDING, REJECTED } = STATUS;

    let status, text;

    switch (status) {
        case VERIFIED:
            status = 'bg-green-500 hover:bg-green-600';
            text = 'Verified';
            break;
        case REQUEST:
            status = 'bg-indigo-500 hover:bg-indigo-600';
            text = 'Request';
            break;
        case PENDING:
            status = 'bg-yellow-500 hover:bg-yellow-600';
            text = 'Pending';
            break;
        case REJECTED:
            status = 'bg-red-500 hover:bg-red-600';
            text = 'Rejected';
            break;
    }
    return <Badge className={status}>{text}</Badge>;
}
