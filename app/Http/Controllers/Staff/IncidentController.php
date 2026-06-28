<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Support\MockData;
use Inertia\Inertia;
use Inertia\Response;

class IncidentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Staff/Incidents/Index', [
            'incidents' => MockData::incidents(),
            'notifications' => MockData::notifications(),
        ]);
    }

    public function show(string $id): Response
    {
        $incident = collect(MockData::incidents())->firstWhere('id', $id)
            ?? MockData::incidents()[0];

        return Inertia::render('Staff/Incidents/Show', [
            'incident' => $incident,
            'timeline' => MockData::incidentTimeline($incident['id']),
            'notifications' => MockData::notifications(),
        ]);
    }
}
