<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Support\MockData;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function chooseType(): Response
    {
        return Inertia::render('Public/Report/ChooseType');
    }

    public function guestWizard(): Response
    {
        return Inertia::render('Public/Report/GuestWizard', [
            'categories' => MockData::categories(),
        ]);
    }

    public function track(): Response
    {
        return Inertia::render('Public/Report/Track');
    }

    public function show(string $trackingNumber): Response
    {
        $incident = collect(MockData::incidents())->firstWhere('trackingNumber', strtoupper($trackingNumber))
            ?? MockData::incidents()[0];

        return Inertia::render('Public/Report/Show', [
            'incident' => $incident,
            'timeline' => MockData::incidentTimeline($incident['id']),
        ]);
    }
}
