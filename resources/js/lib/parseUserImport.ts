export interface BulkUserRow {
    email: string;
    username: string;
    fullName: string;
    password: string;
}

export interface ParsedImportResult {
    rows: BulkUserRow[];
    errors: string[];
}

const HEADER_MAP: Record<string, keyof BulkUserRow> = {
    email: 'email',
    username: 'username',
    user_name: 'username',
    'full name': 'fullName',
    fullname: 'fullName',
    full_name: 'fullName',
    name: 'fullName',
    password: 'password',
};

function normalizeHeader(header: string): string {
    return header.trim().toLowerCase().replace(/"/g, '');
}

function mapRow(values: string[], headerKeys: (keyof BulkUserRow | null)[]): BulkUserRow | null {
    const row: Partial<BulkUserRow> = {};

    headerKeys.forEach((key, index) => {
        if (!key) {
            return;
        }
        row[key] = (values[index] ?? '').trim().replace(/^"|"$/g, '');
    });

    if (!row.email || !row.username || !row.fullName || !row.password) {
        return null;
    }

    return row as BulkUserRow;
}

function parseCsvLine(line: string): string[] {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
            continue;
        }

        if (char === ',' && !inQuotes) {
            values.push(current);
            current = '';
            continue;
        }

        current += char;
    }

    values.push(current);

    return values;
}

export function parseCsvUsers(text: string): ParsedImportResult {
    const errors: string[] = [];
    const lines = text.trim().split(/\r?\n/).filter(Boolean);

    if (lines.length < 2) {
        return { rows: [], errors: ['File must include a header row and at least one user row.'] };
    }

    const headers = parseCsvLine(lines[0]).map(normalizeHeader);
    const headerKeys = headers.map((h) => HEADER_MAP[h] ?? null);

    const required = ['email', 'username', 'fullName', 'password'] as const;
    const missing = required.filter((field) => !headerKeys.includes(field));

    if (missing.length > 0) {
        return {
            rows: [],
            errors: [`Missing required columns: ${missing.join(', ')}. Expected: email, username, full name, password.`],
        };
    }

    const rows: BulkUserRow[] = [];

    lines.slice(1).forEach((line, index) => {
        const values = parseCsvLine(line);
        const row = mapRow(values, headerKeys);

        if (!row) {
            errors.push(`Row ${index + 2}: missing required fields.`);
            return;
        }

        if (!row.email.includes('@')) {
            errors.push(`Row ${index + 2}: invalid email "${row.email}".`);
            return;
        }

        rows.push(row);
    });

    return { rows, errors };
}

export async function parseUserImportFile(file: File): Promise<ParsedImportResult> {
    const extension = file.name.split('.').pop()?.toLowerCase();

    if (extension === 'csv') {
        const text = await file.text();
        return parseCsvUsers(text);
    }

    if (extension === 'xlsx' || extension === 'xls') {
        const XLSX = await import('xlsx');
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];

        if (!sheetName) {
            return { rows: [], errors: ['Excel file contains no worksheets.'] };
        }

        const sheet = workbook.Sheets[sheetName];
        const csv = XLSX.utils.sheet_to_csv(sheet);

        return parseCsvUsers(csv);
    }

    return { rows: [], errors: ['Unsupported file type. Upload a .csv, .xls, or .xlsx file.'] };
}

export function downloadUserImportTemplate() {
    const header = 'email,username,full name,password';
    const sample = [
        'jane.doe@city.gov,jdoe,Jane Doe,TempPass123!',
        'john.smith@city.gov,jsmith,John Smith,TempPass456!',
    ].join('\n');

    const blob = new Blob([`${header}\n${sample}\n`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'user-import-template.csv';
    link.click();
    URL.revokeObjectURL(url);
}

export const EMPTY_USER_ROW: BulkUserRow = {
    email: '',
    username: '',
    fullName: '',
    password: '',
};

export function createEmptyUserRows(count: number): BulkUserRow[] {
    return Array.from({ length: count }, () => ({ ...EMPTY_USER_ROW }));
}
