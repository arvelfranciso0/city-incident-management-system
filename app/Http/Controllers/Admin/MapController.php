<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Support\MockData;
use Inertia\Inertia;
use Inertia\Response;

class MapController extends Controller
{
    public function heatmap(): Response
    {
        return Inertia::render('Admin/Maps/HeatMap', [
            'incidents' => MockData::heatmapIncidents(),
        ]);
    }
}
