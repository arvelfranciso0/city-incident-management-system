<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Support\MockData;
use Inertia\Inertia;
use Inertia\Response;

class SystemController extends Controller
{
    public function roles(): Response
    {
        return Inertia::render('Admin/System/Roles', [
            'roles' => MockData::roles(),
        ]);
    }

    public function auditLogs(): Response
    {
        return Inertia::render('Admin/System/AuditLogs', [
            'logs' => MockData::auditLogs(),
        ]);
    }

    public function activityLogs(): Response
    {
        return Inertia::render('Admin/System/ActivityLogs', [
            'logs' => MockData::activityLogs(),
        ]);
    }

    public function settings(): Response
    {
        return Inertia::render('Admin/System/Settings');
    }
}
