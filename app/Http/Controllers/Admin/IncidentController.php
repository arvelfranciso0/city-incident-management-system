<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\IncidentResource;
use App\Http\Resources\IncidentTimelineEventsResource;
use App\Models\Incident;
use App\Models\IncidentTimelineEvent;
use App\Support\MockData;
use Inertia\Inertia;
use Inertia\Response;

class IncidentController extends Controller
{
    public function show(string $id): Response
    {
        $incident = Incident::find($id);
        $timelines = IncidentTimelineEvent::with('user')->where('incident_id', $id)->get();

        return Inertia::render('Admin/Incidents/Show', [
            'incident' => new IncidentResource($incident),
            'timeline' => IncidentTimelineEventsResource::collection($timelines),
        ]);
    }
}
