<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Support\MockData;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Staff/Dashboard/Index', [
            'stats' => MockData::dashboardStats('staff'),
            'incidents' => MockData::incidents(),
            'chartData' => MockData::chartData(),
            'notifications' => MockData::notifications(),
            'activityLogs' => MockData::activityLogs(),
        ]);
    }

    public function notifications(): Response
    {
        return Inertia::render('Staff/Notifications', [
            'notifications' => MockData::notifications(),
        ]);
    }

    public function profile(): Response
    {
        $staffUser = collect(MockData::users())->firstWhere('role', 'staff')
            ?? collect(MockData::users())->firstWhere('role', 'staff')
            ?? MockData::users()[0];

        return Inertia::render('Staff/Profile', [
            'user' => $staffUser,
            'notifications' => MockData::notifications(),
        ]);
    }

    public function settings(): Response
    {
        return Inertia::render('Staff/Settings', [
            'notifications' => MockData::notifications(),
        ]);
    }
}
