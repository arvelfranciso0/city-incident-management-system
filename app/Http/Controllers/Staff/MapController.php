<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Support\MockData;
use Inertia\Inertia;
use Inertia\Response;

class MapController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Staff/Maps/Index', [
            'incidents' => MockData::heatmapIncidents(),
            'notifications' => MockData::notifications(),
            'defaultView' => 'heat',
        ]);
    }

    public function heatmap(): Response
    {
        return Inertia::render('Staff/Maps/Index', [
            'incidents' => MockData::heatmapIncidents(),
            'notifications' => MockData::notifications(),
            'defaultView' => 'heat',
        ]);
    }

    public function cluster(): Response
    {
        return Inertia::render('Staff/Maps/Index', [
            'incidents' => MockData::heatmapIncidents(),
            'notifications' => MockData::notifications(),
            'defaultView' => 'cluster',
        ]);
    }
}
