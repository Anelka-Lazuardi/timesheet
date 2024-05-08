import { IActivity } from "@/app/store";

export const calculateDuration = (data: IActivity[], rate: number) => {
    let duration = 0;
    data.forEach(d => {
        const { startDate, endDate } = d
        const start = new Date(startDate);
        const end = new Date(endDate);

        const durationMs = end.getTime() - start.getTime();

        // Convert milliseconds to minutes
        const durationMinutes = Math.floor(durationMs / (1000 * 60));
        duration += durationMinutes
    });

    return {
        duration,
        rate: Math.floor(duration * rate / 60),
        durationFormat: formatDuration(duration)
    }



}

export const formatDuration = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let durationString = '';

    if (hours > 0) {
        durationString += `${hours} Jam `;
    }

    if (minutes > 0) {
        durationString += `${minutes} Menit`;
    }

    return durationString.trim();
}

export const exportToCsv = (data: IActivity[], headers: string[], filename: string) => {
    const csvContent = "data:text/csv;charset=utf-8,"
        + [headers.join(","), ...data.map(item => Object.values(item).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
}


export const headerActivity =
    [
        "ID",
        "Judul Kegiatan",
        "Nama Proyek",
        "Tanggal Mulai",
        "Tanggal Berakhir",
        "Durasi",
        "User ID",
        "Proyek ID"
    ]