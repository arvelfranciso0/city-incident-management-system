import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { PasswordInput } from '@/Components/ui/password-input';
import { Label } from '@/Components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Badge } from '@/Components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { FileUploadZone } from '@/Components/cims/FileUploadZone';
import {
    IconCheck,
    IconDownload,
    IconPlus,
    IconTrash,
    IconUpload,
    IconUsers,
} from '@tabler/icons-react';
import {
    createEmptyUserRows,
    downloadUserImportTemplate,
    EMPTY_USER_ROW,
    parseUserImportFile,
    type BulkUserRow,
} from '@/lib/parseUserImport';
import type { Department } from '@/types/cims';
import {
    getRoleDescription,
    getRoleLabel,
    roleRequiresDepartment,
    type UserRole,
} from '@/lib/roles';

interface CreateUserPayload extends BulkUserRow {
    role: UserRole;
    department_id: string | null;
}

function toStorePayload(users: CreateUserPayload[]): Array<Record<string, string | number | null>> {
    return users.map((user) => ({
        name: user.fullName.trim(),
        email: user.email.trim(),
        username: user.username.trim(),
        password: user.password,
        role: user.role,
        department_id: user.department_id ? Number(user.department_id) : null,
    }));
}

function validateRow(row: BulkUserRow, index?: number): string | null {
    const prefix = index != null ? `User ${index + 1}: ` : '';

    if (!row.fullName.trim()) {
        return `${prefix}Full name is required.`;
    }
    if (!row.email.trim() || !row.email.includes('@')) {
        return `${prefix}A valid email is required.`;
    }
    if (!row.username.trim()) {
        return `${prefix}Username is required.`;
    }
    if (!row.password || row.password.length < 8) {
        return `${prefix}Password must be at least 8 characters.`;
    }

    return null;
}

