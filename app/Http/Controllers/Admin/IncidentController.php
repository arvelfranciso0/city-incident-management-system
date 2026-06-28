<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Support\MockData;
use Inertia\Inertia;
use Inertia\Response;

class IncidentController extends Controller
{
    public function show(string $id): Response
    {
        $incident = collect(MockData::incidents())->firstWhere('id', $id)
            ?? MockData::incidents()[0];

        return Inertia::render('Admin/Incidents/Show', [
            'incident' => $incident,
            'timeline' => MockData::incidentTimeline($incident['id']),
        ]);
    }
}
