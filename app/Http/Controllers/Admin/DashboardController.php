<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Support\MockData;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => MockData::dashboardStats('admin'),
            'chartData' => MockData::chartData(),
            'departments' => MockData::departments(),
            'recentIncidents' => array_slice(MockData::incidents(), 0, 5),
            'activityLogs' => MockData::activityLogs(),
        ]);
    }
}