export default function Create({
    departments,
    creatableRoles,
    actorRole,
}: {
    departments: Pick<Department, 'id' | 'name'>[];
    creatableRoles: UserRole[];
    actorRole: UserRole;
}) {
    const defaultRole = (creatableRoles[0] ?? 'staff') as UserRole;
    const { flash, errors: serverErrors } = usePage<{
        flash: { success?: string };
        errors: Record<string, string>;
    }>().props;

    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const [singleForm, setSingleForm] = useState<BulkUserRow & { role: UserRole; department: string }>({
        ...EMPTY_USER_ROW,
        role: defaultRole,
        department: '',
    });

    const [bulkRole, setBulkRole] = useState<UserRole>(defaultRole);
    const [bulkDepartment, setBulkDepartment] = useState('');
    const [bulkRows, setBulkRows] = useState<BulkUserRow[]>(createEmptyUserRows(3));

    const [importRole, setImportRole] = useState<UserRole>(defaultRole);
    const [importDepartment, setImportDepartment] = useState('');
    const [importRows, setImportRows] = useState<BulkUserRow[]>([]);
    const [importErrors, setImportErrors] = useState<string[]>([]);
    const [importFileName, setImportFileName] = useState<string | null>(null);

    const serverErrorMessages = Object.values(serverErrors ?? {});

    function resetMessages() {
        setError(null);
    }

    function finalizeCreate(users: CreateUserPayload[]) {
        resetMessages();

        if (users.length === 0) {
            setError('Add at least one user to create.');
            return;
        }

        const validationErrors: string[] = [];
        users.forEach((user, index) => {
            const rowError = validateRow(user, index);
            if (rowError) {
                validationErrors.push(rowError);
            }

            if (roleRequiresDepartment(user.role) && !user.department_id) {
                validationErrors.push(`User ${index + 1}: Please select a department for this role.`);
            }
        });

        const emails = users.map((u) => u.email.toLowerCase());
        const usernames = users.map((u) => u.username.toLowerCase());
        const duplicateEmails = emails.filter((e, i) => emails.indexOf(e) !== i);
        const duplicateUsernames = usernames.filter((u, i) => usernames.indexOf(u) !== i);

        if (duplicateEmails.length > 0) {
            validationErrors.push(`Duplicate emails: ${[...new Set(duplicateEmails)].join(', ')}`);
        }
        if (duplicateUsernames.length > 0) {
            validationErrors.push(`Duplicate usernames: ${[...new Set(duplicateUsernames)].join(', ')}`);
        }

        if (validationErrors.length > 0) {
            setError(validationErrors.join(' '));
            return;
        }

        router.post(
            route('admin.users.store'),
            { users: toStorePayload(users) },
            {
                preserveScroll: true,
                onStart: () => setProcessing(true),
                onFinish: () => setProcessing(false),
                onError: () => setError('Please fix the errors below and try again.'),
            },
        );
    }

    function handleSingleCreate() {
        finalizeCreate([
            {
                email: singleForm.email,
                username: singleForm.username,
                fullName: singleForm.fullName,
                password: singleForm.password,
                role: singleForm.role,
                department_id: roleRequiresDepartment(singleForm.role) ? singleForm.department : null,
            },
        ]);
    }

    function handleBulkCreate() {
        finalizeCreate(
            bulkRows.map((row) => ({
                ...row,
                role: bulkRole,
                department_id: roleRequiresDepartment(bulkRole) ? bulkDepartment : null,
            })),
        );
    }

    function handleImportCreate() {
        if (importErrors.length > 0) {
            setError('Fix import errors before creating users.');
            return;
        }

        finalizeCreate(
            importRows.map((row) => ({
                ...row,
                role: importRole,
                department_id: roleRequiresDepartment(importRole) ? importDepartment : null,
            })),
        );
    }

    async function handleImportFile(files: File[]) {
        resetMessages();

        const file = files[0];
        if (!file) {
            setImportRows([]);
            setImportErrors([]);
            setImportFileName(null);
            return;
        }

        const result = await parseUserImportFile(file);
        setImportRows(result.rows);
        setImportErrors(result.errors);
        setImportFileName(file.name);

        if (result.rows.length === 0 && result.errors.length === 0) {
            setImportErrors(['No valid user rows found in the file.']);
        }
    }

    function updateBulkRow(index: number, field: keyof BulkUserRow, value: string) {
        setBulkRows(bulkRows.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
    }

    function removeBulkRow(index: number) {
        if (bulkRows.length <= 1) {
            return;
        }
        setBulkRows(bulkRows.filter((_, i) => i !== index));
    }

    return (
        <AdminLayout>
            <Head title="Create User" />

            <div className="mb-2">
                <Button variant="ghost" size="sm" asChild className="-ml-2 text-muted-foreground">
                    <Link href={route('admin.users.index')}>← Back to Users</Link>
                </Button>
            </div>

            <PageHeader
                title="Create Users"
                description={`Add accounts your role (${getRoleLabel(actorRole)}) is allowed to provision.`}
            />

            <Card className="mt-4 border-border/60 bg-muted/20">
                <CardContent className="pt-4 text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">Role hierarchy</p>
                    <p className="mt-1">
                        Super Admin → Organization Admin → Department Admin → Department Staff. Citizen and Guest use the public portal; records are managed in the Organization Admin Portal only.
                    </p>
                </CardContent>
            </Card>

            {flash?.success && (
                <Alert className="mt-6 border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30">
                    <IconCheck className="size-4 text-emerald-600" />
                    <AlertTitle>Users created</AlertTitle>
                    <AlertDescription className="flex flex-wrap items-center justify-between gap-3">
                        <span>{flash.success}</span>
                        <Button size="sm" variant="outline" asChild>
                            <Link href={route('admin.users.index')}>View Users</Link>
                        </Button>
                    </AlertDescription>
                </Alert>
            )}

            {(error || serverErrorMessages.length > 0) && (
                <Alert variant="destructive" className="mt-6">
                    <AlertTitle>Could not create users</AlertTitle>
                    <AlertDescription>
                        {error && <p>{error}</p>}
                        {serverErrorMessages.length > 0 && (
                            <ul className={`list-inside list-disc space-y-1 ${error ? 'mt-2' : ''}`}>
                                {serverErrorMessages.map((msg) => (
                                    <li key={msg}>{msg}</li>
                                ))}
                            </ul>
                        )}
                    </AlertDescription>
                </Alert>
            )}

            <Tabs defaultValue="single" className="mt-6" onValueChange={resetMessages}>
                <TabsList className="flex h-auto flex-wrap">
                    <TabsTrigger value="single">Single User</TabsTrigger>
                    <TabsTrigger value="bulk">Bulk by Type</TabsTrigger>
                    <TabsTrigger value="import">CSV / Excel Import</TabsTrigger>
                </TabsList>

                <TabsContent value="single">
                    <Card>
                        <CardHeader>
                            <CardTitle>Single User</CardTitle>
                            <CardDescription>Create one account with role and department assignment.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 max-w-lg">
                            <UserFields
                                row={singleForm}
                                onChange={(field, value) => setSingleForm({ ...singleForm, [field]: value })}
                                idPrefix="single"
                            />
                            <RoleDepartmentFields
                                role={singleForm.role}
                                department={singleForm.department}
                                departments={departments}
                                creatableRoles={creatableRoles}
                                onRoleChange={(role) => setSingleForm({ ...singleForm, role, department: '' })}
                                onDepartmentChange={(department) => setSingleForm({ ...singleForm, department })}
                                idPrefix="single"
                            />
                            <div className="flex gap-2 pt-2">
                                <Button type="button" disabled={processing} onClick={handleSingleCreate}>
                                    {processing ? 'Creating…' : 'Create User'}
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={route('admin.users.index')}>Cancel</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="bulk">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <IconUsers className="size-5" />
                                Bulk Create by Type
                            </CardTitle>
                            <CardDescription>
                                Add multiple users at once. All users in this batch share the same role and department.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <RoleDepartmentFields
                                role={bulkRole}
                                department={bulkDepartment}
                                departments={departments}
                                creatableRoles={creatableRoles}
                                onRoleChange={(role) => {
                                    setBulkRole(role);
                                    setBulkDepartment('');
                                }}
                                onDepartmentChange={setBulkDepartment}
                                idPrefix="bulk"
                                className="max-w-lg"
                            />

                            <div className="overflow-x-auto rounded-lg border border-border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Full Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Username</TableHead>
                                            <TableHead>Password</TableHead>
                                            <TableHead className="w-12" />
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {bulkRows.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Input
                                                        placeholder="Jane Doe"
                                                        value={row.fullName}
                                                        onChange={(e) => updateBulkRow(index, 'fullName', e.target.value)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        type="email"
                                                        placeholder="email@city.gov"
                                                        value={row.email}
                                                        onChange={(e) => updateBulkRow(index, 'email', e.target.value)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        placeholder="jdoe"
                                                        value={row.username}
                                                        onChange={(e) => updateBulkRow(index, 'username', e.target.value)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <PasswordInput
                                                        placeholder="Min. 8 characters"
                                                        value={row.password}
                                                        onChange={(e) => updateBulkRow(index, 'password', e.target.value)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon-xs"
                                                        disabled={bulkRows.length <= 1}
                                                        onClick={() => removeBulkRow(index)}
                                                    >
                                                        <IconTrash className="size-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setBulkRows([...bulkRows, { ...EMPTY_USER_ROW }])}
                                >
                                    <IconPlus className="size-4" />
                                    Add Row
                                </Button>
                                <Button type="button" disabled={processing} onClick={handleBulkCreate}>
                                    {processing ? 'Creating…' : `Create ${bulkRows.length} Users`}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="import">
                    <div className="grid gap-6 lg:grid-cols-3">
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <IconUpload className="size-5" />
                                    Upload File
                                </CardTitle>
                                <CardDescription>
                                    Import users from CSV or Excel (.xlsx, .xls).
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FileUploadZone
                                    accept=".csv,.xlsx,.xls"
                                    maxFiles={1}
                                    onFilesChange={handleImportFile}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={downloadUserImportTemplate}
                                >
                                    <IconDownload className="size-4" />
                                    Download CSV Template
                                </Button>
                                <div className="rounded-lg border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
                                    <p className="font-medium text-foreground">Required columns</p>
                                    <p className="mt-1 font-mono">email, username, full name, password</p>
                                </div>
                                <RoleDepartmentFields
                                    role={importRole}
                                    department={importDepartment}
                                    departments={departments}
                                    creatableRoles={creatableRoles}
                                    onRoleChange={(role) => {
                                        setImportRole(role);
                                        setImportDepartment('');
                                    }}
                                    onDepartmentChange={setImportDepartment}
                                    idPrefix="import"
                                />
                                <Button
                                    type="button"
                                    className="w-full"
                                    disabled={processing || importRows.length === 0}
                                    onClick={handleImportCreate}
                                >
                                    {processing
                                        ? 'Creating…'
                                        : `Create ${importRows.length > 0 ? importRows.length : ''} Imported Users`}
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Import Preview</CardTitle>
                                <CardDescription>
                                    {importFileName
                                        ? `Parsed from ${importFileName}`
                                        : 'Upload a file to preview users before creating.'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {importErrors.length > 0 && (
                                    <Alert variant="destructive" className="mb-4">
                                        <AlertTitle>Import issues</AlertTitle>
                                        <AlertDescription>
                                            <ul className="list-inside list-disc space-y-1">
                                                {importErrors.map((msg) => (
                                                    <li key={msg}>{msg}</li>
                                                ))}
                                            </ul>
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {importRows.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
                                        <IconUpload className="mb-3 size-10 text-muted-foreground" />
                                        <p className="text-sm font-medium">No users loaded yet</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Upload a CSV or Excel file using the required column format.
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-4 flex flex-wrap items-center gap-2">
                                            <Badge>{importRows.length} users ready</Badge>
                                            <Badge variant="outline" className="capitalize">{importRole}</Badge>
                                            {importDepartment && (
                                                <Badge variant="secondary">
                                                    {departments.find((d) => String(d.id) === importDepartment)?.name}
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="overflow-x-auto rounded-lg border border-border">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Full Name</TableHead>
                                                        <TableHead>Email</TableHead>
                                                        <TableHead>Username</TableHead>
                                                        <TableHead>Password</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {importRows.map((row, index) => (
                                                        <TableRow key={`${row.email}-${index}`}>
                                                            <TableCell className="font-medium">{row.fullName}</TableCell>
                                                            <TableCell>{row.email}</TableCell>
                                                            <TableCell>{row.username}</TableCell>
                                                            <TableCell className="font-mono text-xs">••••••••</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
}

function UserFields({
    row,
    onChange,
    idPrefix,
}: {
    row: BulkUserRow;
    onChange: (field: keyof BulkUserRow, value: string) => void;
    idPrefix: string;
}) {
    return (
        <>
            <div className="space-y-2">
                <Label htmlFor={`${idPrefix}-fullName`}>Full Name</Label>
                <Input
                    id={`${idPrefix}-fullName`}
                    placeholder="Jane Doe"
                    value={row.fullName}
                    onChange={(e) => onChange('fullName', e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor={`${idPrefix}-email`}>Email</Label>
                <Input
                    id={`${idPrefix}-email`}
                    type="email"
                    placeholder="email@city.gov"
                    value={row.email}
                    onChange={(e) => onChange('email', e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor={`${idPrefix}-username`}>Username</Label>
                <Input
                    id={`${idPrefix}-username`}
                    placeholder="jdoe"
                    value={row.username}
                    onChange={(e) => onChange('username', e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor={`${idPrefix}-password`}>Password</Label>
                <PasswordInput
                    id={`${idPrefix}-password`}
                    placeholder="Min. 8 characters"
                    value={row.password}
                    onChange={(e) => onChange('password', e.target.value)}
                />
            </div>
        </>
    );
}

function RoleDepartmentFields({
    role,
    department,
    departments,
    creatableRoles,
    onRoleChange,
    onDepartmentChange,
    idPrefix,
    className,
}: {
    role: UserRole;
    department: string;
    departments: Pick<Department, 'id' | 'name'>[];
    creatableRoles: UserRole[];
    onRoleChange: (role: UserRole) => void;
    onDepartmentChange: (department: string) => void;
    idPrefix: string;
    className?: string;
}) {
    return (
        <div className={`grid gap-4 sm:grid-cols-2 ${className ?? ''}`}>
            <div className="space-y-2">
                <Label htmlFor={`${idPrefix}-role`}>User Type</Label>
                <Select value={role} onValueChange={(v) => onRoleChange(v as UserRole)}>
                    <SelectTrigger id={`${idPrefix}-role`}>
                        <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                        {creatableRoles.map((r) => (
                            <SelectItem key={r} value={r}>
                                {getRoleLabel(r)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">{getRoleDescription(role)}</p>
            </div>
            {roleRequiresDepartment(role) && (
                <div className="space-y-2">
                    <Label htmlFor={`${idPrefix}-department`}>Department</Label>
                    <Select value={department} onValueChange={onDepartmentChange}>
                        <SelectTrigger id={`${idPrefix}-department`}>
                            <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                            {departments.map((d) => (
                                <SelectItem key={d.id} value={String(d.id)}>
                                    {d.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}
        </div>
    );
}
