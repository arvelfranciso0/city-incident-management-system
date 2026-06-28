<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Support\MockData;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function monthly(): Response
    {
        return Inertia::render('Staff/Reports/Monthly', [
            'chartData' => MockData::chartData(),
            'notifications' => MockData::notifications(),
            'stats' => MockData::dashboardStats('staff'),
            'categories' => MockData::categories(),
            'departments' => MockData::departments(),
            'incidents' => MockData::incidents(),
        ]);
    }

    public function analytics(): Response
    {
        return Inertia::render('Staff/Reports/Analytics', [
            'chartData' => MockData::chartData(),
            'stats' => MockData::dashboardStats('staff'),
            'notifications' => MockData::notifications(),
        ]);
    }
}
