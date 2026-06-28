<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Support\MockData;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function analytics(): Response
    {
        return Inertia::render('Admin/Reports/Analytics', [
            'chartData' => MockData::chartData(),
            'stats' => MockData::dashboardStats('admin'),
        ]);
    }

    public function sla(): Response
    {
        return Inertia::render('Admin/Reports/SLA', [
            'priorities' => MockData::priorities(),
            'departments' => MockData::departments(),
        ]);
    }

    public function departmentPerformance(): Response
    {
        return Inertia::render('Admin/Reports/DepartmentPerformance', [
            'departments' => MockData::departments(),
            'chartData' => MockData::chartData(),
        ]);
    }

    public function export(): Response
    {
        return Inertia::render('Admin/Reports/Export');
    }
}
