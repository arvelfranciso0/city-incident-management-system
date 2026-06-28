<?php

namespace App\Http\Controllers\Citizen;

use App\Http\Controllers\Controller;
use App\Support\MockData;
use Inertia\Inertia;
use Inertia\Response;

class IncidentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Citizen/Incidents/Index', [
            'incidents' => MockData::incidents(),
            'notifications' => MockData::notifications(),
        ]);
    }

    public function show(string $id): Response
    {
        $incident = collect(MockData::incidents())->firstWhere('id', $id)
            ?? MockData::incidents()[0];

        return Inertia::render('Citizen/Incidents/Show', [
            'incident' => $incident,
            'timeline' => MockData::incidentTimeline($incident['id']),
            'notifications' => MockData::notifications(),
        ]);
    }

    public function report(): Response
    {
        return Inertia::render('Citizen/Report/Wizard', [
            'categories' => MockData::categories(),
            'notifications' => MockData::notifications(),
        ]);
    }

    public function uploadEvidence(string $id): Response
    {
        $incident = collect(MockData::incidents())->firstWhere('id', $id)
            ?? MockData::incidents()[0];

        return Inertia::render('Citizen/Incidents/UploadEvidence', [
            'incident' => $incident,
            'notifications' => MockData::notifications(),
        ]);
    }

    public function feedback(string $id): Response
    {
        $incident = collect(MockData::incidents())->firstWhere('id', $id)
            ?? MockData::incidents()[0];

        return Inertia::render('Citizen/Incidents/Feedback', [
            'incident' => $incident,
            'notifications' => MockData::notifications(),
        ]);
    }
}
