<?php

namespace App\Http\Controllers\Citizen;

use App\Http\Controllers\Controller;
use App\Support\MockData;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Citizen/Dashboard', [
            'stats' => MockData::dashboardStats('citizen'),
            'recentIncidents' => array_slice(MockData::incidents(), 0, 3),
            'notifications' => MockData::notifications(),
        ]);
    }

    public function notifications(): Response
    {
        return Inertia::render('Citizen/Notifications', [
            'notifications' => MockData::notifications(),
        ]);
    }

    public function profile(): Response
    {
        return Inertia::render('Citizen/Profile');
    }

    public function settings(): Response
    {
        return Inertia::render('Citizen/Settings');
    }
}
