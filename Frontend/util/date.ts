export const getRelativeTime = (isoDate: string | undefined): string => {
    if(!isoDate) return "";
    const now = new Date();
    const past = new Date(isoDate);
    const diffMs = now.getTime() - past.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if(diffHrs < 0) return "0분 전";

    if (diffHrs < 24) {
        return diffHrs === 0 ? `${diffMin}분 전` : `${diffHrs}시간 전`;
    } else if (diffDays < 7) {
        return `${diffDays}일 전`;
    } else if (diffMonths < 1) {
        return `${Math.floor(diffDays / 7)}주 전`;
    } else if (diffYears < 1) {
        return `${diffMonths}달 전`;
    } else {
        return `${diffYears}년 전`;
    }
};